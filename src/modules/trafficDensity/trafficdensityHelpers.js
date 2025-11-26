// src/modules/trafficDensity/trafficdensityHelpers.js

// Default speeds from row 210
export const DEFAULT_SPEEDS_KMH = [10, 20, 30, 40, 50, 60, 70, 80];

/**
 * Compute traffic volume ("교통량", row 211) at a given speed.
 *
 * Excel (B211 example):
 * =IF($F$208=1,
 *      ROUND(150*$B$208/(150*B210 + $B$208*(1-B210/60)^2),0),
 *      ROUND(165*$B$208/(165*B210 + $B$208*(1-B210/60)^2),0))
 *
 * Here:
 *   Imax = B208  (최대교통량 [pcu/hr])
 *   roadType = F208  (1: 국도/고속도로, 2: 도심지)
 *   V = speed [km/h]
 */
export function computeTrafficFlow(Imax, V, roadType) {
  const I = Number(Imax);
  const v = Number(V);
  const type = Number(roadType);

  if (!Number.isFinite(I) || I <= 0 || !Number.isFinite(v) || v <= 0) {
    return 0;
  }

  const K = type === 1 ? 150 : 165; // same as Excel
  const numerator = K * I;
  const denominator = K * v + I * Math.pow(1 - v / 60, 2);

  const q = numerator / denominator; // pcu/hr (per lane)
  return Math.round(q); // Excel uses ROUND/ROUNDUP → integer
}

/**
 * Traffic density ("PCU/km, lane", row 212 – not filled in sheet but implied):
 *   density = flow / speed
 */
export function computeTrafficDensity(Imax, V, roadType) {
  const flow = computeTrafficFlow(Imax, V, roadType);
  const v = Number(V);
  if (!Number.isFinite(v) || v <= 0) return 0;
  const k = flow / v; // pcu/km/lane
  return Number(k.toFixed(3)); // 3 decimal places as requested
}

/**
 * Build the whole table (for all speeds).
 */
export function buildTrafficDensityTable(
  Imax,
  roadType,
  speeds = DEFAULT_SPEEDS_KMH
) {
  return speeds.map((speed) => {
    const flow = computeTrafficFlow(Imax, speed, roadType);
    const density = computeTrafficDensity(Imax, speed, roadType);
    return {
      speed,
      flow,
      density
    };
  });
}
