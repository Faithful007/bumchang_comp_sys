// src/modules/fivSpeedGrade/FivTableView.jsx
import React, { useState } from "react";
import { useLanguage } from "../../i18n/LanguageContext";
import { getModuleStrings } from "../../i18n/appStrings";
import { SPEED_GRADE_TABLES, getTable } from "../../utils/speedGradeTables";
import { useImportedTable } from "../../contexts/ImportedTableContext";
import { PM_FIV_GROUPS } from "./fivHelpers";

export default function FivTableView() {
  const { lang } = useLanguage();
  const t = getModuleStrings("fivSpeedGrade", lang);
  const tCatalog = getModuleStrings("dataCatalog", lang);
  const { importedPollutant } = useImportedTable();

  const [selectedGroup, setSelectedGroup] = useState("gasoline_passenger");
  const [viewPollutant, setViewPollutant] = useState("PM");

  // If ALL is imported, allow switching between PM/CO/NOx
  const isAllImported = importedPollutant === "ALL";
  const activePollutant = isAllImported ? viewPollutant : (importedPollutant || "PM");
  const activeFiv = getTable(activePollutant);
  const speeds = activeFiv.metadata.speeds_kmh;
  const grades = activeFiv.metadata.grades_percent;
  const tableData = activeFiv.vehicle_classes[selectedGroup]?.fiv_table || [];

  return (
    <section style={outerSection}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
        <h2 style={{ marginTop: 0, marginBottom: 0 }}>
          {activePollutant} {t.tableTitle}
        </h2>
        <div style={indicator}>
          <span style={{ fontSize: 12, fontWeight: 600, marginRight: 4 }}>{t.activeLabel}</span>
          <span style={{ 
            fontSize: 13, 
            fontWeight: 700, 
            color: importedPollutant ? "#16a34a" : "#0369a1",
            padding: "4px 10px",
            borderRadius: 4,
            background: importedPollutant ? "#dcfce7" : "#e0f2fe",
            border: importedPollutant ? "1px solid #16a34a" : "1px solid #0284c7"
          }}>
            {importedPollutant === "ALL" ? tCatalog.allSelected : 
             importedPollutant ? `✓ ${importedPollutant} (${tCatalog.imported})` : tCatalog.defaultPM}
          </span>
        </div>
      </div>
      
      <p style={description}>
        {t.tableDescription}
      </p>

      {/* Pollutant selector when ALL is imported */}
      {isAllImported && (
        <div style={selectorRow}>
          <label style={label}>{t.selectGroupLabel.replace('Vehicle Group', 'View Pollutant')}:</label>
          <div style={{ display: "flex", gap: 8 }}>
            {["PM", "CO", "NOx"].map((p) => (
              <button
                key={p}
                onClick={() => setViewPollutant(p)}
                style={{
                  ...pollutantButton,
                  ...(viewPollutant === p ? pollutantButtonActive : {})
                }}
              >
                {p}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Vehicle group selector */}
      <div style={selectorRow}>
        <label style={label}>{t.selectGroupLabel}</label>
        <select 
          value={selectedGroup} 
          onChange={(e) => setSelectedGroup(e.target.value)}
          style={select}
        >
          {PM_FIV_GROUPS.map((g) => (
            <option key={g.jsonKey} value={g.jsonKey}>
              {g.id.toUpperCase()} - {g.labelKo}
            </option>
          ))}
        </select>
      </div>

      {/* Full table */}
      <div style={tableContainer}>
        <table style={table}>
          <thead>
            <tr>
              <th style={thCorner}>Speed (km/h) \ Grade (%)</th>
              {grades.map((grade) => (
                <th key={grade} style={thGrade}>
                  {grade > 0 ? `+${grade}` : grade}%
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {speeds.map((speed, rowIdx) => (
              <tr key={speed}>
                <td style={tdSpeed}>{speed}</td>
                {grades.map((grade, colIdx) => (
                  <td key={`${speed}-${grade}`} style={tdValue}>
                    {tableData[rowIdx]?.[colIdx] ?? "—"}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={note}>
        {t.tableNote}
      </p>
    </section>
  );
}

/* ---------- styles ---------- */

const outerSection = {
  border: "1px solid #ddd",
  borderRadius: 8,
  padding: 16,
  margin: 16,
  background: "#fafafa"
};

const description = {
  fontSize: 12,
  color: "#555",
  marginBottom: 12
};

const selectorRow = {
  display: "flex",
  alignItems: "center",
  gap: 8,
  marginBottom: 16
};

const label = {
  fontSize: 13,
  fontWeight: 500,
  color: "#333"
};

const select = {
  fontSize: 13,
  padding: "6px 8px",
  borderRadius: 4,
  border: "1px solid #ccc",
  minWidth: 280,
  cursor: "pointer"
};

const tableContainer = {
  overflowX: "auto",
  border: "1px solid #ccc",
  borderRadius: 4,
  marginBottom: 12
};

const table = {
  width: "100%",
  borderCollapse: "collapse",
  fontSize: 11,
  minWidth: 800
};

const thCorner = {
  position: "sticky",
  left: 0,
  background: "#e8e8e8",
  borderBottom: "2px solid #999",
  borderRight: "2px solid #999",
  padding: "6px 8px",
  textAlign: "center",
  fontWeight: 600,
  zIndex: 2
};

const thGrade = {
  background: "#f5f5f5",
  borderBottom: "2px solid #999",
  borderRight: "1px solid #ddd",
  padding: "6px 8px",
  textAlign: "center",
  fontWeight: 600,
  minWidth: 60
};

const tdSpeed = {
  position: "sticky",
  left: 0,
  background: "#f9f9f9",
  borderBottom: "1px solid #ddd",
  borderRight: "2px solid #999",
  padding: "4px 8px",
  textAlign: "center",
  fontWeight: 500,
  zIndex: 1
};

const tdValue = {
  borderBottom: "1px solid #eee",
  borderRight: "1px solid #ddd",
  padding: "4px 8px",
  textAlign: "center",
  background: "#fff"
};

const note = {
  marginTop: 8,
  fontSize: 11,
  color: "#777",
  fontStyle: "italic"
};

const indicator = {
  display: "flex",
  alignItems: "center",
  padding: "6px 12px",
  background: "#f8fafc",
  borderRadius: 6,
  border: "1px solid #e2e8f0"
};

const pollutantButton = {
  padding: "6px 14px",
  fontSize: 13,
  fontWeight: 600,
  border: "1px solid #cbd5e1",
  borderRadius: 4,
  background: "#fff",
  color: "#64748b",
  cursor: "pointer",
  transition: "all 0.2s"
};

const pollutantButtonActive = {
  background: "#0ea5e9",
  color: "#fff",
  borderColor: "#0284c7"
};
