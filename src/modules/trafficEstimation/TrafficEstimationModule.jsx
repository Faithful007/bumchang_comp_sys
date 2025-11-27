// src/modules/trafficEstimation/TrafficEstimationModule.jsx
import React, { useState, useRef } from "react";
import {
  computeEstimatedTraffic,
  VEHICLE_KEYS
} from "./calculations";
import { useLanguage } from "../../i18n/LanguageContext";
import { getModuleStrings } from "../../i18n/appStrings";
import {
  SMOKE_EMISSION_FACTORS_G_PER_KM_DEFAULT,
  SMOKE_VEHICLE_KEYS,
  computeSmokeQ0Map,
  SMOKE_REDUCTION_FACTOR,
  SMOKE_REFERENCE_SPEED_KMH
} from "../smoke/smokeParameters";
import {
  parseCSV,
  readFileAsText,
  exportToCSV,
  downloadCSV,
  exportToPDF
} from "./dataImportExport";

// Default per-vehicle daily volumes (Excel example)
const DEFAULT_DIRECTION_COUNTS = {
  year: 2222,
  passengerGasoline: 49804,
  passengerDiesel: 33203,
  busSmall: 0,
  busLarge: 815,
  truckSmall: 14331,
  truckMedium: 3020,
  truckLarge: 332,
  truckSpecial: 862
};

export default function TrafficEstimationModule() {
  const { lang } = useLanguage();
  const t = getModuleStrings("trafficEstimation", lang);
  const fileInputRef = useRef(null);

  const [dir1, setDir1] = useState({ ...DEFAULT_DIRECTION_COUNTS });
  const [dir2, setDir2] = useState({ ...DEFAULT_DIRECTION_COUNTS });
  const [importMessage, setImportMessage] = useState("");
  
  // Batch processing states
  const [importedData, setImportedData] = useState([]);
  const [computedResults, setComputedResults] = useState([]);
  const [hasUncomputedData, setHasUncomputedData] = useState(false);

  const result1 = computeFromDirection(dir1);
  const result2 = computeFromDirection(dir2);

  // Handle file import
  const handleFileImport = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const text = await readFileAsText(file);
      const data = parseCSV(text);
      
      if (data.length > 0) {
        // Store imported data for batch processing
        setImportedData(data);
        setHasUncomputedData(true);
        setComputedResults([]); // Clear previous results
        
        // Also update UI with first two entries for preview
        setDir1(data[0]);
        if (data.length > 1) {
          setDir2(data[1]);
        }
        
        setImportMessage(t.importSuccess + ` (${data.length} ${t.entriesLoaded || 'entries loaded'})`);
        setTimeout(() => setImportMessage(""), 3000);
      }
    } catch (error) {
      setImportMessage(t.importError);
      setTimeout(() => setImportMessage(""), 3000);
      console.error("Import error:", error);
    }
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Handle compute
  const handleCompute = () => {
    if (importedData.length === 0) {
      setImportMessage(t.noDataToCompute || "No data to compute");
      setTimeout(() => setImportMessage(""), 3000);
      return;
    }

    try {
      const results = importedData.map((entry) => {
        const computed = computeFromDirection(entry);
        // Flatten the computed results to include totalAadt and heavyVehicleMixPt at top level
        return {
          ...entry,
          totalAadt: computed.totalAadt,
          heavyVehicleMixPt: computed.heavyVehicleMixPt,
          counts: computed.counts,
          mixPercents: computed.mixPercents,
          mixPercentSum: computed.mixPercentSum
        };
      });
      
      setComputedResults(results);
      setHasUncomputedData(false);
      setImportMessage(t.computeSuccess || `Successfully computed ${results.length} entries`);
      setTimeout(() => setImportMessage(""), 3000);
    } catch (error) {
      setImportMessage(t.computeError || "Error computing data");
      setTimeout(() => setImportMessage(""), 3000);
      console.error("Compute error:", error);
    }
  };

  // Handle export CSV
  const handleExportCSV = () => {
    if (computedResults.length > 0) {
      // Export batch computed results
      const csvContent = exportToCSV(computedResults, "Computed Results");
      downloadCSV(csvContent, `traffic_estimation_batch_${Date.now()}.csv`);
    } else {
      // Export current manual entries
      const data1 = { ...dir1, ...result1 };
      const data2 = { ...dir2, ...result2 };
      
      const csv1 = exportToCSV([data1], t.dir1Title);
      const csv2 = exportToCSV([data2], t.dir2Title);
      
      // Combine both directions
      const combined = csv1 + '\n' + csv2.split('\n').slice(1).join('\n');
      
      downloadCSV(combined, `traffic_estimation_${Date.now()}.csv`);
    }
  };

  // Handle export PDF
  const handleExportPDF = () => {
    try {
      if (computedResults.length > 0) {
        // Export batch computed results
        exportToPDF(computedResults, t.title);
        setImportMessage(t.pdfExportSuccess || "PDF print dialog opened!");
      } else {
        // Export current manual entries
        const data1 = { ...dir1, ...result1 };
        const data2 = { ...dir2, ...result2 };
        exportToPDF([data1, data2], t.title);
        setImportMessage(t.pdfExportSuccess || "PDF print dialog opened!");
      }
      setTimeout(() => setImportMessage(""), 3000);
    } catch (error) {
      setImportMessage(t.pdfExportError || "Error exporting PDF");
      setTimeout(() => setImportMessage(""), 3000);
      console.error("PDF export error:", error);
    }
  };

  // Smoke emission factors local state (editable)
  const [smokeEmissionFactors, setSmokeEmissionFactors] = useState({
    ...SMOKE_EMISSION_FACTORS_G_PER_KM_DEFAULT
  });

  const smokeQ0Map = computeSmokeQ0Map(smokeEmissionFactors);

  const handleSmokeFactorChange = (key) => (e) => {
    const val = parseFloat(e.target.value);
    setSmokeEmissionFactors((prev) => ({
      ...prev,
      [key]: Number.isFinite(val) ? val : 0
    }));
  };

  return (
    <section style={outerSection}>
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12, gap: '8px' }}>
        <h2 style={{ marginTop: 0, marginBottom: 0, fontSize: 'clamp(16px, 4vw, 20px)' }}>{t.title}</h2>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          <input
            ref={fileInputRef}
            type="file"
            accept=".csv,.txt,.xls,.xlsx"
            onChange={handleFileImport}
            style={{ display: 'none' }}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            style={buttonStyle}
            title={t.importInstructions}
            aria-label={t.importButton}
          >
            <span role="img" aria-label="folder icon" style={{ fontSize: 16 }}>📁</span> {t.importButton}
          </button>
          <button
            onClick={handleCompute}
            style={{
              ...buttonStyle,
              backgroundColor: hasUncomputedData ? '#4CAF50' : '#f5f5f5',
              color: hasUncomputedData ? '#fff' : '#666',
              cursor: importedData.length > 0 ? 'pointer' : 'not-allowed',
              opacity: importedData.length > 0 ? 1 : 0.5
            }}
            disabled={importedData.length === 0}
            aria-label={t.computeButton || "Compute"}
          >
            <span role="img" aria-label="calculator icon" style={{ fontSize: 16 }}>🧮</span> {t.computeButton || "Compute"}
          </button>
          <button
            onClick={handleExportCSV}
            style={{
              ...buttonStyle,
              opacity: (computedResults.length > 0 || (!hasUncomputedData && importedData.length === 0)) ? 1 : 0.5
            }}
            disabled={hasUncomputedData}
            aria-label={t.exportCSVButton || t.exportButton}
            title={hasUncomputedData ? (t.computeFirstMessage || "Please compute data first") : ""}
          >
            <span role="img" aria-label="csv file icon" style={{ fontSize: 16 }}>📊</span> {t.exportCSVButton || "CSV"}
          </button>
          <button
            onClick={handleExportPDF}
            style={{
              ...buttonStyle,
              opacity: (computedResults.length > 0 || (!hasUncomputedData && importedData.length === 0)) ? 1 : 0.5
            }}
            disabled={hasUncomputedData}
            aria-label={t.exportPDFButton || "Export PDF"}
            title={hasUncomputedData ? (t.computeFirstMessage || "Please compute data first") : ""}
          >
            <span role="img" aria-label="pdf file icon" style={{ fontSize: 16 }}>📄</span> {t.exportPDFButton || "PDF"}
          </button>
        </div>
      </div>

      {importMessage && (
        <div style={{
          padding: '8px 12px',
          marginBottom: 12,
          borderRadius: 4,
          backgroundColor: importMessage.includes('Error') || importMessage.includes('오류') ? '#fee' : '#efe',
          border: `1px solid ${importMessage.includes('Error') || importMessage.includes('오류') ? '#fcc' : '#cfc'}`,
          fontSize: 12
        }}>
          {importMessage}
        </div>
      )}

      <p style={explanation}>{t.explanation}</p>

      <div style={twoColumn}>
        <DirectionCard
          title={t.dir1Title}
          state={dir1}
          onChange={setDir1}
          result={result1}
          t={t}
        />
        <DirectionCard
          title={t.dir2Title}
          state={dir2}
          onChange={setDir2}
          result={result2}
          t={t}
        />
      </div>

      {/* Smoke emission parameters table */}
      <div style={{ marginTop: 32 }}>
        <h3 style={{ margin: "12px 0" }}>{t.smokeTitle}</h3>
        <div style={smokeMetaRow}>
          <div style={smokeMetaBox}>
            <strong>{t.smokeReductionFactorLabel}:</strong> {SMOKE_REDUCTION_FACTOR}
          </div>
          <div style={smokeMetaBox}>
            <strong>{t.smokeReferenceSpeedLabel}:</strong> {SMOKE_REFERENCE_SPEED_KMH}
          </div>
        </div>
        <table style={smokeTableStyle}>
          <colgroup>
            <col style={{ width: '40%' }} />
            <col style={{ width: '30%' }} />
            <col style={{ width: '30%' }} />
          </colgroup>
          <thead>
            <tr>
              <th style={thVehicle}>{t.vehicleHeader}</th>
              <th style={thNumeric}>{t.smokeEmissionHeader}</th>
              <th style={thNumeric}>{t.smokeQ0Header}</th>
            </tr>
          </thead>
          <tbody>
            {SMOKE_VEHICLE_KEYS.map((vk) => (
              <tr key={vk}>
                <td style={tdVehicle}>{renderVehicleLabel(vk, t)}</td>
                <td style={tdNumeric}>
                  <input
                    type="number"
                    step="0.0000000001"
                    value={smokeEmissionFactors[vk]}
                    onChange={handleSmokeFactorChange(vk)}
                    style={inputSmallRight}
                  />
                </td>
                <td style={tdNumeric}>{smokeQ0Map[vk]?.toFixed(4)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

/**
 * Helper: compute result object from direction state.
 */
function computeFromDirection(directionState) {
  const {
    passengerGasoline,
    passengerDiesel,
    busSmall,
    busLarge,
    truckSmall,
    truckMedium,
    truckLarge,
    truckSpecial
  } = directionState;

  const passengerAADT =
    (Number(passengerGasoline) || 0) + (Number(passengerDiesel) || 0);

  return computeEstimatedTraffic({
    passengerAADT,
    busSmall,
    busLarge,
    truckSmall,
    truckMedium,
    truckLarge,
    truckSpecial
  });
}

function DirectionCard({ title, state, onChange, result, t }) {
  const {
    year,
    passengerGasoline,
    passengerDiesel,
    busSmall,
    busLarge,
    truckSmall,
    truckMedium,
    truckLarge,
    truckSpecial
  } = state;

  const passengerAADT = (Number(passengerGasoline) || 0) +
                        (Number(passengerDiesel) || 0);

  const handleYearChange = (e) => {
    const value = e.target.value;
    onChange((prev) => ({
      ...prev,
      year: Number(value) || ""
    }));
  };

  const handleCountChange = (vehicleKey) => (e) => {
    const value = e.target.value;
    onChange((prev) => ({
      ...prev,
      [vehicleKey]: Number(value) || 0
    }));
  };

  return (
    <div style={card}>
      <h3 style={{ marginTop: 0 }}>{title}</h3>

      {/* 1) Top row: year + summary (unchanged) */}
      <div style={headerRow}>
        <div style={fieldGroup}>
          <label style={label}>{t.targetYear}</label>
          <input
            type="number"
            value={year}
            onChange={handleYearChange}
            style={input}
          />
        </div>

        <div style={summaryBox}>
          <div style={summaryLine}>
            <span>{t.totalAadt}</span>
            <strong>
              {result.totalAadt
                ? Math.round(result.totalAadt).toLocaleString()
                : "-"}
            </strong>
          </div>
          <div style={summaryLine}>
            <span>{t.heavyMix}</span>
            <strong>
              {result.heavyVehicleMixPt != null
                ? result.heavyVehicleMixPt.toFixed(2)
                : "-"}
            </strong>
          </div>
        </div>
      </div>

      {/* 2) FIRST SNIPPET: main variable table (editable daily volumes) */}
      <EditableResultsTable
        state={state}
        result={result}
        onCountChange={handleCountChange}
        t={t}
      />

      {/* 3) SECOND SNIPPET: read-only summary of base AADT inputs */}
      <div style={{ marginTop: 16 }}>
        <h4 style={{ margin: "8px 0" }}>
          {/* you can add a label if you like */}
        </h4>
        <div style={inputsGrid}>
          <Field
            label={t.passengerAadt}
            value={passengerAADT}
            readOnly
          />
          <Field
            label={t.busSmall}
            value={busSmall}
            readOnly
          />
          <Field
            label={t.busLarge}
            value={busLarge}
            readOnly
          />
          <Field
            label={t.truckSmall}
            value={truckSmall}
            readOnly
          />
          <Field
            label={t.truckMedium}
            value={truckMedium}
            readOnly
          />
          <Field
            label={t.truckLarge}
            value={truckLarge}
            readOnly
          />
          <Field
            label={t.truckSpecial}
            value={truckSpecial}
            readOnly
          />
        </div>
      </div>
    </div>
  );
}

/**
 * First snippet: table where Daily volume is editable,
 * Mix (%) and summary rows are computed.
 */
function EditableResultsTable({ state, result, onCountChange, t }) {
  const countsFromState = {
    passengerGasoline: state.passengerGasoline,
    passengerDiesel: state.passengerDiesel,
    busSmall: state.busSmall,
    busLarge: state.busLarge,
    truckSmall: state.truckSmall,
    truckMedium: state.truckMedium,
    truckLarge: state.truckLarge,
    truckSpecial: state.truckSpecial
  };

  const { mixPercents, mixPercentSum, heavyVehicleMixPt, totalAadt } = result;

  return (
    <table style={table}>
      <thead>
        <tr>
          <th style={th}>{t.vehicleHeader}</th>
          <th style={th}>{t.dailyHeader}</th>
          <th style={th}>{t.mixHeader}</th>
        </tr>
      </thead>
      <tbody>
        {VEHICLE_KEYS.map((key) => (
          <tr key={key}>
            <td style={td}>{renderVehicleLabel(key, t)}</td>
            <td style={tdRight}>
              <input
                type="number"
                value={countsFromState[key] ?? 0}
                onChange={onCountChange(key)}
                style={inputSmall}
              />
            </td>
            <td style={tdRight}>
              {mixPercents && mixPercents[key] != null
                ? mixPercents[key].toFixed(2)
                : "-"}
            </td>
          </tr>
        ))}
        {/* Total row – read-only */}
        <tr>
          <td style={{ ...td, fontWeight: "bold" }}>{t.totalRow}</td>
          <td style={{ ...tdRight, fontWeight: "bold" }}>
            {totalAadt ? Math.round(totalAadt).toLocaleString() : "-"}
          </td>
          <td style={{ ...tdRight, fontWeight: "bold" }}>
            {mixPercentSum != null ? mixPercentSum.toFixed(2) : "-"}
          </td>
        </tr>
        {/* Heavy vehicle mix Pt row – read-only */}
        <tr>
          <td style={td}>{t.heavyMixRow}</td>
          <td style={tdRight}>–</td>
          <td style={{ ...tdRight, fontWeight: "bold" }}>
            {heavyVehicleMixPt != null ? heavyVehicleMixPt.toFixed(2) : "-"}
          </td>
        </tr>
      </tbody>
    </table>
  );
}

function Field({ label, value, readOnly = false }) {
  return (
    <div style={fieldGroup}>
      <label style={labelStyle}>{label}</label>
      <input
        type="number"
        value={value}
        readOnly={readOnly}
        disabled={readOnly}
        style={readOnly ? inputReadOnly : input}
      />
    </div>
  );
}

/* ---------- styles ---------- */

const outerSection = {
  border: "1px solid #ddd",
  borderRadius: 8,
  padding: '8px',
  margin: '8px',
  background: "#fafafa",
  maxWidth: '100%',
  overflowX: 'hidden'
};

const explanation = {
  fontSize: 12,
  color: "#555",
  marginBottom: 12,
  lineHeight: 1.4
};

const twoColumn = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 360px), 1fr))",
  gap: 16
};

const card = {
  background: "#fff",
  borderRadius: 8,
  border: "1px solid #ddd",
  padding: 12
};

const headerRow = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  gap: 12,
  marginBottom: 12,
  flexWrap: "wrap"
};

const fieldGroup = {
  display: "flex",
  flexDirection: "column",
  gap: 4,
  minWidth: 220
};

const labelStyle = {
  fontSize: 12,
  fontWeight: 500,
  color: "#333"
};

const label = labelStyle;

const input = {
  fontSize: 12,
  padding: "4px 6px",
  borderRadius: 4,
  border: "1px solid #ccc",
  boxSizing: "border-box",
  width: "100%"
};

const inputReadOnly = {
  ...input,
  backgroundColor: "#f5f5f5",
  cursor: "not-allowed",
  color: "#666"
};

const inputSmall = {
  ...input,
  maxWidth: 130,
  textAlign: "right"
};

const summaryBox = {
  borderRadius: 6,
  border: "1px solid #eee",
  padding: 8,
  minWidth: 200,
  fontSize: 12,
  background: "#fafafa"
};

const summaryLine = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 4
};

const inputsGrid = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
  gap: 10,
  marginBottom: 4
};

const table = {
  width: "100%",
  borderCollapse: "collapse",
  fontSize: 11,
  marginTop: 8,
  overflowX: 'auto',
  display: 'block'
};

const th = {
  borderBottom: "1px solid #ccc",
  padding: "4px 6px",
  textAlign: "center",
  background: "#f5f5f5"
};

const td = {
  borderBottom: "1px solid #eee",
  padding: "3px 6px",
  textAlign: "left"
};

const tdRight = {
  ...td,
  textAlign: "right"
};

const smokeMetaRow = {
  display: "flex",
  gap: 16,
  flexWrap: "wrap",
  marginBottom: 8,
  fontSize: 11
};

// Added dedicated styles for smoke emission table alignment
const smokeTableStyle = {
  width: '100%',
  borderCollapse: 'collapse',
  tableLayout: 'fixed'
};
const thVehicle = { ...th, textAlign: 'left' };
const thNumeric = { ...th, textAlign: 'right' };
const tdVehicle = { ...td, textAlign: 'left' };
const tdNumeric = { ...tdRight };
const inputSmallRight = { ...inputSmall, textAlign: 'right' };

const smokeMetaBox = {
  background: "#fff",
  border: "1px solid #eee",
  borderRadius: 4,
  padding: "4px 8px"
};

const buttonStyle = {
  padding: "8px 12px",
  fontSize: 12,
  borderRadius: 4,
  border: "1px solid #ccc",
  backgroundColor: "#fff",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  gap: 4,
  minHeight: '40px',
  whiteSpace: 'nowrap'
};

// Localized vehicle label resolver
function renderVehicleLabel(key, t) {
  switch (key) {
    case "passengerGasoline":
      return t.passengerGasoline;
    case "passengerDiesel":
      return t.passengerDiesel;
    case "busSmall":
      return t.busSmall;
    case "busLarge":
      return t.busLarge;
    case "truckSmall":
      return t.truckSmall;
    case "truckMedium":
      return t.truckMedium;
    case "truckLarge":
      return t.truckLarge;
    case "truckSpecial":
      return t.truckSpecial;
    default:
      return key;
  }
}


