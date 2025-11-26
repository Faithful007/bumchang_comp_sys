// src/modules/fivSpeedGrade/fivHelpers.js
import { getFivValue } from "../../utils/speedGradeTables";

// Map “a–d” groups to JSON vehicle_classes keys
export const PM_FIV_GROUPS = [
  {
    id: "a",
    jsonKey: "gasoline_passenger",
    labelKo: "a) 휘발유 승용차"
  },
  {
    id: "b",
    jsonKey: "diesel_passenger",
    labelKo: "b) 경유 승용차"
  },
  {
    id: "c",
    jsonKey: "small_bus_truck",
    labelKo: "c) 소형버스, 소형트럭"
  },
  {
    id: "d",
    jsonKey: "large_bus_and_heavy_truck",
    labelKo: "d) 대형버스, 중형·대형·특수트럭"
  }
];

/**
 * Look up f_iv for PM using the centralized helper.
 *
 * @param {string} vehicleClassKey - one of PM vehicle_classes keys
 * @param {number} speedKmh        - speed in km/h
 * @param {number} gradePercent    - longitudinal grade in %
 */
export function getFivPM(vehicleClassKey, speedKmh, gradePercent) {
  return getFivValue("PM", vehicleClassKey, speedKmh, gradePercent);
}
