// src/modules/trafficEstimation/TrafficEstimationModule.jsx
import React, { useState } from "react";
import {
  computeEstimatedTraffic,
  VEHICLE_KEYS
} from "./calculations";
import { useLanguage } from "../../i18n/LanguageContext";
import { getModuleStrings } from "../../i18n/appStrings";

// Row labels (static; high-level language is via t.*)
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

  const [dir1, setDir1] = useState({ ...DEFAULT_DIRECTION_COUNTS });
  const [dir2, setDir2] = useState({ ...DEFAULT_DIRECTION_COUNTS });

  const result1 = computeFromDirection(dir1);
  const result2 = computeFromDirection(dir2);

  return (
    <section style={outerSection}>
      <h2 style={{ marginTop: 0 }}>{t.title}</h2>

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
            <td style={td}>{VEHICLE_LABELS[key]}</td>
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
  padding: 16,
  margin: 16,
  background: "#fafafa"
};

const explanation = {
  fontSize: 12,
  color: "#555",
  marginBottom: 12
};

const twoColumn = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
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
  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
  gap: 10,
  marginBottom: 4
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


// // src/modules/trafficEstimation/TrafficEstimationModule.jsx
// import React, { useState } from "react";
// import {
//   computeEstimatedTraffic,
//   VEHICLE_KEYS
// } from "./calculations";
// import { useLanguage } from "../../i18n/LanguageContext";
// import { getModuleStrings } from "../../i18n/appStrings";

// // Row labels (these are more static,
// // high-level language is handled via t.* strings)
// const VEHICLE_LABELS = {
//   passengerGasoline: "Passenger car – gasoline (휘발유)",
//   passengerDiesel: "Passenger car – diesel (경유)",
//   busSmall: "Bus – small (소형)",
//   busLarge: "Bus – large (대형)",
//   truckSmall: "Truck – small (소형)",
//   truckMedium: "Truck – medium (중형)",
//   truckLarge: "Truck – large (대형)",
//   truckSpecial: "Special (특수)"
// };

// // Default numbers from Excel example
// const DEFAULT_DIRECTION_INPUT = {
//   year: 2222,
//   passengerAADT: 83007, // I48 / I65
//   busSmall: 0,          // E열
//   busLarge: 815,        // F열
//   truckSmall: 14331,    // G열
//   truckMedium: 3020,    // H열
//   truckLarge: 332,      // I열
//   truckSpecial: 862     // J열
// };

// export default function TrafficEstimationModule() {
//   const { lang } = useLanguage();
//   const t = getModuleStrings("trafficEstimation", lang);

//   const [dir1, setDir1] = useState({ ...DEFAULT_DIRECTION_INPUT });
//   const [dir2, setDir2] = useState({ ...DEFAULT_DIRECTION_INPUT });

//   const result1 = computeEstimatedTraffic(dir1);
//   const result2 = computeEstimatedTraffic(dir2);

//   return (
//     <section style={outerSection}>
//       <h2 style={{ marginTop: 0 }}>{t.title}</h2>

//       <p style={explanation}>{t.explanation}</p>

//       <div style={twoColumn}>
//         <DirectionCard
//           title={t.dir1Title}
//           state={dir1}
//           onChange={setDir1}
//           result={result1}
//           t={t}
//         />
//         <DirectionCard
//           title={t.dir2Title}
//           state={dir2}
//           onChange={setDir2}
//           result={result2}
//           t={t}
//         />
//       </div>
//     </section>
//   );
// }

// function DirectionCard({ title, state, onChange, result, t }) {
//   const {
//     year,
//     passengerAADT,
//     busSmall,
//     busLarge,
//     truckSmall,
//     truckMedium,
//     truckLarge,
//     truckSpecial
//   } = state;

//   const handle = (field) => (e) => {
//     const value = e.target.value;
//     onChange((prev) => ({
//       ...prev,
//       [field]: field === "year" ? Number(value) || "" : Number(value) || 0
//     }));
//   };

//   return (
//     <div style={card}>
//       <h3 style={{ marginTop: 0 }}>{title}</h3>

//       {/* Top row: target year + summary */}
//       <div style={headerRow}>
//         <div style={fieldGroup}>
//           <label style={label}>{t.targetYear}</label>
//           <input
//             type="number"
//             value={year}
//             onChange={handle("year")}
//             style={input}
//           />
//         </div>

//         <div style={summaryBox}>
//           <div style={summaryLine}>
//             <span>{t.totalAadt}</span>
//             <strong>
//               {result.totalAadt
//                 ? Math.round(result.totalAadt).toLocaleString()
//                 : "-"}
//             </strong>
//           </div>
//           <div style={summaryLine}>
//             <span>{t.heavyMix}</span>
//             <strong>
//               {result.heavyVehicleMixPt != null
//                 ? result.heavyVehicleMixPt.toFixed(2)
//                 : "-"}
//             </strong>
//           </div>
//         </div>
//       </div>

//       {/* Base inputs: equivalent to I, F..J cells in Excel */}
//       <div style={inputsGrid}>
//         <Field
//           label={t.passengerAadt}
//           value={passengerAADT}
//           onChange={handle("passengerAADT")}
//         />
//         <Field
//           label={t.busSmall}
//           value={busSmall}
//           onChange={handle("busSmall")}
//         />
//         <Field
//           label={t.busLarge}
//           value={busLarge}
//           onChange={handle("busLarge")}
//         />
//         <Field
//           label={t.truckSmall}
//           value={truckSmall}
//           onChange={handle("truckSmall")}
//         />
//         <Field
//           label={t.truckMedium}
//           value={truckMedium}
//           onChange={handle("truckMedium")}
//         />
//         <Field
//           label={t.truckLarge}
//           value={truckLarge}
//           onChange={handle("truckLarge")}
//         />
//         <Field
//           label={t.truckSpecial}
//           value={truckSpecial}
//           onChange={handle("truckSpecial")}
//         />
//       </div>

//       <ResultsTable result={result} t={t} />
//     </div>
//   );
// }

// function Field({ label, value, onChange }) {
//   return (
//     <div style={fieldGroup}>
//       <label style={labelStyle}>{label}</label>
//       <input
//         type="number"
//         value={value}
//         onChange={onChange}
//         style={input}
//       />
//     </div>
//   );
// }

// function ResultsTable({ result, t }) {
//   const { counts, mixPercents, mixPercentSum, heavyVehicleMixPt } = result;

//   return (
//     <table style={table}>
//       <thead>
//         <tr>
//           <th style={th}>{t.vehicleHeader}</th>
//           <th style={th}>{t.dailyHeader}</th>
//           <th style={th}>{t.mixHeader}</th>
//         </tr>
//       </thead>
//       <tbody>
//         {VEHICLE_KEYS.map((key) => (
//           <tr key={key}>
//             <td style={td}>{VEHICLE_LABELS[key]}</td>
//             <td style={tdRight}>
//               {counts && counts[key] != null
//                 ? Math.round(counts[key]).toLocaleString()
//                 : "-"}
//             </td>
//             <td style={tdRight}>
//               {mixPercents && mixPercents[key] != null
//                 ? mixPercents[key].toFixed(2)
//                 : "-"}
//             </td>
//           </tr>
//         ))}
//         <tr>
//           <td style={{ ...td, fontWeight: "bold" }}>{t.totalRow}</td>
//           <td style={{ ...tdRight, fontWeight: "bold" }}>
//             {result.totalAadt
//               ? Math.round(result.totalAadt).toLocaleString()
//               : "-"}
//           </td>
//           <td style={{ ...tdRight, fontWeight: "bold" }}>
//             {mixPercentSum != null ? mixPercentSum.toFixed(2) : "-"}
//           </td>
//         </tr>
//         <tr>
//           <td style={td}>{t.heavyMixRow}</td>
//           <td style={tdRight}>–</td>
//           <td style={{ ...tdRight, fontWeight: "bold" }}>
//             {heavyVehicleMixPt != null ? heavyVehicleMixPt.toFixed(2) : "-"}
//           </td>
//         </tr>
//       </tbody>
//     </table>
//   );
// }

// /* ---------- styles ---------- */

// const outerSection = {
//   border: "1px solid #ddd",
//   borderRadius: 8,
//   padding: 16,
//   margin: 16,
//   background: "#fafafa"
// };

// const explanation = {
//   fontSize: 12,
//   color: "#555",
//   marginBottom: 12
// };

// const twoColumn = {
//   display: "grid",
//   gridTemplateColumns: "repeat(auto-fit, minmax(360px, 1fr))",
//   gap: 16
// };

// const card = {
//   background: "#fff",
//   borderRadius: 8,
//   border: "1px solid #ddd",
//   padding: 12
// };

// const headerRow = {
//   display: "flex",
//   justifyContent: "space-between",
//   alignItems: "flex-start",
//   gap: 12,
//   marginBottom: 12,
//   flexWrap: "wrap"
// };

// const fieldGroup = {
//   display: "flex",
//   flexDirection: "column",
//   gap: 4,
//   minWidth: 220
// };

// const labelStyle = {
//   fontSize: 12,
//   fontWeight: 500,
//   color: "#333"
// };

// const label = labelStyle;

// const input = {
//   fontSize: 12,
//   padding: "4px 6px",
//   borderRadius: 4,
//   border: "1px solid #ccc",
//   boxSizing: "border-box"
// };

// const summaryBox = {
//   borderRadius: 6,
//   border: "1px solid #eee",
//   padding: 8,
//   minWidth: 200,
//   fontSize: 12,
//   background: "#fafafa"
// };

// const summaryLine = {
//   display: "flex",
//   justifyContent: "space-between",
//   alignItems: "center",
//   marginBottom: 4
// };

// const inputsGrid = {
//   display: "grid",
//   gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
//   gap: 10,
//   marginBottom: 12
// };

// const table = {
//   width: "100%",
//   borderCollapse: "collapse",
//   fontSize: 11
// };

// const th = {
//   borderBottom: "1px solid #ccc",
//   padding: "4px 6px",
//   textAlign: "center",
//   background: "#f5f5f5"
// };

// const td = {
//   borderBottom: "1px solid #eee",
//   padding: "3px 6px",
//   textAlign: "left"
// };

// const tdRight = {
//   ...td,
//   textAlign: "right"
// };

