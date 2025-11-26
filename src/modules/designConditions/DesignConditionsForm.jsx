// src/modules/designConditions/DesignConditionsForm.jsx
import React, { useState } from "react";
import {
  computeDirectionStats,
  estimateTrafficVolume,
  SPEED_CAPACITY_TABLE,
  serviceLevelCodeToNumber
} from "./calculations";

import { getModuleStrings } from "../../i18n/appStrings";
import { useLanguage } from "../../i18n/LanguageContext";
import { useDesignSpeed } from "../../contexts/DesignSpeedContext";

const EMPTY_SEGMENT = {
  slopePercent: "",
  lengthM: "",
  laneCount: ""
};

// Removed fixed segment count constant (now dynamic per direction)

// Excel-style mapping: IF(V=120,0.1, IF(V=100,0.2, IF(V=80,0.3)))
function defaultApplyCodeForSpeed(speed) {
  if (speed === 120) return 0.1;
  if (speed === 100) return 0.2;
  if (speed === 80) return 0.3;
  return 0.3;
}

// export default function DesignConditionsForm() {
//   // UI language
//   const [lang, setLang] = useState("en");
//   const t = getDesignConditionsStrings(lang);
export default function DesignConditionsForm() {
  const { lang } = useLanguage();
  const { setDesignSpeed } = useDesignSpeed();
  const t = getModuleStrings("designConditions", lang);

  // Section count per direction
  const [sectionCountMasanToJinju, setSectionCountMasanToJinju] = useState(10);
  const [sectionCountJinjuToMasan, setSectionCountJinjuToMasan] = useState(10);

  // Average elevation (single value per direction)
  const [avgElevationMasanToJinju, setAvgElevationMasanToJinju] = useState(0);
  const [avgElevationJinjuToMasan, setAvgElevationJinjuToMasan] = useState(0);

  // Tunnel geometry (cross-sectional area and perimeter)
  const [tunnelArMasanToJinju, setTunnelArMasanToJinju] = useState(0);
  const [tunnelLpMasanToJinju, setTunnelLpMasanToJinju] = useState(0);
  const [tunnelArJinjuToMasan, setTunnelArJinjuToMasan] = useState(0);
  const [tunnelLpJinjuToMasan, setTunnelLpJinjuToMasan] = useState(0);

  // Segments per direction
  const [segmentsMasanToJinju, setSegmentsMasanToJinju] = useState(
    Array.from({ length: 10 }, () => ({ ...EMPTY_SEGMENT }))
  );
  const [segmentsJinjuToMasan, setSegmentsJinjuToMasan] = useState(
    Array.from({ length: 10 }, () => ({ ...EMPTY_SEGMENT }))
  );

  // Global design inputs
  const [designInputs, setDesignInputs] = useState({
    designSpeedKmH: 80,
    applyCode: defaultApplyCodeForSpeed(80),
    capacityUsageRatio: defaultApplyCodeForSpeed(80),
    serviceLevelCode: "D",
    serviceLevelValue: serviceLevelCodeToNumber("D"),
    peakTrafficJinju: 2200,
    peakTrafficMasan: 2200
  });

  const handleSegmentChange = (dir, index, field, value) => {
    const [segments, setter] =
      dir === "MasanToJinju"
        ? [segmentsMasanToJinju, setSegmentsMasanToJinju]
        : [segmentsJinjuToMasan, setSegmentsJinjuToMasan];

    const next = segments.map((seg, i) =>
      i === index ? { ...seg, [field]: value } : seg
    );
    setter(next);
  };

  const handleDesignSpeedChange = (speed) => {
    const s = Number(speed);
    const code = defaultApplyCodeForSpeed(s);
    setDesignSpeed(s); // Update context for other modules
    setDesignInputs((prev) => ({
      ...prev,
      designSpeedKmH: s,
      applyCode: code,
      capacityUsageRatio: code
    }));
  };

  const handleDesignInputChange = (field, value) => {
    setDesignInputs((prev) => ({ ...prev, [field]: value }));
  };

  const handleServiceLevelChange = (code) => {
    setDesignInputs((prev) => ({
      ...prev,
      serviceLevelCode: code,
      serviceLevelValue: serviceLevelCodeToNumber(code)
    }));
  };

  const handleSectionCountChange = (direction, newCount) => {
    const count = Math.max(1, Math.min(50, Number(newCount) || 1)); // Limit between 1-50
    
    if (direction === "MasanToJinju") {
      setSectionCountMasanToJinju(count);
      setSegmentsMasanToJinju((prev) => {
        const updated = Array.from({ length: count }, (_, i) => 
          prev[i] ? { ...prev[i] } : { ...EMPTY_SEGMENT }
        );
        return updated;
      });
    } else {
      setSectionCountJinjuToMasan(count);
      setSegmentsJinjuToMasan((prev) => {
        const updated = Array.from({ length: count }, (_, i) => 
          prev[i] ? { ...prev[i] } : { ...EMPTY_SEGMENT }
        );
        return updated;
      });
    }
  };

  // ---- Calculations per direction ----
  const statsMasanToJinju = computeDirectionStats(segmentsMasanToJinju);
  const statsJinjuToMasan = computeDirectionStats(segmentsJinjuToMasan);

  const trafficMasanToJinju = estimateTrafficVolume({
    designSpeedKmH: designInputs.designSpeedKmH,
    capacityUsageRatio: designInputs.capacityUsageRatio,
    lanes: statsMasanToJinju.lanes
  });

  const trafficJinjuToMasan = estimateTrafficVolume({
    designSpeedKmH: designInputs.designSpeedKmH,
    capacityUsageRatio: designInputs.capacityUsageRatio,
    lanes: statsJinjuToMasan.lanes
  });

  const baseCap = SPEED_CAPACITY_TABLE[designInputs.designSpeedKmH];

  return (
    <div style={{ padding: 20, fontFamily: "sans-serif" }}>
      {/* Header: title left, language selector right */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 16
        }}
      >
        <h1 style={{ margin: 0, fontSize: 20 }}>{t.moduleTitle}</h1>
      </div>

      {/* === GLOBAL DESIGN INPUTS === */}
      <section style={cardStyle}>
        <h2>{t.globalTitle}</h2>

        {/* 4-column grid for standard fields */}
        <div style={gridGlobal}>
          <div style={fieldWrapper}>
            <label style={fieldLabel}>{t.designSpeed}</label>
            <select
              value={designInputs.designSpeedKmH}
              onChange={(e) => handleDesignSpeedChange(Number(e.target.value))}
              style={controlStyle}
            >
              {Object.keys(SPEED_CAPACITY_TABLE).map((v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              ))}
            </select>
          </div>

          <div style={fieldWrapper}>
            <label style={fieldLabel}>{t.applyCode}</label>
            <input
              type="number"
              value={designInputs.applyCode}
              readOnly
              disabled
              style={readOnlyControlStyle}
            />
          </div>

          <div style={fieldWrapper}>
            <label style={fieldLabel}>{t.capacityRatio}</label>
            <input
              type="number"
              value={designInputs.capacityUsageRatio}
              onChange={(e) =>
                handleDesignInputChange(
                  "capacityUsageRatio",
                  Number(e.target.value)
                )
              }
              style={controlStyle}
            />
          </div>

          <div style={fieldWrapper}>
            <label style={fieldLabel}>{t.serviceLevel}</label>
            <div style={{ display: "flex", gap: 8 }}>
              <select
                value={designInputs.serviceLevelCode}
                onChange={(e) => handleServiceLevelChange(e.target.value)}
                style={{ ...controlStyle, flex: 1 }}
              >
                {["A", "B", "C", "D", "E", "F"].map((code) => (
                  <option key={code} value={code}>
                    {code}
                  </option>
                ))}
              </select>
              <input
                type="number"
                value={designInputs.serviceLevelValue}
                readOnly
                disabled
                style={{ ...readOnlyControlStyle, width: 60 }}
              />
            </div>
          </div>
        </div>

        {/* Peak traffic block – full width, neatly labelled Jinju/Masan */}
        <div style={peakBlock}>
          <div style={{ marginBottom: 4, fontSize: 12, fontWeight: 500 }}>
            {t.peakTrafficHeader}
          </div>
          <div style={peakRow}>
            <span style={peakLabel}>{t.peakTrafficJinjuLabel}</span>
            <input
              type="number"
              value={designInputs.peakTrafficJinju}
              onChange={(e) =>
                handleDesignInputChange(
                  "peakTrafficJinju",
                  Number(e.target.value)
                )
              }
              style={peakInput}
            />
            <span style={peakUnit}>{t.peakTrafficUnit}</span>
          </div>
          <div style={peakRow}>
            <span style={peakLabel}>{t.peakTrafficMasanLabel}</span>
            <input
              type="number"
              value={designInputs.peakTrafficMasan}
              onChange={(e) =>
                handleDesignInputChange(
                  "peakTrafficMasan",
                  Number(e.target.value)
                )
              }
              style={peakInput}
            />
            <span style={peakUnit}>{t.peakTrafficUnit}</span>
          </div>
        </div>

        <p style={hintText}>
          {t.hintText({
            speed: designInputs.designSpeedKmH,
            capPerLane: baseCap,
            applyCode: designInputs.applyCode,
            ratio: designInputs.capacityUsageRatio
          })}
        </p>
      </section>

      {/* Direction 1 */}
      <section style={cardStyle}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <h2 style={{ margin: 0 }}>{t.dir1Title}</h2>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <label style={fieldLabel}>{t.numberOfSectionsLabel}:</label>
              <input
                type="number"
                min="1"
                max="50"
                value={sectionCountMasanToJinju}
                onChange={(e) => handleSectionCountChange("MasanToJinju", e.target.value)}
                style={{ ...controlStyle, width: 80 }}
              />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <label style={fieldLabel}>{t.averageElevationLabel}:</label>
              <input
                type="number"
                value={avgElevationMasanToJinju}
                onChange={(e) => setAvgElevationMasanToJinju(Number(e.target.value))}
                style={{ ...controlStyle, width: 100 }}
              />
            </div>
          </div>
        </div>
        <SegmentsTableTransposed
          direction="MasanToJinju"
          segments={segmentsMasanToJinju}
          onChange={handleSegmentChange}
          t={t}
        />
        <TunnelGeometry
          ar={tunnelArMasanToJinju}
          lp={tunnelLpMasanToJinju}
          onArChange={setTunnelArMasanToJinju}
          onLpChange={setTunnelLpMasanToJinju}
          t={t}
        />
        <SummaryRow
          stats={statsMasanToJinju}
          traffic={trafficMasanToJinju}
          t={t}
        />
      </section>

      {/* Direction 2 */}
      <section style={cardStyle}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <h2 style={{ margin: 0 }}>{t.dir2Title}</h2>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <label style={fieldLabel}>{t.numberOfSectionsLabel}:</label>
              <input
                type="number"
                min="1"
                max="50"
                value={sectionCountJinjuToMasan}
                onChange={(e) => handleSectionCountChange("JinjuToMasan", e.target.value)}
                style={{ ...controlStyle, width: 80 }}
              />
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <label style={fieldLabel}>{t.averageElevationLabel}:</label>
              <input
                type="number"
                value={avgElevationJinjuToMasan}
                onChange={(e) => setAvgElevationJinjuToMasan(Number(e.target.value))}
                style={{ ...controlStyle, width: 100 }}
              />
            </div>
          </div>
        </div>
        <SegmentsTableTransposed
          direction="JinjuToMasan"
          segments={segmentsJinjuToMasan}
          onChange={handleSegmentChange}
          t={t}
        />
        <TunnelGeometry
          ar={tunnelArJinjuToMasan}
          lp={tunnelLpJinjuToMasan}
          onArChange={setTunnelArJinjuToMasan}
          onLpChange={setTunnelLpJinjuToMasan}
          t={t}
        />
        <SummaryRow
          stats={statsJinjuToMasan}
          traffic={trafficJinjuToMasan}
          t={t}
        />
      </section>
    </div>
  );
}

/* ====== segments table & summary ====== */

function SegmentsTableTransposed({ direction, segments, onChange, t }) {
  const colHeaders = Array.from({ length: segments.length }, (_, i) => i + 1);

  return (
    <table style={tableStyle}>
      <thead>
        <tr>
          <th style={thStyle}>{t.categoryCol}</th>
          {colHeaders.map((n) => (
            <th key={n} style={thStyle}>
              {t.sectionLabel(n)}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <tr>
          <th style={rowHeaderStyle}>{t.slopeRow}</th>
          {colHeaders.map((n, idx) => (
            <td key={n} style={tdStyle}>
              <NumberCellInput
                value={segments[idx]?.slopePercent ?? ""}
                onChange={(v) =>
                  onChange(direction, idx, "slopePercent", v)
                }
              />
            </td>
          ))}
        </tr>
        <tr>
          <th style={rowHeaderStyle}>{t.lengthRow}</th>
          {colHeaders.map((n, idx) => (
            <td key={n} style={tdStyle}>
              <NumberCellInput
                value={segments[idx]?.lengthM ?? ""}
                onChange={(v) =>
                  onChange(direction, idx, "lengthM", v)
                }
              />
            </td>
          ))}
        </tr>
        <tr>
          <th style={rowHeaderStyle}>{t.lanesRow}</th>
          {colHeaders.map((n, idx) => (
            <td key={n} style={tdStyle}>
              <NumberCellInput
                value={segments[idx]?.laneCount ?? ""}
                onChange={(v) =>
                  onChange(direction, idx, "laneCount", v)
                }
              />
            </td>
          ))}
        </tr>
      </tbody>
    </table>
  );
}

function TunnelGeometry({ ar, lp, onArChange, onLpChange, t }) {
  // Calculate representative diameter Dr = (4 * Ar) / Lp
  const dr = lp > 0 ? (4 * ar) / lp : 0;

  return (
    <div style={{ marginTop: 12, marginBottom: 8, padding: 12, backgroundColor: '#f9f9f9', borderRadius: 4 }}>
      <div style={{ fontSize: 13, fontWeight: 500, marginBottom: 8 }}>{t.tunnelGeometryTitle}</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, alignItems: 'end' }}>
        <div style={fieldWrapper}>
          <label style={fieldLabel}>{t.tunnelArLabel}</label>
          <input
            type="number"
            value={ar}
            onChange={(e) => onArChange(Number(e.target.value))}
            style={controlStyle}
            step="0.01"
          />
        </div>
        <div style={fieldWrapper}>
          <label style={fieldLabel}>{t.tunnelLpLabel}</label>
          <input
            type="number"
            value={lp}
            onChange={(e) => onLpChange(Number(e.target.value))}
            style={controlStyle}
            step="0.01"
          />
        </div>
        <div style={fieldWrapper}>
          <label style={fieldLabel}>{t.tunnelDrLabel}</label>
          <input
            type="number"
            value={dr.toFixed(3)}
            readOnly
            disabled
            style={readOnlyControlStyle}
          />
        </div>
      </div>
    </div>
  );
}

function SummaryRow({ stats, traffic, t }) {
  return (
    <div style={{ marginTop: 12, fontSize: 13 }}>
      {t.summaryText(
        stats.totalLengthM || 0,
        stats.lanes || 0,
        traffic.estimatedVolume || 0
      )}
    </div>
  );
}

function NumberCellInput({ value, onChange }) {
  return (
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      style={cellInputStyle}
    />
  );
}

/* ====== styles ====== */

const cardStyle = {
  border: "1px solid #ddd",
  borderRadius: 8,
  padding: 16,
  marginBottom: 24,
  backgroundColor: "#fff"
};

// 4 columns for main global inputs – keeps boxes nicely aligned
const gridGlobal = {
  display: "grid",
  gridTemplateColumns: "repeat(4, minmax(200px, 1fr))",
  columnGap: 16,
  rowGap: 12,
  alignItems: "flex-start"
};

const fieldWrapper = {
  display: "flex",
  flexDirection: "column",
  gap: 4
};

const fieldLabel = {
  fontSize: 12,
  fontWeight: 500,
  color: "#333"
};

const controlStyle = {
  width: "100%",
  padding: "6px 8px",
  fontSize: 12,
  lineHeight: 1.4,
  boxSizing: "border-box",
  borderRadius: 4,
  border: "1px solid #ccc"
};

const readOnlyControlStyle = {
  ...controlStyle,
  backgroundColor: "#f3f3f3",
  color: "#555",
  cursor: "not-allowed"
};

// Peak-traffic mini-table
const peakBlock = {
  marginTop: 16,
  borderTop: "1px dashed #ddd",
  paddingTop: 8,
  maxWidth: 420
};

const peakRow = {
  display: "grid",
  gridTemplateColumns: "80px 1fr 60px",
  alignItems: "center",
  columnGap: 8,
  marginTop: 4
};

const peakLabel = {
  fontSize: 12,
  textAlign: "left"
};

const peakInput = {
  ...controlStyle,
  padding: "4px 6px"
};

const peakUnit = {
  fontSize: 12,
  textAlign: "left"
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: 8,
  fontSize: 12
};

const thStyle = {
  borderBottom: "1px solid #ccc",
  padding: "4px 6px",
  textAlign: "center"
};

const rowHeaderStyle = {
  borderBottom: "1px solid #eee",
  padding: "2px 4px",
  textAlign: "left",
  background: "#fafafa",
  minWidth: 120
};

const tdStyle = {
  borderBottom: "1px solid #eee",
  padding: "2px 4px",
  textAlign: "center"
};

const cellInputStyle = {
  width: "100%",
  padding: "2px 4px",
  fontSize: 12,
  boxSizing: "border-box",
  borderRadius: 3,
  border: "1px solid #ccc"
};

const hintText = {
  marginTop: 8,
  fontSize: 11,
  color: "#555"
};
