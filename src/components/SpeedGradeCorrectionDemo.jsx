// src/components/SpeedGradeCorrectionDemo.jsx
import React, { useState } from "react";
import { getFivValue, VEHICLE_CLASSES } from "../utils/speedGradeTables";

const POLLUTANTS = [
  { key: "PM", label: "PM (입자상물질)" },
  { key: "CO", label: "CO" },
  { key: "NOx", label: "NOx" }
];

export default function SpeedGradeCorrectionDemo() {
  const [pollutant, setPollutant] = useState("PM");
  const [vehicleClass, setVehicleClass] = useState("gasoline_passenger");
  const [speed, setSpeed] = useState(60);
  const [grade, setGrade] = useState(0);

  const factor = getFivValue(pollutant, vehicleClass, speed, grade);

  return (
    <section style={outer}>
      <h2 style={{ marginTop: 0 }}>속도·경사 보정계수 f(V, i) 조회</h2>

      <div style={row}>
        {/* Pollutant */}
        <div style={field}>
          <label style={label}>오염물질</label>
          <select
            value={pollutant}
            onChange={(e) => setPollutant(e.target.value)}
            style={select}
          >
            {POLLUTANTS.map((p) => (
              <option key={p.key} value={p.key}>
                {p.label}
              </option>
            ))}
          </select>
        </div>

        {/* Vehicle class */}
        <div style={field}>
          <label style={label}>차종 그룹</label>
          <select
            value={vehicleClass}
            onChange={(e) => setVehicleClass(e.target.value)}
            style={select}
          >
            {VEHICLE_CLASSES.map((v) => (
              <option key={v.key} value={v.key}>
                {v.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div style={row}>
        {/* Speed */}
        <div style={field}>
          <label style={label}>속도 V [km/h]</label>
          <input
            type="number"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value) || 0)}
            style={input}
          />
        </div>

        {/* Grade */}
        <div style={field}>
          <label style={label}>종단경사 i [%]</label>
          <input
            type="number"
            value={grade}
            onChange={(e) => setGrade(Number(e.target.value) || 0)}
            style={input}
          />
        </div>
      </div>

      <div style={resultBox}>
        <div style={{ fontSize: 13, marginBottom: 4 }}>보정계수 f(V, i)</div>
        <div style={{ fontSize: 20, fontWeight: 700 }}>
          {Number.isNaN(factor) ? "-" : factor.toFixed(4)}
        </div>
      </div>
    </section>
  );
}

/* ---- simple styles ---- */

const outer = {
  border: "1px solid #ddd",
  borderRadius: 8,
  padding: 16,
  margin: 16,
  background: "#fafafa",
  maxWidth: 600
};

const row = {
  display: "flex",
  gap: 12,
  flexWrap: "wrap",
  marginBottom: 8
};

const field = {
  display: "flex",
  flexDirection: "column",
  gap: 4,
  minWidth: 180
};

const label = {
  fontSize: 12,
  fontWeight: 500
};

const select = {
  padding: "4px 6px",
  fontSize: 13,
  borderRadius: 4,
  border: "1px solid #ccc"
};

const input = {
  padding: "4px 6px",
  fontSize: 13,
  borderRadius: 4,
  border: "1px solid #ccc"
};

const resultBox = {
  marginTop: 12,
  padding: 8,
  borderRadius: 6,
  background: "#fff",
  border: "1px solid #ddd"
};
