// src/modules/designConditions/calculations.js

// Design-speed-based capacity (per lane, veh/h or pcu/h) – you can tune these.
export const SPEED_CAPACITY_TABLE = {
  80: 2000,
  100: 2200,
  120: 2300
};

// Service level code mapping A-F -> 1-6
const SERVICE_LEVEL_MAP = { A: 1, B: 2, C: 3, D: 4, E: 5, F: 6 };

export function serviceLevelCodeToNumber(code) {
  return SERVICE_LEVEL_MAP[code] || null;
}

/**
 * Compute basic stats for one direction from its segments.
 * segments: array of { slopePercent, lengthM, avgElevationM, laneCount }
 */
export function computeDirectionStats(segments) {
  const totalLengthM = segments.reduce(
    (sum, seg) => sum + (Number(seg.lengthM) || 0),
    0
  );

  // Max lanes among segments in that direction
  const lanes =
    segments.reduce(
      (max, seg) => Math.max(max, Number(seg.laneCount) || 0),
      0
    ) || 0;

  return { totalLengthM, lanes };
}

/**
 * Estimate traffic volume for one direction.
 *
 * designSpeedKmH: 80 / 100 / 120 ...
 * capacityUsageRatio: 0.3 / 0.2 / 0.1 ...
 * lanes: number of lanes in this direction
 *
 * Returns { baseCapacityPerLane, capacityTotal, estimatedVolume }.
 */
export function estimateTrafficVolume({
  designSpeedKmH,
  capacityUsageRatio,
  lanes
}) {
  const speed = Number(designSpeedKmH);
  const ratio = Number(capacityUsageRatio);

  const baseCapacityPerLane =
    SPEED_CAPACITY_TABLE[speed] ?? SPEED_CAPACITY_TABLE[80];

  const capacityTotal = baseCapacityPerLane * (lanes || 0);

  const estimatedVolume = Math.round(capacityTotal * (ratio || 0));

  return { baseCapacityPerLane, capacityTotal, estimatedVolume };
}
