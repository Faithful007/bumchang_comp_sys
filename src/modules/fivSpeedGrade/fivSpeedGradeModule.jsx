// src/modules/fivSpeedGrade/FivSpeedGradeModule.jsx
import React, { useState } from "react";
import { useLanguage } from "../../i18n/LanguageContext";
import { getModuleStrings } from "../../i18n/appStrings";
import { PM_FIV_GROUPS, getFivPM } from "./fivHelpers";

export default function FivSpeedGradeModule() {
  const { lang } = useLanguage();
  const t = getModuleStrings("fivSpeedGrade", lang);

  const [speed, setSpeed] = useState(60);   // km/h
  const [grade, setGrade] = useState(0);    // %

  const rows = PM_FIV_GROUPS.map((g) => ({
    ...g,
    fiv: getFivPM(g.jsonKey, speed, grade)
  }));

  return (
    <section style={outerSection}>
      <h2 style={{ marginTop: 0 }}>{t.title}</h2>

      <p style={explanation}>{t.description}</p>

      {/* Inputs: speed & grade */}
      <div style={inputsRow}>
        <div style={fieldGroup}>
          <label style={label}>{t.speedLabel}</label>
          <input
            type="number"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value) || 0)}
            style={input}
          />
        </div>

        <div style={fieldGroup}>
          <label style={label}>{t.gradeLabel}</label>
          <input
            type="number"
            value={grade}
            onChange={(e) => setGrade(Number(e.target.value) || 0)}
            style={input}
          />
        </div>
      </div>

      {/* Results for 4 vehicle groups */}
      <table style={table}>
        <thead>
          <tr>
            <th style={th}>{t.groupHeader}</th>
            <th style={th}>{t.classHeader}</th>
            <th style={th}>{t.fivHeader}</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.id}>
              <td style={td}>{row.id.toUpperCase()}</td>
              <td style={td}>{row.labelKo}</td>
              <td style={tdRight}>{row.fiv.toFixed(3)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p style={note}>{t.note}</p>
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

const explanation = {
  fontSize: 12,
  color: "#555",
  marginBottom: 12
};

const inputsRow = {
  display: "flex",
  flexWrap: "wrap",
  gap: 12,
  marginBottom: 12
};

const fieldGroup = {
  display: "flex",
  flexDirection: "column",
  gap: 4,
  minWidth: 160
};

const label = {
  fontSize: 12,
  fontWeight: 500,
  color: "#333"
};

const input = {
  fontSize: 12,
  padding: "4px 6px",
  borderRadius: 4,
  border: "1px solid #ccc",
  boxSizing: "border-box"
};

const table = {
  width: "100%",
  borderCollapse: "collapse",
  fontSize: 11,
  marginTop: 4
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

const note = {
  marginTop: 8,
  fontSize: 11,
  color: "#777"
};
