// Deprecated: logic moved to getFivValue in speedGradeTables.js
// Kept as thin wrapper for backward compatibility if any legacy imports remain.
import { getFivValue } from "./speedGradeTables";

let warned = false;
export function getSpeedGradeCorrection(pollutant, vehicleClassKey, speedKmh, gradePercent) {
  if (!warned && typeof console !== "undefined") {
    console.warn("getSpeedGradeCorrection is deprecated; use getFivValue instead.");
    warned = true;
  }
  return getFivValue(pollutant, vehicleClassKey, speedKmh, gradePercent);
}
