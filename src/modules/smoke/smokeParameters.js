// // src/modules/smoke/smokeParameters.js
//
// Logic for sheet1 rows 91–106
// 2. 매연(Smoke)에 대한 소요환기량 – 기본 파라미터

// -------------------- global constants (row 101) --------------------

// 감소계수 75% (C101)
export const SMOKE_REDUCTION_FACTOR = 0.75;

// 기준 속도 41.3 km/h (E101)
export const SMOKE_REFERENCE_SPEED_KMH = 41.3;

// This constant 6.25 comes from the Excel conversion
// from [g/km] → [m²/h·veh]
const SMOKE_CONVERSION_COEFF = 6.25;

// -------------------- base emission factors [g/km] --------------------
// These correspond to the "매연 배출량 허용기준 [g/km]" column
// for each vehicle type (rows 93–100).
//
// Values are chosen so that when you apply the Excel formula:
//   q0T = 6.25 * g_per_km * reductionFactor * referenceSpeed
// you get the q0T numbers in your sheet:
//   0.8712, 3.8269, 7.7917, 8.6191, 11.1532, etc.

export const SMOKE_EMISSION_FACTORS_G_PER_KM_DEFAULT = {
  passengerGasoline: 0.0,                 // 승용차 휘발유 (row 93)
  passengerDiesel: 0.0,                   // 승용차 경유 (row 94)

  busSmall: 0.0,         // 소형버스 (row 95)
  truckSmall: 0.0,       // 소형트럭 (row 96)

  truckMedium: 0.0,       // 중형트럭 (row 97)
  busLarge: 0.0,          // 대형버스 (row 98)

  truckLarge: 0.0,       // 대형트럭 (row 99)
  truckSpecial: 0.0       // 특수차량 (row 100)
};

// order used in tables
export const SMOKE_VEHICLE_KEYS = [
  "passengerGasoline",
  "passengerDiesel",
  "busSmall",
  "busLarge",
  "truckSmall",
  "truckMedium",
  "truckLarge",
  "truckSpecial"
];

// -------------------- q0T calculation (기준배출량) --------------------

/**
 * Excel-equivalent formula for 기준배출량 q0T [m²/h·대]
 *
 * For each vehicle type i:
 *   q0T_i = 6.25 * g_i * (reductionFactor) * speedFactor
 *
 * where:
 *   g_i            = emission factor [g/km]
 *   reductionFactor= 감소계수 (default 0.75)
 *   speedFactor    = V_ref for light vehicles (41.3), 0.7355 for heavy vehicles
 *   vehicleKey     = used to determine if heavy vehicle
 */
export function computeSmokeQ0FromEmissionFactor(
  gPerKm,
  reductionFactor = SMOKE_REDUCTION_FACTOR,
  referenceSpeedKmh = SMOKE_REFERENCE_SPEED_KMH,
  vehicleKey = null
) {
  const g = Number(gPerKm) || 0;
  const rf = Number(reductionFactor) || 0;
  const v = Number(referenceSpeedKmh) || 0;

  // Heavy vehicles use 0.01 multiplier and 0.7355 speed factor
  const isHeavyVehicle = vehicleKey && [
    "truckSmall",
    'truckMedium',
    'truckLarge',
    'truckSpecial'
  ].includes(vehicleKey);
  
  const q0 = isHeavyVehicle 
    ? SMOKE_CONVERSION_COEFF * g * 0.01 * rf * 0.7355
    : SMOKE_CONVERSION_COEFF * g * rf * v; // [m²/h·veh]
  // Excel uses ROUND(...,4)
  return Number(q0.toFixed(4));
}



/**
 * Compute q0T map (기준배출량 for all vehicle types)
 * from a map of emission factors [g/km].
 */
export function computeSmokeQ0Map(
  emissionFactors = SMOKE_EMISSION_FACTORS_G_PER_KM_DEFAULT,
  reductionFactor = SMOKE_REDUCTION_FACTOR,
  referenceSpeedKmh = SMOKE_REFERENCE_SPEED_KMH
) {
  const q0Map = {};
  SMOKE_VEHICLE_KEYS.forEach((key) => {
    const g = emissionFactors[key] ?? 0;
    q0Map[key] = computeSmokeQ0FromEmissionFactor(
      g,
      reductionFactor,
      referenceSpeedKmh,
      key  // pass vehicle key to determine heavy vehicle logic
    );
  });
  return q0Map;
}

/**
 * Convenience: get q0 for one vehicle type.
 */
export function getSmokeQ0ForVehicleType(
  typeKey,
  emissionFactors = SMOKE_EMISSION_FACTORS_G_PER_KM_DEFAULT,
  reductionFactor = SMOKE_REDUCTION_FACTOR,
  referenceSpeedKmh = SMOKE_REFERENCE_SPEED_KMH
) {
  const g = emissionFactors[typeKey] ?? 0;
  return computeSmokeQ0FromEmissionFactor(
    g,
    reductionFactor,
    referenceSpeedKmh,
    typeKey  // pass vehicle key for heavy vehicle detection
  );
}

// -------------------- K_lim (rows 104–106) --------------------

export function getSmokeKLim(speedKmh) {
  const v = Number(speedKmh);
  if (!Number.isFinite(v)) return null;
  if (v <= 10) return 0.009;
  if (v >= 50) return 0.005;
  return 0.007;
}

export function getSmokeKLimCategory(speedKmh) {
  const v = Number(speedKmh);
  if (!Number.isFinite(v)) return null;
  if (v <= 10) return "V ≤ 10 km/h";
  if (v >= 50) return "V ≥ 50 km/h";
  return "20 km/h ≤ V ≤ 40 km/h";
}
