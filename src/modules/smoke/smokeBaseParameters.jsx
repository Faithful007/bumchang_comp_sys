// src/modules/smoke/SmokeBaseParameters.jsx
import React, { useState, useMemo } from "react";
import {
  SMOKE_EMISSION_FACTORS_G_PER_KM_DEFAULT,
  SMOKE_VEHICLE_KEYS,
  computeSmokeQ0Map,
  SMOKE_REDUCTION_FACTOR,
  SMOKE_REFERENCE_SPEED_KMH
} from "./smokeParameters";
import { useLanguage } from "../../i18n/LanguageContext";
import { getModuleStrings } from "../../i18n/appStrings"; // you can add a smoke section later if you want i18n

// simple labels; you can i18n these later
const VEHICLE_LABELS = {
  passengerGasoline: "Passenger car – gasoline (휘발유)",
  passengerDiesel: "Passenger car – diesel (경유)",
  busSmall: "Bus – small (소형)",
  busLarge: "Bus – large (대형)",
  truckSmall: "Truck – small (소형)",
  truckMedium: "Truck – medium (중형)",
  truckLarge: "Truck – large (대형)",
  truckSpecial: "Special (특수)"
};

export default function SmokeBaseParameters() {
  const { lang } = useLanguage();
  // if you later add `smokeBase` section in appStrings.js:
  // const t = getModuleStrings("smokeBase", lang);

  const [reductionFactor, setReductionFactor] = useState(
    SMOKE_REDUCTION_FACTOR * 100 // store as %
  );
  const [referenceSpeed, setReferenceSpeed] = useState(
    SMOKE_REFERENCE_SPEED_KMH
  );

  const [emissionFactors, setEmissionFactors] = useState(
    SMOKE_EMISSION_FACTORS_G_PER_KM_DEFAULT
  );

  const q0Map = useMemo(
    () =>
      computeSmokeQ0Map(
        emissionFactors,
        (Number(reductionFactor) || 0) / 100,
        referenceSpeed
      ),
    [emissionFactors, reductionFactor, referenceSpeed]
  );

  const handleEmissionChange = (key) => (e) => {
    const value = e.target.value;
    setEmissionFactors((prev) => ({
      ...prev,
      [key]: Number(value) || 0
    }));
  };

  return (
    <section style={outerSection}>
      <h2 style={{ marginTop: 0 }}>
        2. 매연(Smoke)에 대한 소요환기량 – 기준 배출량 
      </h2>

      <table style={table}>
        <thead>
          <tr>
            <th style={th}>Vehicle type</th>
            <th style={th}>매연 배출량 허용기준 [g/km]</th>
            <th style={th}>기준배출량 q₀T [m²/h·대]</th>
          </tr>
        </thead>
        <tbody>
          {SMOKE_VEHICLE_KEYS.map((key) => (
            <tr key={key}>
              <td style={td}>{VEHICLE_LABELS[key]}</td>

              {/* Editable emission factor */}
              <td style={tdRight}>
                <input
                  type="number"
                  step="0.0001"
                  value={emissionFactors[key] ?? 0}
                  onChange={handleEmissionChange(key)}
                  style={input}
                />
              </td>

              {/* Uneditable 기준배출량 */}
              <td style={tdRight}>
                <input
                  type="number"
                  value={q0Map[key] ?? 0}
                  readOnly
                  disabled
                  style={readOnlyInput}
                />
              </td>
            </tr>
          ))}

          {/* 감소계수 / 기준속도 row (row 101) */}
          <tr>
            <td style={{ ...td, fontWeight: "bold" }}>감소계수 / 기준속도</td>
            <td style={tdRight}>
              <span style={{ fontSize: 11, marginRight: 4 }}>감소계수 [%]</span>
              <input
                type="number"
                step="0.1"
                value={reductionFactor}
                onChange={(e) =>
                  setReductionFactor(Number(e.target.value) || 0)
                }
                style={{ ...input, maxWidth: 80 }}
              />
            </td>
            <td style={tdRight}>
              <span style={{ fontSize: 11, marginRight: 4 }}>V_ref [km/h]</span>
              <input
                type="number"
                step="0.1"
                value={referenceSpeed}
                onChange={(e) =>
                  setReferenceSpeed(Number(e.target.value) || 0)
                }
                style={{ ...input, maxWidth: 80 }}
              />
            </td>
          </tr>
        </tbody>
      </table>
    </section>
  );
}

/* -------- styles -------- */

const outerSection = {
  border: "1px solid #ddd",
  borderRadius: 8,
  padding: 16,
  margin: 16,
  background: "#fafafa"
};

const table = {
  width: "100%",
  borderCollapse: "collapse",
  fontSize: 11,
  marginTop: 8
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

const input = {
  fontSize: 11,
  padding: "3px 4px",
  borderRadius: 4,
  border: "1px solid #ccc",
  width: "100%",
  boxSizing: "border-box",
  textAlign: "right"
};

const readOnlyInput = {
  ...input,
  backgroundColor: "#f5f5f5",
  cursor: "not-allowed",
  color: "#666"
};
