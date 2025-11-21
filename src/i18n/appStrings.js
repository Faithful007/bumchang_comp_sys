// src/i18n/appStrings.js

// All languages your app exposes in the dropdown
export const SUPPORTED_LANGS = ["en", "ko", "ja", "es", "it", "fr", "nl"];

export const LANGUAGE_LABELS = {
  en: "English",
  ko: "한국어",
  ja: "日本語",
  es: "Español",
  it: "Italiano",
  fr: "Français",
  nl: "Nederlands"
};

/**
 * Central dictionary:
 *   STRINGS[lang][moduleKey][stringKey]
 *
 * Current module keys:
 *   - "designConditions"
 *   - "trafficEstimation"
 */
const STRINGS = {
  /* ===================== ENGLISH ===================== */
  en: {
    designConditions: {
      // UI chrome
      languageLabel: "Language",
      moduleTitle: "Module 1 – Design Conditions & Estimated Traffic Volume",
      globalTitle: "Global Design Inputs",

      // global inputs
      designSpeed: "Design speed V [km/h]",
      applyCode: "Apply CODE",
      capacityRatio: "Capacity usage ratio",
      serviceLevel: "Service level code",

      // peak-hour traffic block
      peakTrafficHeader: "Enter peak-hour traffic volume",
      peakTrafficJinjuLabel: "Jinju",
      peakTrafficMasanLabel: "Masan",
      peakTrafficUnit: "veh/h",

      // segments tables
      dir1Title: "Masan → Jinju direction (Sections 1–10)",
      dir2Title: "Jinju → Masan direction (Sections 1–10)",
      categoryCol: "Item",
      sectionLabel: (n) => `Sec. ${n}`,
      slopeRow: "Tunnel gradient [%]",
      lengthRow: "Tunnel length [m]",
      elevationRow: "Average elevation [m]",
      lanesRow: "Number of lanes [N]",

      summaryText: (L, lanes, vol) =>
        `Total length: ${L.toFixed(2)} m, Max lanes: ${lanes}, Estimated traffic volume: ${vol.toLocaleString()} veh/h`,

      hintText: ({ speed, capPerLane, applyCode, ratio }) =>
        `Base capacity per lane at ${speed} km/h: ${capPerLane} veh/h, Apply CODE = ${applyCode}, Capacity usage ratio = ${ratio}.`
    },

    trafficEstimation: {
      title: "Module 2 – Estimated traffic volume (추정교통량)",
      explanation:
        "This module reproduces the Excel block “1) 추정교통량 / 2) 추정교통량” on sheet 1. It splits passenger cars into 60% gasoline and 40% diesel, adds bus and truck categories, and computes total daily traffic (AADT) and heavy-vehicle mix Pt.",

      dir1Title: "1) Estimated traffic – Masan ⇒ Jinju",
      dir2Title: "2) Estimated traffic – Jinju ⇒ Masan",

      targetYear: "Target year (목표년도)",
      totalAadt: "Total AADT (합계, 대/일)",
      heavyMix: "Heavy-vehicle mix Pt (%)",

      passengerAadt: "Passenger cars – total AADT (승용차 전체, 대/일)",
      busSmall: "Bus – small (버스 소형, 대/일)",
      busLarge: "Bus – large (버스 대형, 대/일)",
      truckSmall: "Truck – small (트럭 소형, 대/일)",
      truckMedium: "Truck – medium (트럭 중형, 대/일)",
      truckLarge: "Truck – large (트럭 대형, 대/일)",
      truckSpecial: "Special (특수, 대/일)",

      vehicleHeader: "Vehicle type",
      dailyHeader: "Daily volume (대/일)",
      mixHeader: "Mix (%)",
      totalRow: "Total / 합계",
      heavyMixRow: "Heavy-vehicle mix Pt (버스대형+트럭중·대+특수)"
    }
  },

  /* ===================== KOREAN ===================== */
  ko: {
    designConditions: {
      languageLabel: "언어",
      moduleTitle: "모듈 1 – 환기량 산출 설계조건 및 추정 교통량",
      globalTitle: "전역 설계 입력값",

      designSpeed: "설계속도 V [km/h]",
      applyCode: "적용CODE",
      capacityRatio: "용량 사용률",
      serviceLevel: "서비스 수준 Code",

      peakTrafficHeader: "첨두시 교통량을 입력하세요",
      peakTrafficJinjuLabel: "진주",
      peakTrafficMasanLabel: "마산",
      peakTrafficUnit: "대/시",

      dir1Title: "마산 방향 ⇒ 진주 방향 (구간 1~10)",
      dir2Title: "진주 방향 ⇒ 마산 방향 (구간 1~10)",
      categoryCol: "구분",
      sectionLabel: (n) => `${n}구간`,
      slopeRow: "터널구배 [%]",
      lengthRow: "터널길이 [m]",
      elevationRow: "평균표고 [m]",
      lanesRow: "차선수 [N]",

      summaryText: (L, lanes, vol) =>
        `총 연장: ${L.toFixed(2)} m, 차선수(최대): ${lanes}, 추정교통량: ${vol.toLocaleString()} 대/시간`,

      hintText: ({ speed, capPerLane, applyCode, ratio }) =>
        `설계속도 ${speed} km/h 기준 차로당 용량: ${capPerLane} 대/시간, 적용CODE = ${applyCode}, 용량 사용률 = ${ratio}.`
    },

    trafficEstimation: {
      title: "모듈 2 – 추정교통량 (정교통량)",
      explanation:
        "이 모듈은 시트1의 “1) 추정교통량 / 2) 추정교통량” 블록과 동일한 계산을 수행합니다. 승용차 교통량을 휘발유 60%, 경유 40%로 분리하고, 버스·트럭 교통량을 더하여 일교통량(AADT)과 대형차 혼입율 Pt를 산정합니다.",

      dir1Title: "1) 추정교통량 – 마산 ⇒ 진주",
      dir2Title: "2) 추정교통량 – 진주 ⇒ 마산",

      targetYear: "목표년도",
      totalAadt: "합계 AADT (대/일)",
      heavyMix: "대형차 혼입율 Pt (%)",

      passengerAadt: "승용차 전체 AADT (대/일)",
      busSmall: "버스 소형 AADT (대/일)",
      busLarge: "버스 대형 AADT (대/일)",
      truckSmall: "트럭 소형 AADT (대/일)",
      truckMedium: "트럭 중형 AADT (대/일)",
      truckLarge: "트럭 대형 AADT (대/일)",
      truckSpecial: "특수 AADT (대/일)",

      vehicleHeader: "차량 구분",
      dailyHeader: "일교통량 (대/일)",
      mixHeader: "혼입율 (%)",
      totalRow: "합계",
      heavyMixRow: "대형차 혼입율 Pt (버스대형+트럭중·대+특수)"
    }
  },

  /* ===================== JAPANESE ===================== */
  ja: {
    designConditions: {
      languageLabel: "言語",
      moduleTitle: "モジュール1 – 設計条件と推定交通量",
      globalTitle: "全体設計入力",

      designSpeed: "設計速度 V [km/h]",
      applyCode: "適用コード",
      capacityRatio: "容量利用率",
      serviceLevel: "サービスレベルコード",

      peakTrafficHeader: "ピーク時交通量を入力してください",
      peakTrafficJinjuLabel: "ジンジュ",
      peakTrafficMasanLabel: "マサン",
      peakTrafficUnit: "台/時",

      dir1Title: "マサン → ジンジュ 方向（区間1〜10）",
      dir2Title: "ジンジュ → マサン 方向（区間1〜10）",
      categoryCol: "項目",
      sectionLabel: (n) => `区間${n}`,
      slopeRow: "トンネル勾配 [%]",
      lengthRow: "トンネル長 [m]",
      elevationRow: "平均標高 [m]",
      lanesRow: "車線数 [N]",

      summaryText: (L, lanes, vol) =>
        `総延長: ${L.toFixed(2)} m、最大車線数: ${lanes}、推定交通量: ${vol.toLocaleString()} 台/時`,

      hintText: ({ speed, capPerLane, applyCode, ratio }) =>
        `設計速度 ${speed} km/h における車線あたり容量: ${capPerLane} 台/時、適用コード = ${applyCode}、容量利用率 = ${ratio}。`
    },

    trafficEstimation: {
      title: "モジュール2 – 推定交通量",
      explanation:
        "このモジュールはシート1の「1) 추정교통량 / 2) 추정교통량」ブロックと同じ計算を行います。乗用車交通量をガソリン60％・ディーゼル40％に分け、バスとトラックを加えて、日交通量（AADT）と大型車混入率Ptを算出します。",

      dir1Title: "1) 推定交通量 – マサン ⇒ ジンジュ",
      dir2Title: "2) 推定交通量 – ジンジュ ⇒ マサン",

      targetYear: "目標年 (목표년도)",
      totalAadt: "合計 AADT (台/日)",
      heavyMix: "大型車混入率 Pt (%)",

      passengerAadt: "乗用車 合計 AADT (台/日)",
      busSmall: "バス 小型 (台/日)",
      busLarge: "バス 大型 (台/日)",
      truckSmall: "トラック 小型 (台/日)",
      truckMedium: "トラック 中型 (台/日)",
      truckLarge: "トラック 大型 (台/日)",
      truckSpecial: "特殊 (台/日)",

      vehicleHeader: "車両区分",
      dailyHeader: "日交通量 (台/日)",
      mixHeader: "構成比 (%)",
      totalRow: "合計",
      heavyMixRow: "大型車混入率 Pt"
    }
  }

  // NOTE:
  // For es / it / fr / nl we currently fall back to English.
  // If you want native translations, just add:
  //   es: { designConditions: {...}, trafficEstimation: {...} }
  // similar to the blocks above.
};

/**
 * Get strings for a specific module.
 *
 * @param {string} moduleKey  e.g. "designConditions", "trafficEstimation"
 * @param {string} lang       language code, e.g. "en", "ko", "ja"
 */
export function getModuleStrings(moduleKey, lang = "en") {
  const langObj = STRINGS[lang] || STRINGS.en;
  const moduleStrings = langObj[moduleKey];
  // Fallback: if the module is missing in this lang, use English module
  if (!moduleStrings) {
    const fallbackLangObj = STRINGS.en || {};
    return fallbackLangObj[moduleKey] || {};
  }
  return moduleStrings;
}
