// src/i18n/designConditionsStrings.js

// Supported languages for this module
export const SUPPORTED_LANGS = ["en", "ko", "es", "it", "fr", "nl", "ja"];

export const LANGUAGE_LABELS = {
  en: "English",
  ko: "한국어",
  es: "Español",
  it: "Italiano",
  fr: "Français",
  nl: "Nederlands",
  ja: "日本語"
};

const translations = {
  en: {
    languageLabel: "Language",
    moduleTitle: "Module 1 – Design Conditions & Estimated Traffic Volume",
    globalTitle: "Global Design Inputs",
    designSpeed: "Design speed V [km/h]",
    applyCode: "Apply CODE",
    capacityRatio: "Capacity usage ratio",
    serviceLevel: "Service level code",

    peakTrafficHeader: "Enter peak-hour traffic volume",
    peakTrafficJinjuLabel: "Jinju",
    peakTrafficMasanLabel: "Masan",
    peakTrafficUnit: "veh/h",

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

  ko: {
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

  es: {
    languageLabel: "Idioma",
    moduleTitle:
      "Módulo 1 – Condiciones de diseño y volumen de tráfico estimado",
    globalTitle: "Entradas globales de diseño",
    designSpeed: "Velocidad de diseño V [km/h]",
    applyCode: "Código aplicado",
    capacityRatio: "Relación de utilización de capacidad",
    serviceLevel: "Código de nivel de servicio",

    peakTrafficHeader: "Introduzca el tráfico en hora punta",
    peakTrafficJinjuLabel: "Jinju",
    peakTrafficMasanLabel: "Masan",
    peakTrafficUnit: "veh/h",

    dir1Title: "Dirección Masan → Jinju (Secciones 1–10)",
    dir2Title: "Dirección Jinju → Masan (Secciones 1–10)",
    categoryCol: "Parámetro",
    sectionLabel: (n) => `Sec. ${n}`,
    slopeRow: "Pendiente del túnel [%]",
    lengthRow: "Longitud del túnel [m]",
    elevationRow: "Cota media [m]",
    lanesRow: "Número de carriles [N]",
    summaryText: (L, lanes, vol) =>
      `Longitud total: ${L.toFixed(2)} m, N.º máximo de carriles: ${lanes}, Volumen de tráfico estimado: ${vol.toLocaleString()} veh/h`,
    hintText: ({ speed, capPerLane, applyCode, ratio }) =>
      `Capacidad por carril a ${speed} km/h: ${capPerLane} veh/h, Código aplicado = ${applyCode}, Relación de utilización = ${ratio}.`
  },

  it: {
    languageLabel: "Lingua",
    moduleTitle:
      "Modulo 1 – Condizioni di progetto e volume di traffico stimato",
    globalTitle: "Parametri globali di progetto",
    designSpeed: "Velocità di progetto V [km/h]",
    applyCode: "Codice applicato",
    capacityRatio: "Tasso di utilizzo della capacità",
    serviceLevel: "Codice livello di servizio",

    peakTrafficHeader: "Inserire il traffico nell’ora di punta",
    peakTrafficJinjuLabel: "Jinju",
    peakTrafficMasanLabel: "Masan",
    peakTrafficUnit: "veicoli/ora",

    dir1Title: "Direzione Masan → Jinju (Sezioni 1–10)",
    dir2Title: "Direzione Jinju → Masan (Sezioni 1–10)",
    categoryCol: "Parametro",
    sectionLabel: (n) => `Sez. ${n}`,
    slopeRow: "Pendenza del tunnel [%]",
    lengthRow: "Lunghezza del tunnel [m]",
    elevationRow: "Quota media [m]",
    lanesRow: "Numero di corsie [N]",
    summaryText: (L, lanes, vol) =>
      `Lunghezza totale: ${L.toFixed(2)} m, N. massimo di corsie: ${lanes}, Volume di traffico stimato: ${vol.toLocaleString()} veicoli/ora`,
    hintText: ({ speed, capPerLane, applyCode, ratio }) =>
      `Capacità per corsia a ${speed} km/h: ${capPerLane} veicoli/ora, Codice applicato = ${applyCode}, Tasso di utilizzo = ${ratio}.`
  },

  fr: {
    languageLabel: "Langue",
    moduleTitle:
      "Module 1 – Conditions de conception et débit de trafic estimé",
    globalTitle: "Paramètres globaux de conception",
    designSpeed: "Vitesse de conception V [km/h]",
    applyCode: "Code appliqué",
    capacityRatio: "Taux d'utilisation de la capacité",
    serviceLevel: "Code de niveau de service",

    peakTrafficHeader: "Saisissez le trafic en heure de pointe",
    peakTrafficJinjuLabel: "Jinju",
    peakTrafficMasanLabel: "Masan",
    peakTrafficUnit: "véh/h",

    dir1Title: "Sens Masan → Jinju (Sections 1–10)",
    dir2Title: "Sens Jinju → Masan (Sections 1–10)",
    categoryCol: "Paramètre",
    sectionLabel: (n) => `Sect. ${n}`,
    slopeRow: "Pente du tunnel [%]",
    lengthRow: "Longueur du tunnel [m]",
    elevationRow: "Altitude moyenne [m]",
    lanesRow: "Nombre de voies [N]",
    summaryText: (L, lanes, vol) =>
      `Longueur totale : ${L.toFixed(2)} m, Nombre max. de voies : ${lanes}, Débit de trafic estimé : ${vol.toLocaleString()} véh/h`,
    hintText: ({ speed, capPerLane, applyCode, ratio }) =>
      `Capacité par voie à ${speed} km/h : ${capPerLane} véh/h, Code appliqué = ${applyCode}, Taux d'utilisation = ${ratio}.`
  },

  nl: {
    languageLabel: "Taal",
    moduleTitle:
      "Module 1 – Ontwerpcondities en geschatte verkeersintensiteit",
    globalTitle: "Globale ontwerpinvoer",
    designSpeed: "Ontwerpsnelheid V [km/h]",
    applyCode: "Toegepaste code",
    capacityRatio: "Capaciteitsgebruiksratio",
    serviceLevel: "Serviceniveaucode",

    peakTrafficHeader: "Voer de verkeersintensiteit in het piekuur in",
    peakTrafficJinjuLabel: "Jinju",
    peakTrafficMasanLabel: "Masan",
    peakTrafficUnit: "voertuigen/uur",

    dir1Title: "Richting Masan → Jinju (Secties 1–10)",
    dir2Title: "Richting Jinju → Masan (Secties 1–10)",
    categoryCol: "Parameter",
    sectionLabel: (n) => `Sect. ${n}`,
    slopeRow: "Tunnelhelling [%]",
    lengthRow: "Tunnellengte [m]",
    elevationRow: "Gemiddelde hoogte [m]",
    lanesRow: "Aantal rijstroken [N]",
    summaryText: (L, lanes, vol) =>
      `Totale lengte: ${L.toFixed(2)} m, Max. aantal rijstroken: ${lanes}, Geschatte verkeersintensiteit: ${vol.toLocaleString()} voertuigen/uur`,
    hintText: ({ speed, capPerLane, applyCode, ratio }) =>
      `Capaciteit per rijstrook bij ${speed} km/h: ${capPerLane} voertuigen/uur, Toegepaste code = ${applyCode}, Gebruiksratio = ${ratio}.`
  },

  // 🎌 Japanese
  ja: {
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
  }
};

export function getDesignConditionsStrings(lang = "en") {
  if (!translations[lang]) return translations.en;
  return translations[lang];
}
