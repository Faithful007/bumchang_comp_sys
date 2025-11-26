// src/utils/speedGradeTables.js
// Centralized registry and helpers for pollutant speed–grade f_iv tables.
// Import JSON once here; use from anywhere via exported helpers.

import pmRaw from "./data/pmSpeedGradeFiv.json";
import coRaw from "./data/coSpeedGradeFiv.json";
import noxRaw from "./data/noxSpeedGradeFiv.json";

// Normalize raw JSON formats into internal shape: { metadata: { speeds_kmh, grades_percent }, vehicle_classes: { key: { label_ko, fiv_table } } }
function normalizeRaw(raw) {
  if (!raw) return null;
  // Already in internal shape
  if (raw.metadata && raw.vehicle_classes) return raw;
  // Structured catalog format: { base_speed_grade_tables: [ { title, grades, rows:[{speed_kmh, values:{grade:value}}] } ] }
  if (raw.base_speed_grade_tables) {
    const entries = raw.base_speed_grade_tables;
    if (!entries.length) return null;
    const grades = entries[0].grades.slice();
    const speeds = entries[0].rows.map(r => r.speed_kmh);
    const vehicle_classes = {};
    entries.forEach(entry => {
      const key = mapTitleToVehicleKey(entry.title);
      const fiv_table = entry.rows.map(r => grades.map(g => r.values[String(g)]));
      vehicle_classes[key] = { label_ko: entry.title, fiv_table };
    });
    return {
      metadata: { speeds_kmh: speeds, grades_percent: grades, source: raw.sheet || "sheet" },
      vehicle_classes
    };
  }
  return raw; // Fallback
}

// Runtime overrides (if user imports a custom table from data catalog)
const TABLE_OVERRIDES = {}; // pollutant => table object

// Pollutant -> table mapping
const pmTable = normalizeRaw(pmRaw);
const coTable = normalizeRaw(coRaw);
const noxTable = normalizeRaw(noxRaw);

export const SPEED_GRADE_TABLES = Object.freeze({ PM: pmTable, CO: coTable, NOx: noxTable });

// Canonical vehicle classes (keys should be the same across pollutants)
export const VEHICLE_CLASSES = Object.freeze([
  { key: "gasoline_passenger", label: "휘발유 승용차" },
  { key: "diesel_passenger", label: "경유 승용차" },
  { key: "small_bus_truck", label: "소형버스·소형트럭" },
  { key: "large_bus_and_heavy_truck", label: "대형버스·중형·대형·특수트럭" }
]);

export function getTable(pollutant) {
  if (TABLE_OVERRIDES[pollutant]) return TABLE_OVERRIDES[pollutant];
  const t = SPEED_GRADE_TABLES[pollutant];
  if (!t) throw new Error(`Unknown pollutant table: ${pollutant}`);
  return t;
}

export function getSpeeds(pollutant) {
  return getTable(pollutant).metadata?.speeds_kmh || [];
}

export function getGrades(pollutant) {
  return getTable(pollutant).metadata?.grades_percent || [];
}

export function getVehicleClassesFromTable(pollutant) {
  const tbl = getTable(pollutant);
  return Object.keys(tbl.vehicle_classes || {});
}

export function getFivGrid(pollutant, vehicleClassKey) {
  const tbl = getTable(pollutant);
  const cls = tbl.vehicle_classes?.[vehicleClassKey];
  if (!cls) throw new Error(`Unknown class ${vehicleClassKey} for ${pollutant}`);
  return cls.fiv_table;
}

/**
 * Get f_iv value with speed snap + grade interpolation.
 * Matches Excel logic: nearest speed, linear interpolation on grade.
 * 
 * @param {string} pollutant - "PM", "CO", or "NOx"
 * @param {string} vehicleClassKey - vehicle class key
 * @param {number} speedKmh - speed in km/h
 * @param {number} gradePercent - grade in %
 * @returns {number} f_iv correction factor
 */
export function getFivValue(pollutant, vehicleClassKey, speedKmh, gradePercent) {
  const speeds = getSpeeds(pollutant);
  const grades = getGrades(pollutant);
  const grid = getFivGrid(pollutant, vehicleClassKey);

  const v = Number(speedKmh);
  const i = Number(gradePercent);
  
  if (!Number.isFinite(v) || !Number.isFinite(i)) return NaN;

  // Snap to nearest speed
  let speedIdx = 0;
  let minDist = Infinity;
  speeds.forEach((s, idx) => {
    const dist = Math.abs(v - s);
    if (dist < minDist) {
      minDist = dist;
      speedIdx = idx;
    }
  });

  // Interpolate grade
  const iFloor = Math.floor(i);
  const iCeil = iFloor + 1;

  let colLow = grades.indexOf(iFloor);
  let colHigh = grades.indexOf(iCeil);

  // Clamp if out of range
  if (colLow === -1) {
    let best = 0;
    grades.forEach((g, idx) => {
      if (g <= i) best = idx;
    });
    colLow = best;
  }
  
  if (colHigh === -1) {
    colHigh = Math.min(colLow + 1, grades.length - 1);
  }

  const fLow = grid[speedIdx][colLow];
  const fHigh = grid[speedIdx][colHigh];

  if (colLow === colHigh) return Number(fLow.toFixed(4));

  const t = (i - grades[colLow]) / (grades[colHigh] - grades[colLow]);
  const f = fLow + (fHigh - fLow) * t;

  return Number(f.toFixed(4));
}

/**
 * Set a runtime override table for a pollutant.
 * @param {"PM"|"CO"|"NOx"} pollutant 
 * @param {object} tableObject - must have metadata {speeds_kmh, grades_percent} and vehicle_classes mapping
 */
export function setTableOverride(pollutant, tableObject) {
  TABLE_OVERRIDES[pollutant] = tableObject;
}

/** Clear an override for a pollutant. */
export function clearTableOverride(pollutant) {
  delete TABLE_OVERRIDES[pollutant];
}

/** Map localized title to internal vehicle class key. */
function mapTitleToVehicleKey(title = "") {
  if (/휘발유/.test(title)) return "gasoline_passenger";
  if (/경유/.test(title) && /승용차/.test(title)) return "diesel_passenger";
  if (/소형버스|소형트럭/.test(title)) return "small_bus_truck";
  if (/대형버스|중형트럭|대형트럭|특수트럭/.test(title)) return "large_bus_and_heavy_truck";
  return title.replace(/[^a-z0-9_]+/gi, "_").toLowerCase();
}

/**
 * Build override table object from structured catalog JSON (utils/data/*.json).
 * Expected shape: { base_speed_grade_tables: [ { title, grades, rows:[{speed_kmh, values:{ grade: value }}] } ] }
 */
export function buildOverrideFromStructuredData(structuredJson) {
  const entries = structuredJson?.base_speed_grade_tables || [];
  if (!entries.length) throw new Error("Structured data missing base_speed_grade_tables");
  // Assume all entries share same grades and speeds.
  const grades = entries[0].grades.slice();
  // Collect speeds from first entry rows
  const speeds = entries[0].rows.map(r => r.speed_kmh);

  const vehicle_classes = {};
  entries.forEach(entry => {
    const key = mapTitleToVehicleKey(entry.title);
    const fiv_table = entry.rows.map(r => grades.map(g => r.values[String(g)]));
    vehicle_classes[key] = { label_ko: entry.title, fiv_table };
  });

  return {
    metadata: { speeds_kmh: speeds, grades_percent: grades, source: structuredJson.sheet },
    vehicle_classes
  };
}
