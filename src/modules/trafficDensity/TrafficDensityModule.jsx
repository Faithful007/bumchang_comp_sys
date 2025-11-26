// src/modules/trafficDensity/TrafficDensityModule.jsx
import React, { useState, useMemo } from "react";
import {
  DEFAULT_SPEEDS_KMH,
  buildTrafficDensityTable
} from "./trafficdensityHelpers";
import { useDesignSpeed } from "../../contexts/DesignSpeedContext";
import { useLanguage } from "../../i18n/LanguageContext";
import { getModuleStrings } from "../../i18n/appStrings";

const containerStyle = {
  border: "1px solid #ddd",
  borderRadius: 8,
  padding: 16,
  margin: 16,
  backgroundColor: "#fff"
};

const labelStyle = {
  fontSize: 12,
  fontWeight: 500,
  marginBottom: 4
};

const inputRowStyle = {
  display: "flex",
  flexWrap: "wrap",
  gap: 16,
  marginBottom: 12
};

const fieldStyle = {
  display: "flex",
  flexDirection: "column",
  minWidth: 180
};

const inputStyle = {
  padding: "4px 6px",
  borderRadius: 4,
  border: "1px solid #ccc",
  fontSize: 13
};

const tableStyle = {
  width: "100%",
  borderCollapse: "collapse",
  fontSize: 13,
  backgroundColor: "#fff"
};

const thtdBase = {
  border: "1px solid #ddd",
  padding: "4px 6px",
  textAlign: "center"
};

export default function TrafficDensityModule() {
  const { lang } = useLanguage();
  const t = getModuleStrings("trafficDensity", lang);
  const { designSpeed } = useDesignSpeed();
  const [roadType, setRoadType] = useState(2);

  // Calculate Imax based on design speed: IF(V=80,2000,IF(V=100,2200,IF(V=120,2300)))
  const imax = useMemo(() => {
    if (designSpeed === 80) return 2000;
    if (designSpeed === 100) return 2200;
    if (designSpeed === 120) return 2300;
    return 2000; // default
  }, [designSpeed]);

  const tableData = useMemo(
    () => buildTrafficDensityTable(imax, roadType, DEFAULT_SPEEDS_KMH),
    [imax, roadType]
  );

  return (
    <section style={containerStyle}>
      <h2 style={{ marginTop: 0, marginBottom: 12 }}>
        {t.title}
      </h2>

      {/* Global inputs (row 208 in Excel) */}
      <div style={inputRowStyle}>
        <div style={fieldStyle}>
          <label style={labelStyle}>
            {t.imaxLabel}
          </label>
          <input
            type="number"
            value={imax}
            readOnly
            disabled
            style={{ ...inputStyle, backgroundColor: "#f3f3f3", cursor: "not-allowed" }}
          />
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle}>
            {t.roadTypeLabel}
          </label>
          <select
            value={roadType}
            onChange={(e) => setRoadType(Number(e.target.value))}
            style={inputStyle}
          >
            <option value={1}>{t.roadTypeHighway}</option>
            <option value={2}>{t.roadTypeUrban}</option>
          </select>
        </div>
      </div>

      {/* Result table: rows 210~212 */}
      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={{ ...thtdBase, width: 140 }}></th>
            {DEFAULT_SPEEDS_KMH.map((v) => (
              <th key={v} style={thtdBase}>
                {v}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* 차량속도 (row 210) */}
          <tr>
            <td style={{ ...thtdBase, textAlign: "left" }}>
              {t.speedRowLabel}
            </td>
            {tableData.map((row) => (
              <td key={`speed-${row.speed}`} style={thtdBase}>
                {row.speed}
              </td>
            ))}
          </tr>

          {/* 교통량 (row 211, Excel formula) */}
          <tr>
            <td style={{ ...thtdBase, textAlign: "left" }}>
              {t.flowRowLabel}
            </td>
            {tableData.map((row) => (
              <td key={`flow-${row.speed}`} style={thtdBase}>
                {row.flow}
              </td>
            ))}
          </tr>

          {/* PCU/km, lane (row 212, derived)
          <tr>
            <td style={{ ...thtdBase, textAlign: "left" }}>
              PCU/km, lane
            </td>
            {tableData.map((row) => (
              <td key={`density-${row.speed}`} style={thtdBase}>
                {row.density.toFixed(3)}
              </td>
            ))}
          </tr> */}
        </tbody>
      </table>
    </section>
  );
}
