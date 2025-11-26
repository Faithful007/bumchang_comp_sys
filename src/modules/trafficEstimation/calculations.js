// src/modules/trafficEstimation/calculations.js

// Excel logic: passenger cars split 60% gasoline / 40% diesel
export const PASSENGER_SPLIT = {
  gasoline: 0.6,
  diesel: 0.4
};

// Order aligned with Excel columns (C..J)
export const VEHICLE_KEYS = [
  "passengerGasoline", // C (휘발유)
  "passengerDiesel",   // D (경유)
  "busSmall",          // E (소형 버스)
  "busLarge",          // F (대형 버스)
  "truckSmall",        // G (소형 트럭)
  "truckMedium",       // H (중형 트럭)
  "truckLarge",        // I (대형 트럭)
  "truckSpecial"       // J (특수)
];

/**
 * Compute estimated daily traffic (추정교통량 / 정교통량)
 * based on your sheet1 formulas.
 *
 * @param {{
 *   passengerAADT: number,
 *   busSmall: number,
 *   busLarge: number,
 *   truckSmall: number,
 *   truckMedium: number,
 *   truckLarge: number,
 *   truckSpecial: number
 * }} params
 */
export function computeEstimatedTraffic(params) {
  const {
    passengerAADT = 0,
    busSmall = 0,
    busLarge = 0,
    truckSmall = 0,
    truckMedium = 0,
    truckLarge = 0,
    truckSpecial = 0
  } = params;

  // 1) Counts (row 38 / 55 equivalents)
  const counts = {
    passengerGasoline: passengerAADT * PASSENGER_SPLIT.gasoline,
    passengerDiesel: passengerAADT * PASSENGER_SPLIT.diesel,
    busSmall,
    busLarge,
    truckSmall,
    truckMedium,
    truckLarge,
    truckSpecial
  };

  // 2) Total AADT (K38 / K55)
  const totalAadt = VEHICLE_KEYS.reduce(
    (sum, key) => sum + (Number(counts[key]) || 0),
    0
  );

  // 3) Mix ratios (%) per vehicle type (C39..J39)
  const mixPercents = {};
  if (totalAadt > 0) {
    VEHICLE_KEYS.forEach((key) => {
      const v = Number(counts[key]) || 0;
      mixPercents[key] = Number(((v / totalAadt) * 100).toFixed(2));
    });
  } else {
    VEHICLE_KEYS.forEach((key) => {
      mixPercents[key] = 0;
    });
  }

  // 4) Heavy-vehicle mix Pt = F39 + H39 + I39 + J39
  const heavyVehicleMixPt = Number(
    (
      (mixPercents.busLarge || 0) +
      (mixPercents.truckMedium || 0) +
      (mixPercents.truckLarge || 0) +
      (mixPercents.truckSpecial || 0)
    ).toFixed(2)
  );

  // 5) Sum of mix (%) – for check (should be ~100)
  const mixPercentSum = VEHICLE_KEYS.reduce(
    (sum, key) => sum + (mixPercents[key] || 0),
    0
  );

  return {
    counts,            // per-category daily counts
    totalAadt,         // K38/K55
    mixPercents,       // per-category mix %
    mixPercentSum,     // ~100
    heavyVehicleMixPt  // Pt (%)
  };
}
