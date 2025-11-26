// src/i18n/appStrings.js

// All languages your app exposes in the dropdown
export const SUPPORTED_LANGS = ["en", "ko", "ja", "es", "it", "fr", "nl", "de", "fil"];

export const LANGUAGE_LABELS = {
  en: "English",
  ko: "한국어",
  ja: "日本語",
  es: "Español",
  it: "Italiano",
  fr: "Français",
  nl: "Nederlands",
  de: "Deutsch",
  fil: "Filipino"
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
      moduleTitle: "Design Conditions & Estimated Traffic Volume",
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
      dir1Title: "Masan → Jinju direction",
      dir2Title: "Jinju → Masan direction",
      categoryCol: "Item",
      sectionLabel: (n) => `Section ${n}`,
      slopeRow: "Tunnel gradient [%]",
      lengthRow: "Tunnel length [m]",
      lanesRow: "Number of lanes [N]",
      numberOfSectionsLabel: "Number of Sections",
      averageElevationLabel: "Average Elevation [m]",

      summaryText: (L, lanes, vol) =>
        `Total length: ${L.toFixed(2)} m, Max lanes: ${lanes}, Estimated traffic volume: ${vol.toLocaleString()} veh/h`,

      hintText: ({ speed, capPerLane, applyCode, ratio }) =>
        `Base capacity per lane at ${speed} km/h: ${capPerLane} veh/h, Apply CODE = ${applyCode}, Capacity usage ratio = ${ratio}.`,

      // Tunnel geometry
      tunnelGeometryTitle: "Tunnel Geometry",
      tunnelArLabel: "Tunnel internal cross-sectional area [Ar] (m²)",
      tunnelLpLabel: "Tunnel perimeter [Lp] (m)",
      tunnelDrLabel: "Tunnel representative diameter [Dr] (m)"
    },

    trafficEstimation: {
      title: "Estimated traffic volume (추정교통량)",
      explanation:
        "Passenger cars are 60% gasoline and 40% diesel, adds bus and truck categories, and computes total daily traffic (AADT) and heavy-vehicle mix Pt.",

      dir1Title: "Estimated traffic – Masan ⇒ Jinju",
      dir2Title: "Estimated traffic – Jinju ⇒ Masan",

      targetYear: "Target year (목표년도)",
      totalAadt: "Total AADT (합계, 대/일)",
      heavyMix: "Heavy-vehicle mix Pt (%)",

      passengerAadt: "Passenger cars – total AADT (승용차 전체, 대/일)",
      passengerGasoline: "Passenger car – gasoline",
      passengerDiesel: "Passenger car – diesel",
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
      heavyMixRow: "Heavy-vehicle mix Pt (버스대형+트럭중·대+특수)",
      smokeTitle: "Smoke Base Emission Parameters",
      smokeEmissionHeader: "Emission factor g/km",
      smokeQ0Header: "q0T [m²/h·veh]",
      smokeReductionFactorLabel: "Reductiefactor",
      smokeReferenceSpeedLabel: "Referentiesnelheid [km/h]"
    },

    trafficDensity: {
      title: "Traffic Density Calculation",
      imaxLabel: "Maximum traffic volume Imax [pcu/hr]",
      roadTypeLabel: "Congestion traffic classification",
      roadTypeHighway: "National/Highway: 1",
      roadTypeUrban: "Urban: 2",
      speedRowLabel: "Vehicle speed (km/h)",
      flowRowLabel: "Traffic volume [pcu/hr·lane]"
    },

    fivSpeedGrade: {
      tableTitle: "Correction Coefficient Table",
      tableDescription: "Complete speed-grade correction coefficient table for emissions.",
      selectGroupLabel: "Vehicle Group:",
      tableNote: "Values represent correction coefficients. Rows = speed (km/h), Columns = grade (%).",
      activeLabel: "Active:"
    },

    dataCatalog: {
      title: "Data Tables Selection",
      description: "Select a correction factor table to import and use in calculations. View the imported table data in the FivTableView on the home page.",
      currentlyActive: "Currently Active:",
      clearAllButton: "Clear All",
      pmCorrectionFactor: "PM Correction Factor",
      coCorrectionFactor: "CO Correction Factor",
      noxCorrectionFactor: "NOx Correction Factor",
      allPollutants: "All Pollutants (PM + CO + NOx)",
      allDescription: "Import all three pollutant tables (PM, CO, NOx) together",
      tableDescription: "4 base tables (speed × grade) + 8 segment tables (segment × speed)",
      activeButton: "Active",
      selectButton: "Select",
      tipMessage: "💡 Tip: After selecting a table, return to the home page to view it in the FivTableView section.",
      importSuccess: "imported successfully!",
      importAllSuccess: "All pollutant tables (PM, CO, NOx) have been imported successfully!",
      clearSuccess: "All imported tables have been cleared.",
      loadError: "Could not load",
      allSelected: "✓ All Pollutants Selected",
      imported: "Imported",
      defaultPM: "PM (Default)"
    },

    app: {
      home: "Home",
      dataCatalog: "Data Catalog"
    }
  },

  /* ===================== KOREAN ===================== */
  ko: {
    designConditions: {
      languageLabel: "언어",
      moduleTitle: "환기량 산출 설계조건 및 추정 교통량",
      globalTitle: "전역 설계 입력값",

      designSpeed: "설계속도 V [km/h]",
      applyCode: "적용CODE",
      capacityRatio: "용량 사용률",
      serviceLevel: "서비스 수준 Code",

      peakTrafficHeader: "첨두시 교통량을 입력하세요",
      peakTrafficJinjuLabel: "진주",
      peakTrafficMasanLabel: "마산",
      peakTrafficUnit: "대/시",

      dir1Title: "마산 ⇒ 진주 방향",
      dir2Title: "진주 ⇒ 마산 방향",
      categoryCol: "구분",
      sectionLabel: (n) => `${n}구간`,
      slopeRow: "터널구배 [%]",
      lengthRow: "터널길이 [m]",
      lanesRow: "차선수 [N]",
      numberOfSectionsLabel: "구간 개수",
      averageElevationLabel: "평균 표고 [m]",

      summaryText: (L, lanes, vol) =>
        `총 연장: ${L.toFixed(2)} m, 차선수(최대): ${lanes}, 추정교통량: ${vol.toLocaleString()} 대/시간`,

      hintText: ({ speed, capPerLane, applyCode, ratio }) =>
        `설계속도 ${speed} km/h 기준 차로당 용량: ${capPerLane} 대/시간, 적용CODE = ${applyCode}, 용량 사용률 = ${ratio}.`,

      // Tunnel geometry
      tunnelGeometryTitle: "터널 기하학적 형상",
      tunnelArLabel: "터널 내공 단면적 [Ar] (m²)",
      tunnelLpLabel: "터널 둘레 [Lp] (m)",
      tunnelDrLabel: "터널 대표 직경 [Dr] (m)"
    },

    trafficEstimation: {
      title: "추정교통량 (정교통량)",
      explanation:
        "승용차는 가솔린 60%, 경유 40%로 구성되며, 버스와 트럭 범주를 더하여 일일 총 교통량(AADT)과 대형 차량 혼합 Pt를 계산합니다.",

      dir1Title: "추정교통량 – 마산 ⇒ 진주",
      dir2Title: "추정교통량 – 진주 ⇒ 마산",

      targetYear: "목표년도",
      totalAadt: "합계 AADT (대/일)",
      heavyMix: "대형차 혼입율 Pt (%)",

      passengerAadt: "승용차 전체 AADT (대/일)",
      passengerGasoline: "승용차 휘발유",
      passengerDiesel: "승용차 경유",
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
      heavyMixRow: "대형차 혼입율 Pt (버스대형+트럭중·대+특수)",
      smokeTitle: "매연 기준 배출 파라미터",
      smokeEmissionHeader: "배출계수 g/km",
      smokeQ0Header: "q0T [m²/h·대]",
      smokeReductionFactorLabel: "감소계수",
      smokeReferenceSpeedLabel: "기준 속도 [km/h]"
    },

    trafficDensity: {
      title: "교통밀도산정표",
      imaxLabel: "최대교통량 Imax [pcu/hr]",
      roadTypeLabel: "정체시 교통량 구분",
      roadTypeHighway: "국도/고속도로: 1",
      roadTypeUrban: "도심지: 2",
      speedRowLabel: "차량속도 (km/h)",
      flowRowLabel: "교통량 [pcu/hr·lane]"
    },

    fivSpeedGrade: {
      tableTitle: "보정계수 테이블",
      tableDescription: "배출 보정 계수 완전 속도-경사도 테이블",
      selectGroupLabel: "차량 그룹:",
      tableNote: "값은 f_iv 보정계수를 나타냅니다. 행 = 속도 (km/h), 열 = 경사도 (%).",
      activeLabel: "활성:"
    },

    dataCatalog: {
      title: "데이터 테이블 선택",
      description: "계산에 사용할 보정계수 테이블을 선택하세요. 가져온 테이블 데이터는 홈 페이지의 FivTableView에서 볼 수 있습니다.",
      currentlyActive: "현재 활성:",
      clearAllButton: "모두 지우기",
      pmCorrectionFactor: "PM 보정계수",
      coCorrectionFactor: "CO 보정계수",
      noxCorrectionFactor: "NOx 보정계수",
      allPollutants: "모든 오염물질 (PM + CO + NOx)",
      allDescription: "세 가지 오염물질 테이블(PM, CO, NOx)을 함께 가져오기",
      tableDescription: "4개 기본 테이블 (속도 × 경사도) + 8개 구간 테이블 (구간 × 속도)",
      activeButton: "활성",
      selectButton: "선택",
      tipMessage: "💡 팁: 테이블을 선택한 후 홈 페이지로 돌아가서 FivTableView 섹션에서 확인하세요.",
      importSuccess: "성공적으로 가져왔습니다!",
      importAllSuccess: "모든 오염물질 테이블(PM, CO, NOx)이 성공적으로 가져와졌습니다!",
      clearSuccess: "가져온 모든 테이블이 지워졌습니다.",
      loadError: "불러올 수 없습니다",
      allSelected: "✓ 모든 오염물질 선택됨",
      imported: "가져옴",
      defaultPM: "PM (기본값)"
    },

    app: {
      home: "홈",
      dataCatalog: "데이터 카탈로그"
    }
  },

  /* ===================== JAPANESE ===================== */
  ja: {
    designConditions: {
      languageLabel: "言語",
      moduleTitle: "設計条件と推定交通量",
      globalTitle: "全体設計入力",

      designSpeed: "設計速度 V [km/h]",
      applyCode: "適用コード",
      capacityRatio: "容量利用率",
      serviceLevel: "サービスレベルコード",

      peakTrafficHeader: "ピーク時交通量を入力してください",
      peakTrafficJinjuLabel: "ジンジュ",
      peakTrafficMasanLabel: "マサン",
      peakTrafficUnit: "台/時",

      dir1Title: "マサン → ジンジュ 方向",
      dir2Title: "ジンジュ → マサン 方向",
      categoryCol: "項目",
      sectionLabel: (n) => `区間${n}`,
      slopeRow: "トンネル勾配 [%]",
      lengthRow: "トンネル長 [m]",
      lanesRow: "車線数 [N]",
      numberOfSectionsLabel: "区間数",
      averageElevationLabel: "平均標高 [m]",

      summaryText: (L, lanes, vol) =>
        `総延長: ${L.toFixed(2)} m、最大車線数: ${lanes}、推定交通量: ${vol.toLocaleString()} 台/時`,

      hintText: ({ speed, capPerLane, applyCode, ratio }) =>
        `設計速度 ${speed} km/h における車線あたり容量: ${capPerLane} 台/時、適用コード = ${applyCode}、容量利用率 = ${ratio}。`,

      // Tunnel geometry
      tunnelGeometryTitle: "トンネル形状",
      tunnelArLabel: "トンネル内部断面積 [Ar] (m²)",
      tunnelLpLabel: "トンネル周長 [Lp] (m)",
      tunnelDrLabel: "トンネル代表直径 [Dr] (m)"
    },

    trafficEstimation: {
      title: "推定交通量",
      explanation:
        "乗用車はガソリン車が60％、軽油車が40％で構成されており、バスおよびトラックの車種区分を加えて、総日交通量（年平均日交通量：AADT）および大型車混入率Ptを算出する。",

      dir1Title: "推定交通量 – マサン ⇒ ジンジュ",
      dir2Title: "推定交通量 – ジンジュ ⇒ マサン",

      targetYear: "目標年 (목표년도)",
      totalAadt: "合計 AADT (台/日)",
      heavyMix: "大型車混入率 Pt (%)",

      passengerAadt: "乗用車 合計 AADT (台/日)",
      passengerGasoline: "乗用車 ガソリン",
      passengerDiesel: "乗用車 ディーゼル",
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
      heavyMixRow: "大型車混入率 Pt",
      smokeTitle: "煙 基本排出パラメータ",
      smokeEmissionHeader: "排出係数 g/km",
      smokeQ0Header: "q0T [m²/h·台]",
      smokeReductionFactorLabel: "低減係数",
      smokeReferenceSpeedLabel: "基準速度 [km/h]"
    },

    trafficDensity: {
      title: "交通密度計算表",
      imaxLabel: "最大交通量 Imax [pcu/hr]",
      roadTypeLabel: "渋滞時交通量区分",
      roadTypeHighway: "国道/高速道路: 1",
      roadTypeUrban: "都心部: 2",
      speedRowLabel: "車両速度 (km/h)",
      flowRowLabel: "交通量 [pcu/hr·lane]"
    },

    fivSpeedGrade: {
      tableTitle: "補正係数テーブル",
      tableDescription: "排出補正係数完全速度-勾配テーブル",
      selectGroupLabel: "車両グループ:",
      tableNote: "値はf_iv補正係数を表します。行 = 速度 (km/h)、列 = 勾配 (%)。",
      activeLabel: "アクティブ:"
    },

    dataCatalog: {
      title: "データテーブル選択",
      description: "計算に使用する補正係数テーブルを選択してください。インポートしたテーブルデータは、ホームページのFivTableViewで表示できます。",
      currentlyActive: "現在アクティブ:",
      clearAllButton: "すべてクリア",
      pmCorrectionFactor: "PM 補正係数",
      coCorrectionFactor: "CO 補正係数",
      noxCorrectionFactor: "NOx 補正係数",
      allPollutants: "すべての汚染物質 (PM + CO + NOx)",
      allDescription: "3つの汚染物質テーブル(PM、CO、NOx)をまとめてインポート",
      tableDescription: "4つの基本テーブル (速度 × 勾配) + 8つの区間テーブル (区間 × 速度)",
      activeButton: "アクティブ",
      selectButton: "選択",
      tipMessage: "💡 ヒント: テーブルを選択した後、ホームページに戻ってFivTableViewセクションで確認してください。",
      importSuccess: "正常にインポートされました！",
      importAllSuccess: "すべての汚染物質テーブル(PM、CO、NOx)が正常にインポートされました！",
      clearSuccess: "インポートされたすべてのテーブルがクリアされました。",
      loadError: "読み込めませんでした",
      allSelected: "✓ すべての汚染物質が選択されました",
      imported: "インポート済み",
      defaultPM: "PM (デフォルト)"
    },

    app: {
      home: "ホーム",
      dataCatalog: "データカタログ"
    }
  }

  /* ===================== SPANISH ===================== */
  , es: {
    designConditions: {
      languageLabel: "Idioma",
      moduleTitle: "Condiciones de diseño y volumen de tráfico estimado",
      globalTitle: "Entradas globales de diseño",

      designSpeed: "Velocidad de diseño V [km/h]",
      applyCode: "Aplicar CÓDIGO",
      capacityRatio: "Ratio de utilización de capacidad",
      serviceLevel: "Código de nivel de servicio",

      peakTrafficHeader: "Ingrese el volumen de tráfico de la hora pico",
      peakTrafficJinjuLabel: "Jinju",
      peakTrafficMasanLabel: "Masan",
      peakTrafficUnit: "veh/h",

      dir1Title: "Dirección Masan → Jinju",
      dir2Title: "Dirección Jinju → Masan",
      categoryCol: "Ítem",
      sectionLabel: (n) => `Sección ${n}`,
      slopeRow: "Pendiente del túnel [%]",
      lengthRow: "Longitud del túnel [m]",
      lanesRow: "Número de carriles [N]",
      numberOfSectionsLabel: "Número de secciones",
      averageElevationLabel: "Elevación media [m]",

      summaryText: (L, lanes, vol) =>
        `Longitud total: ${L.toFixed(2)} m, Carriles máx: ${lanes}, Volumen estimado: ${vol.toLocaleString()} veh/h`,

      hintText: ({ speed, capPerLane, applyCode, ratio }) =>
        `Capacidad base por carril a ${speed} km/h: ${capPerLane} veh/h, Código aplicado = ${applyCode}, Ratio de uso = ${ratio}.`,

      // Tunnel geometry
      tunnelGeometryTitle: "Geometría del túnel",
      tunnelArLabel: "Área de sección transversal interna [Ar] (m²)",
      tunnelLpLabel: "Perímetro del túnel [Lp] (m)",
      tunnelDrLabel: "Diámetro representativo del túnel [Dr] (m)"
    },
    trafficEstimation: {
      title: "Volumen de tráfico estimado",
      explanation: "Los turismos son 60% gasolina y 40% diésel, añade categorías de autobuses y camiones, y calcula el tráfico diario total (AADT) y la mezcla de vehículos pesados Pt.",
      dir1Title: "Tráfico estimado – Masan ⇒ Jinju",
      dir2Title: "Tráfico estimado – Jinju ⇒ Masan",
      targetYear: "Año objetivo",
      totalAadt: "AADT total (veh/día)",
      heavyMix: "Mezcla de vehículos pesados Pt (%)",
      passengerAadt: "Turismos – AADT total",
      passengerGasoline: "Turismo – gasolina",
      passengerDiesel: "Turismo – diésel",
      busSmall: "Autobús – pequeño",
      busLarge: "Autobús – grande",
      truckSmall: "Camión – pequeño",
      truckMedium: "Camión – mediano",
      truckLarge: "Camión – grande",
      truckSpecial: "Especial",
      vehicleHeader: "Tipo de vehículo",
      dailyHeader: "Volumen diario",
      mixHeader: "Porcentaje",
      totalRow: "Total",
      heavyMixRow: "Mezcla vehículos pesados Pt",
      smokeTitle: "Parámetros base de emisión de humo",
      smokeEmissionHeader: "Factor de emisión g/km",
      smokeQ0Header: "q0T [m²/h·veh]",
      smokeReductionFactorLabel: "Factor de reducción",
      smokeReferenceSpeedLabel: "Velocidad de referencia [km/h]"
    },

    trafficDensity: {
      title: "Cálculo de Densidad de Tráfico",
      imaxLabel: "Volumen máximo de tráfico Imax [pcu/hr]",
      roadTypeLabel: "Clasificación de tráfico en congestión",
      roadTypeHighway: "Nacional/Autopista: 1",
      roadTypeUrban: "Urbano: 2",
      speedRowLabel: "Velocidad del vehículo (km/h)",
      flowRowLabel: "Volumen de tráfico [pcu/hr·carril]"
    },

    fivSpeedGrade: {
      tableTitle: "Tabla de Coeficientes de Corrección",
      tableDescription: "Tabla completa de factor de corrección velocidad-pendiente.",
      selectGroupLabel: "Grupo de vehículos:",
      tableNote: "Valores representan factores de corrección f_iv. Filas = velocidad (km/h), Columnas = pendiente (%).",
      activeLabel: "Activo:"
    },
    dataCatalog: {
      title: "Selección de Tablas de Datos",
      description: "Seleccione una tabla de factor de corrección para importar y usar en cálculos.",
      currentlyActive: "Actualmente Activo:",
      clearAllButton: "Limpiar Todo",
      pmCorrectionFactor: "Factor de Corrección PM",
      coCorrectionFactor: "Factor de Corrección CO",
      noxCorrectionFactor: "Factor de Corrección NOx",
      allPollutants: "Todos los Contaminantes (PM + CO + NOx)",
      allDescription: "Importar las tres tablas de contaminantes juntas",
      tableDescription: "4 tablas base (velocidad × pendiente) + 8 tablas de segmento",
      activeButton: "Activo",
      selectButton: "Seleccionar",
      tipMessage: "💡 Consejo: Después de seleccionar una tabla, regrese a la página principal.",
      importSuccess: "importado con éxito!",
      importAllSuccess: "¡Todas las tablas se importaron con éxito!",
      clearSuccess: "Todas las tablas importadas han sido limpiadas.",
      loadError: "No se pudo cargar",
      allSelected: "✓ Todos los Contaminantes Seleccionados",
      imported: "Importado",
      defaultPM: "PM (Predeterminado)"
    },
    app: {
      home: "Inicio",
      dataCatalog: "Catálogo de Datos"
    }
  }

  /* ===================== ITALIAN ===================== */
  , it: {
    designConditions: {
      languageLabel: "Lingua",
      moduleTitle: "Condizioni di progetto e volume di traffico stimato",
      globalTitle: "Input globali di progetto",
      designSpeed: "Velocità di progetto V [km/h]",
      applyCode: "Applica CODICE",
      capacityRatio: "Rapporto utilizzo capacità",
      serviceLevel: "Codice livello di servizio",
      peakTrafficHeader: "Inserisci il volume di traffico dell'ora di punta",
      peakTrafficJinjuLabel: "Jinju",
      peakTrafficMasanLabel: "Masan",
      peakTrafficUnit: "veh/h",
      dir1Title: "Direzione Masan → Jinju",
      dir2Title: "Direzione Jinju → Masan",
      categoryCol: "Voce",
      sectionLabel: (n) => `Sez. ${n}`,
      slopeRow: "Pendenza galleria [%]",
      lengthRow: "Lunghezza galleria [m]",
      lanesRow: "Numero corsie [N]",
      numberOfSectionsLabel: "Numero di sezioni",
      averageElevationLabel: "Quota media [m]",
      summaryText: (L, lanes, vol) => `Lunghezza totale: ${L.toFixed(2)} m, Corsie max: ${lanes}, Traffico stimato: ${vol.toLocaleString()} veh/h`,
      hintText: ({ speed, capPerLane, applyCode, ratio }) => `Capacità per corsia a ${speed} km/h: ${capPerLane} veh/h, CODICE = ${applyCode}, Uso capacità = ${ratio}.`,

      // Tunnel geometry
      tunnelGeometryTitle: "Geometria della galleria",
      tunnelArLabel: "Area sezione trasversale interna [Ar] (m²)",
      tunnelLpLabel: "Perimetro galleria [Lp] (m)",
      tunnelDrLabel: "Diametro rappresentativo galleria [Dr] (m)"
    },
    trafficEstimation: {
      title: "Volume di traffico stimato",
      explanation: "Le auto passeggeri sono 60% benzina e 40% diesel, aggiunge categorie di autobus e camion, e calcola il traffico giornaliero totale (AADT) e la miscela di veicoli pesanti Pt.",
      dir1Title: "Traffico stimato – Masan ⇒ Jinju",
      dir2Title: "Traffico stimato – Jinju ⇒ Masan",
      targetYear: "Anno obiettivo",
      totalAadt: "AADT totale (veh/giorno)",
      heavyMix: "Percentuale veicoli pesanti Pt (%)",
      passengerAadt: "Autovetture – AADT totale",
      passengerGasoline: "Autovettura – benzina",
      passengerDiesel: "Autovettura – diesel",
      busSmall: "Autobus – piccolo",
      busLarge: "Autobus – grande",
      truckSmall: "Camion – piccolo",
      truckMedium: "Camion – medio",
      truckLarge: "Camion – grande",
      truckSpecial: "Speciale",
      vehicleHeader: "Tipo veicolo",
      dailyHeader: "Volume giornaliero",
      mixHeader: "Percentuale",
      totalRow: "Totale",
      heavyMixRow: "Percentuale veicoli pesanti Pt",
      smokeTitle: "Parametri base emissione fumo",
      smokeEmissionHeader: "Fattore di emissione g/km",
      smokeQ0Header: "q0T [m²/h·veic]",
      smokeReductionFactorLabel: "Fattore di riduzione",
      smokeReferenceSpeedLabel: "Velocità di riferimento [km/h]"
    },

    trafficDensity: {
      title: "Calcolo della Densità di Traffico",
      imaxLabel: "Volume massimo di traffico Imax [pcu/hr]",
      roadTypeLabel: "Classificazione del traffico in congestione",
      roadTypeHighway: "Nazionale/Autostrada: 1",
      roadTypeUrban: "Urbano: 2",
      speedRowLabel: "Velocità del veicolo (km/h)",
      flowRowLabel: "Volume di traffico [pcu/hr·corsia]"
    },

    fivSpeedGrade: {
      tableTitle: "Tabella dei Coefficienti di Correzione",
      tableDescription: "Tabella completa fattore di correzione velocità-pendenza.",
      selectGroupLabel: "Gruppo veicoli:",
      tableNote: "I valori rappresentano i fattori di correzione f_iv. Righe = velocità (km/h), Colonne = pendenza (%).",
      activeLabel: "Attivo:"
    },
    dataCatalog: {
      title: "Selezione Tabelle Dati",
      description: "Seleziona una tabella fattore di correzione da importare e usare nei calcoli.",
      currentlyActive: "Attualmente Attivo:",
      clearAllButton: "Cancella Tutto",
      pmCorrectionFactor: "Fattore di Correzione PM",
      coCorrectionFactor: "Fattore di Correzione CO",
      noxCorrectionFactor: "Fattore di Correzione NOx",
      allPollutants: "Tutti gli Inquinanti (PM + CO + NOx)",
      allDescription: "Importa tutte e tre le tabelle degli inquinanti insieme",
      tableDescription: "4 tabelle base (velocità × pendenza) + 8 tabelle segmento",
      activeButton: "Attivo",
      selectButton: "Seleziona",
      tipMessage: "💡 Suggerimento: Dopo aver selezionato una tabella, torna alla pagina principale.",
      importSuccess: "importato con successo!",
      importAllSuccess: "Tutte le tabelle sono state importate con successo!",
      clearSuccess: "Tutte le tabelle importate sono state cancellate.",
      loadError: "Impossibile caricare",
      allSelected: "✓ Tutti gli Inquinanti Selezionati",
      imported: "Importato",
      defaultPM: "PM (Predefinito)"
    },
    app: {
      home: "Home",
      dataCatalog: "Catalogo Dati"
    }
  }

  /* ===================== FRENCH ===================== */
  , fr: {
    designConditions: {
      languageLabel: "Langue",
      moduleTitle: "Conditions de conception et trafic estimé",
      globalTitle: "Paramètres globaux",
      designSpeed: "Vitesse de conception V [km/h]",
      applyCode: "Appliquer CODE",
      capacityRatio: "Taux d'utilisation de capacité",
      serviceLevel: "Code niveau de service",
      peakTrafficHeader: "Saisissez le trafic heure de pointe",
      peakTrafficJinjuLabel: "Jinju",
      peakTrafficMasanLabel: "Masan",
      peakTrafficUnit: "véh/h",
      dir1Title: "Direction Masan → Jinju",
      dir2Title: "Direction Jinju → Masan",
      categoryCol: "Élément",
      sectionLabel: (n) => `Section ${n}`,
      slopeRow: "Pente du tunnel [%]",
      lengthRow: "Longueur du tunnel [m]",
      lanesRow: "Nombre de voies [N]",
      numberOfSectionsLabel: "Nombre de sections",
      averageElevationLabel: "Altitude moyenne [m]",
      summaryText: (L, lanes, vol) => `Longueur totale: ${L.toFixed(2)} m, Voies max: ${lanes}, Trafic estimé: ${vol.toLocaleString()} véh/h`,
      hintText: ({ speed, capPerLane, applyCode, ratio }) => `Capacité par voie à ${speed} km/h: ${capPerLane} véh/h, CODE = ${applyCode}, Taux utilisation = ${ratio}.`,

      // Tunnel geometry
      tunnelGeometryTitle: "Géométrie du tunnel",
      tunnelArLabel: "Section transversale interne [Ar] (m²)",
      tunnelLpLabel: "Périmètre du tunnel [Lp] (m)",
      tunnelDrLabel: "Diamètre représentatif [Dr] (m)"
    },
    trafficEstimation: {
      title: "Trafic estimé",
      explanation: "Les voitures particulières sont 60% essence et 40% diesel, ajoute les catégories d'autobus et de camions, et calcule le trafic quotidien total (AADT) et le mélange de véhicules lourds Pt.",
      dir1Title: "Trafic estimé – Masan ⇒ Jinju",
      dir2Title: "Trafic estimé – Jinju ⇒ Masan",
      targetYear: "Année cible",
      totalAadt: "AADT total (véh/jour)",
      heavyMix: "Part véhicules lourds Pt (%)",
      passengerAadt: "Véhicules légers – AADT total",
      passengerGasoline: "Véhicule léger – essence",
      passengerDiesel: "Véhicule léger – diesel",
      busSmall: "Bus – petit",
      busLarge: "Bus – grand",
      truckSmall: "Camion – petit",
      truckMedium: "Camion – moyen",
      truckLarge: "Camion – grand",
      truckSpecial: "Spécial",
      vehicleHeader: "Type de véhicule",
      dailyHeader: "Volume journalier",
      mixHeader: "Pourcentage",
      totalRow: "Total",
      heavyMixRow: "Part véhicules lourds Pt",
      smokeTitle: "Paramètres d'émission de fumée",
      smokeEmissionHeader: "Facteur d'émission g/km",
      smokeQ0Header: "q0T [m²/h·véh]",
      smokeReductionFactorLabel: "Facteur de réduction",
      smokeReferenceSpeedLabel: "Vitesse de référence [km/h]"
    },

    trafficDensity: {
      title: "Calcul de la Densité de Trafic",
      imaxLabel: "Volume de trafic maximal Imax [pcu/hr]",
      roadTypeLabel: "Classification du trafic en congestion",
      roadTypeHighway: "Nationale/Autoroute: 1",
      roadTypeUrban: "Urbain: 2",
      speedRowLabel: "Vitesse du véhicule (km/h)",
      flowRowLabel: "Volume de trafic [pcu/hr·voie]"
    },

    fivSpeedGrade: {
      tableTitle: "Table des Coefficients de Correction",
      tableDescription: "Table complète facteur de correction vitesse-pente.",
      selectGroupLabel: "Groupe de véhicules:",
      tableNote: "Les valeurs représentent les facteurs de correction f_iv. Lignes = vitesse (km/h), Colonnes = pente (%).",
      activeLabel: "Actif:"
    },
    dataCatalog: {
      title: "Sélection des Tables de Données",
      description: "Sélectionnez une table de facteur de correction à importer et utiliser dans les calculs.",
      currentlyActive: "Actuellement Actif:",
      clearAllButton: "Tout Effacer",
      pmCorrectionFactor: "Facteur de Correction PM",
      coCorrectionFactor: "Facteur de Correction CO",
      noxCorrectionFactor: "Facteur de Correction NOx",
      allPollutants: "Tous les Polluants (PM + CO + NOx)",
      allDescription: "Importer les trois tables de polluants ensemble",
      tableDescription: "4 tables de base (vitesse × pente) + 8 tables de segment",
      activeButton: "Actif",
      selectButton: "Sélectionner",
      tipMessage: "💡 Conseil: Après avoir sélectionné une table, retournez à la page principale.",
      importSuccess: "importé avec succès!",
      importAllSuccess: "Toutes les tables ont été importées avec succès!",
      clearSuccess: "Toutes les tables importées ont été effacées.",
      loadError: "Impossible de charger",
      allSelected: "✓ Tous les Polluants Sélectionnés",
      imported: "Importé",
      defaultPM: "PM (Par défaut)"
    },
    app: {
      home: "Accueil",
      dataCatalog: "Catalogue de Données"
    }
  }

  /* ===================== DUTCH ===================== */
  , nl: {
    designConditions: {
      languageLabel: "Taal",
      moduleTitle: "Ontwerpcondities & geschat verkeersvolume",
      globalTitle: "Globale ontwerpinputs",
      designSpeed: "Ontwerpsnelheid V [km/h]",
      applyCode: "Toepas CODE",
      capacityRatio: "Capaciteitsgebruiksratio",
      serviceLevel: "Serviceniveau code",
      peakTrafficHeader: "Voer spitsuur verkeersvolume in",
      peakTrafficJinjuLabel: "Jinju",
      peakTrafficMasanLabel: "Masan",
      peakTrafficUnit: "veh/u",
      dir1Title: "Richting Masan → Jinju",
      dir2Title: "Richting Jinju → Masan",
      categoryCol: "Item",
      sectionLabel: (n) => `Sectie ${n}`,
      slopeRow: "Tunnelhelling [%]",
      lengthRow: "Tunnellengte [m]",
      lanesRow: "Aantal rijstroken [N]",
      numberOfSectionsLabel: "Aantal secties",
      averageElevationLabel: "Gemiddelde hoogte [m]",
      summaryText: (L, lanes, vol) => `Totale lengte: ${L.toFixed(2)} m, Max rijstroken: ${lanes}, Geschat verkeer: ${vol.toLocaleString()} veh/u`,
      hintText: ({ speed, capPerLane, applyCode, ratio }) => `Basis capaciteit per rijstrook bij ${speed} km/h: ${capPerLane} veh/u, CODE = ${applyCode}, Gebruik = ${ratio}.`,

      // Tunnel geometry
      tunnelGeometryTitle: "Tunnelgeometrie",
      tunnelArLabel: "Interne dwarsdoorsnede [Ar] (m²)",
      tunnelLpLabel: "Tunnelomtrek [Lp] (m)",
      tunnelDrLabel: "Representatieve diameter [Dr] (m)"
    },
    trafficEstimation: {
      title: "Geschat verkeersvolume",
      explanation: "Personenauto's zijn 60% benzine en 40% diesel, voegt bus- en vrachtwagenscategorieën toe, en berekent het totale dagelijks verkeer (AADT) en het aandeel zware voertuigen Pt.",
      dir1Title: "Geschat verkeer – Masan ⇒ Jinju",
      dir2Title: "Geschat verkeer – Jinju ⇒ Masan",
      targetYear: "Doeljaar",
      totalAadt: "Totale AADT (veh/dag)",
      heavyMix: "Aandeel zware voertuigen Pt (%)",
      passengerAadt: "Personenauto's – totaal AADT",
      passengerGasoline: "Personenauto – benzine",
      passengerDiesel: "Personenauto – diesel",
      busSmall: "Bus – klein",
      busLarge: "Bus – groot",
      truckSmall: "Vrachtwagen – klein",
      truckMedium: "Vrachtwagen – middel",
      truckLarge: "Vrachtwagen – groot",
      truckSpecial: "Speciaal",
      vehicleHeader: "Voertuigtype",
      dailyHeader: "Dagvolume",
      mixHeader: "Percentage",
      totalRow: "Totaal",
      heavyMixRow: "Aandeel zware voertuigen Pt",
      smokeTitle: "Basis rookemissieparameters",
      smokeEmissionHeader: "Emissiefactor g/km",
      smokeQ0Header: "q0T [m²/h·veh]",
      smokeReductionFactorLabel: "Reductiefactor",
      smokeReferenceSpeedLabel: "Referentiesnelheid [km/h]"
    },

    trafficDensity: {
      title: "Verkeersdichtheid Berekening",
      imaxLabel: "Maximaal verkeersvolume Imax [pcu/hr]",
      roadTypeLabel: "Congestie verkeersclassificatie",
      roadTypeHighway: "Nationale weg/Snelweg: 1",
      roadTypeUrban: "Stedelijk: 2",
      speedRowLabel: "Voertuigsnelheid (km/h)",
      flowRowLabel: "Verkeersvolume [pcu/hr·rijstrook]"
    },

    fivSpeedGrade: {
      tableTitle: "Correctiecoëfficiënt Tabel",
      tableDescription: "Volledige snelheid-helling correctiefactor tabel.",
      selectGroupLabel: "Voertuiggroep:",
      tableNote: "Waarden vertegenwoordigen f_iv correctiefactoren. Rijen = snelheid (km/h), Kolommen = helling (%).",
      activeLabel: "Actief:"
    },
    dataCatalog: {
      title: "Gegevenstabellen Selectie",
      description: "Selecteer een correctiefactor tabel om te importeren en te gebruiken in berekeningen.",
      currentlyActive: "Momenteel Actief:",
      clearAllButton: "Alles Wissen",
      pmCorrectionFactor: "PM Correctiefactor",
      coCorrectionFactor: "CO Correctiefactor",
      noxCorrectionFactor: "NOx Correctiefactor",
      allPollutants: "Alle Verontreinigende Stoffen (PM + CO + NOx)",
      allDescription: "Importeer alle drie verontreinigende stof tabellen samen",
      tableDescription: "4 basistabellen (snelheid × helling) + 8 segmenttabellen",
      activeButton: "Actief",
      selectButton: "Selecteren",
      tipMessage: "💡 Tip: Ga na het selecteren van een tabel terug naar de startpagina.",
      importSuccess: "succesvol geïmporteerd!",
      importAllSuccess: "Alle tabellen zijn succesvol geïmporteerd!",
      clearSuccess: "Alle geïmporteerde tabellen zijn gewist.",
      loadError: "Kan niet laden",
      allSelected: "✓ Alle Verontreinigende Stoffen Geselecteerd",
      imported: "Geïmporteerd",
      defaultPM: "PM (Standaard)"
    },
    app: {
      home: "Home",
      dataCatalog: "Gegevenscatalogus"
    }
  }
  /* ===================== GERMAN ===================== */
  , de: {
    designConditions: {
      languageLabel: "Sprache",
      moduleTitle: "Entwurfsbedingungen & geschätztes Verkehrsaufkommen",
      globalTitle: "Globale Entwurfs-Eingaben",
      designSpeed: "Entwurfsgeschwindigkeit V [km/h]",
      applyCode: "Code anwenden",
      capacityRatio: "Auslastungsquote",
      serviceLevel: "Service-Level-Code",
      peakTrafficHeader: "Spitzenstundenverkehr eingeben",
      peakTrafficJinjuLabel: "Jinju",
      peakTrafficMasanLabel: "Masan",
      peakTrafficUnit: "Fzg/h",
      dir1Title: "Richtung Masan → Jinju",
      dir2Title: "Richtung Jinju → Masan",
      categoryCol: "Eintrag",
      sectionLabel: (n) => `Abschnitt ${n}`,
      slopeRow: "Tunnelneigung [%]",
      lengthRow: "Tunnellänge [m]",
      lanesRow: "Anzahl Fahrstreifen [N]",
      numberOfSectionsLabel: "Anzahl Abschnitte",
      averageElevationLabel: "Mittlere Höhe [m]",
      summaryText: (L, lanes, vol) => `Gesamtlänge: ${L.toFixed(2)} m, Max Fahrstreifen: ${lanes}, Geschätztes Aufkommen: ${vol.toLocaleString()} Fzg/h`,
      hintText: ({ speed, capPerLane, applyCode, ratio }) => `Basis-Kapazität je Fahrstreifen bei ${speed} km/h: ${capPerLane} Fzg/h, Code = ${applyCode}, Auslastung = ${ratio}.`,

      // Tunnel geometry
      tunnelGeometryTitle: "Tunnelgeometrie",
      tunnelArLabel: "Innerer Querschnitt [Ar] (m²)",
      tunnelLpLabel: "Tunnelumfang [Lp] (m)",
      tunnelDrLabel: "Repräsentativer Durchmesser [Dr] (m)"
    },
    trafficEstimation: {
      title: "Geschätztes Verkehrsaufkommen",
      explanation: "Personenkraftwagen sind 60% Benzin und 40% Diesel, fügt Bus- und LKW-Kategorien hinzu und berechnet das tägliche Gesamtverkehrsaufkommen (AADT) und den Schwerverkehrsanteil Pt.",
      dir1Title: "Geschätzter Verkehr – Masan ⇒ Jinju",
      dir2Title: "Geschätzter Verkehr – Jinju ⇒ Masan",
      targetYear: "Zieljahr",
      totalAadt: "Gesamt AADT (Fzg/Tag)",
      heavyMix: "Schwerverkehrsanteil Pt (%)",
      passengerAadt: "Pkw – Gesamt AADT",
      passengerGasoline: "Pkw – Benzin",
      passengerDiesel: "Pkw – Diesel",
      busSmall: "Bus – klein",
      busLarge: "Bus – groß",
      truckSmall: "Lkw – klein",
      truckMedium: "Lkw – mittel",
      truckLarge: "Lkw – groß",
      truckSpecial: "Spezial",
      vehicleHeader: "Fahrzeugtyp",
      dailyHeader: "Tagesaufkommen",
      mixHeader: "Anteil (%)",
      totalRow: "Summe",
      heavyMixRow: "Schwerverkehrsanteil Pt",
      smokeTitle: "Basisparameter Rauchemission",
      smokeEmissionHeader: "Emissionsfaktor g/km",
      smokeQ0Header: "q0T [m²/h·Fzg]",
      smokeReductionFactorLabel: "Reduktionsfaktor",
      smokeReferenceSpeedLabel: "Referenzgeschwindigkeit [km/h]"
    },

    trafficDensity: {
      title: "Verkehrsdichte-Berechnung",
      imaxLabel: "Maximales Verkehrsaufkommen Imax [pcu/hr]",
      roadTypeLabel: "Stau-Verkehrsklassifizierung",
      roadTypeHighway: "Bundesstraße/Autobahn: 1",
      roadTypeUrban: "Städtisch: 2",
      speedRowLabel: "Fahrzeuggeschwindigkeit (km/h)",
      flowRowLabel: "Verkehrsaufkommen [pcu/hr·Fahrstreifen]"
    },

    fivSpeedGrade: {
      tableTitle: "Korrekturkoeffizienten-Tabelle",
      tableDescription: "Vollständige Geschwindigkeit-Neigung Korrekturfaktortabelle.",
      selectGroupLabel: "Fahrzeuggruppe:",
      tableNote: "Werte stellen f_iv Korrekturfaktoren dar. Zeilen = Geschwindigkeit (km/h), Spalten = Neigung (%).",
      activeLabel: "Aktiv:"
    },
    dataCatalog: {
      title: "Datentabellenauswahl",
      description: "Wählen Sie eine Korrekturfaktortabelle zum Importieren und Verwenden in Berechnungen.",
      currentlyActive: "Derzeit Aktiv:",
      clearAllButton: "Alles Löschen",
      pmCorrectionFactor: "PM Korrekturfaktor",
      coCorrectionFactor: "CO Korrekturfaktor",
      noxCorrectionFactor: "NOx Korrekturfaktor",
      allPollutants: "Alle Schadstoffe (PM + CO + NOx)",
      allDescription: "Alle drei Schadstofftabellen zusammen importieren",
      tableDescription: "4 Basistabellen (Geschwindigkeit × Neigung) + 8 Abschnittstabellen",
      activeButton: "Aktiv",
      selectButton: "Auswählen",
      tipMessage: "💡 Tipp: Kehren Sie nach der Auswahl einer Tabelle zur Startseite zurück.",
      importSuccess: "erfolgreich importiert!",
      importAllSuccess: "Alle Tabellen wurden erfolgreich importiert!",
      clearSuccess: "Alle importierten Tabellen wurden gelöscht.",
      loadError: "Kann nicht geladen werden",
      allSelected: "✓ Alle Schadstoffe Ausgewählt",
      imported: "Importiert",
      defaultPM: "PM (Standard)"
    },
    app: {
      home: "Startseite",
      dataCatalog: "Datenkatalog"
    }
  }
  /* ===================== FILIPINO ===================== */
  , fil: {
    designConditions: {
      languageLabel: "Wika",
      moduleTitle: "Mga kundisyon ng disenyo at tinantyang trapiko",
      globalTitle: "Global na mga input sa disenyo",
      designSpeed: "Bilis ng disenyo V [km/h]",
      applyCode: "Ilapat ang CODE",
      capacityRatio: "Ratio ng paggamit ng kapasidad",
      serviceLevel: "Service level code",
      peakTrafficHeader: "Ilagay ang trapiko sa oras ng rurok",
      peakTrafficJinjuLabel: "Jinju",
      peakTrafficMasanLabel: "Masan",
      peakTrafficUnit: "sas/h",
      dir1Title: "Direksyon Masan → Jinju",
      dir2Title: "Direksyon Jinju → Masan",
      categoryCol: "Aytem",
      sectionLabel: (n) => `Seksyon ${n}`,
      slopeRow: "Hilig ng lagusan [%]",
      lengthRow: "Haba ng lagusan [m]",
      lanesRow: "Bilang ng linya [N]",
      numberOfSectionsLabel: "Bilang ng mga seksyon",
      averageElevationLabel: "Karaniwang elebasyon [m]",
      summaryText: (L, lanes, vol) => `Kabuuang haba: ${L.toFixed(2)} m, Pinakamaraming linya: ${lanes}, Tinantyang trapiko: ${vol.toLocaleString()} sas/h`,
      hintText: ({ speed, capPerLane, applyCode, ratio }) => `Batayang kapasidad bawat linya sa ${speed} km/h: ${capPerLane} sas/h, CODE = ${applyCode}, Ratio ng paggamit = ${ratio}.`,

      // Tunnel geometry
      tunnelGeometryTitle: "Heometriya ng lagusan",
      tunnelArLabel: "Panloob na cross-sectional area [Ar] (m²)",
      tunnelLpLabel: "Perimeter ng lagusan [Lp] (m)",
      tunnelDrLabel: "Kinatawan na diameter [Dr] (m)"
    },
    trafficEstimation: {
      title: "Tinantyang trapiko",
      explanation: "Ang mga sasakyang pampasahero ay 60% gasolina at 40% diesel, idinadagdag ang mga kategorya ng bus at trak, at kinukuwenta ang kabuuang araw-araw na trapiko (AADT) at paghalong mabibigat na sasakyan Pt.",
      dir1Title: "Tinantyang trapiko – Masan ⇒ Jinju",
      dir2Title: "Tinantyang trapiko – Jinju ⇒ Masan",
      targetYear: "Target na taon",
      totalAadt: "Kabuuang AADT (sas/araw)",
      heavyMix: "Halo ng mabibigat na sasakyan Pt (%)",
      passengerAadt: "Mga kotse – kabuuang AADT",
      passengerGasoline: "Kot­se – gasolina",
      passengerDiesel: "Kot­se – diesel",
      busSmall: "Bus – maliit",
      busLarge: "Bus – malaki",
      truckSmall: "Trak – maliit",
      truckMedium: "Trak – katamtaman",
      truckLarge: "Trak – malaki",
      truckSpecial: "Espesyal",
      vehicleHeader: "Uri ng sasakyan",
      dailyHeader: "Bilang arawan",
      mixHeader: "Porsiyento",
      totalRow: "Kabuuan",
      heavyMixRow: "Halo ng mabibigat na sasakyan Pt",
      smokeTitle: "Mga batayang parametro ng usok",
      smokeEmissionHeader: "Faktor ng emisyon g/km",
      smokeQ0Header: "q0T [m²/h·sas]",
      smokeReductionFactorLabel: "Faktor ng pagbabawas",
      smokeReferenceSpeedLabel: "Bilis ng sanggunian [km/h]"
    },

    trafficDensity: {
      title: "Pagkalkula ng Densidad ng Trapiko",
      imaxLabel: "Pinakamataas na dami ng trapiko Imax [pcu/hr]",
      roadTypeLabel: "Klasipikasyon ng trapiko sa pagsiksik",
      roadTypeHighway: "Pambansang/Highway: 1",
      roadTypeUrban: "Lunsod: 2",
      speedRowLabel: "Bilis ng sasakyan (km/h)",
      flowRowLabel: "Dami ng trapiko [pcu/hr·lane]"
    },

    fivSpeedGrade: {
      tableTitle: "Talahanayan ng mga Correction Coefficient",
      tableDescription: "Kumpletong talahanayan ng faktor ng pagwawasto ng bilis-hilig.",
      selectGroupLabel: "Grupo ng Sasakyan:",
      tableNote: "Ang mga halaga ay kumakatawan sa mga faktor ng pagwawasto f_iv. Hilera = bilis (km/h), Haligi = hilig (%).",
      activeLabel: "Aktibo:"
    },

    dataCatalog: {
      title: "Pagpili ng mga Talahanayan ng Datos",
      description: "Pumili ng talahanayan ng faktor ng pagwawasto upang i-import at gamitin sa mga kalkulasyon.",
      currentlyActive: "Kasalukuyang Aktibo:",
      clearAllButton: "Linisin Lahat",
      pmCorrectionFactor: "Faktor ng Pagwawasto ng PM",
      coCorrectionFactor: "Faktor ng Pagwawasto ng CO",
      noxCorrectionFactor: "Faktor ng Pagwawasto ng NOx",
      allPollutants: "Lahat ng Pollutant (PM + CO + NOx)",
      allDescription: "I-import ang tatlong talahanayan ng pollutant nang sabay-sabay",
      tableDescription: "4 na pangunahing talahanayan (bilis × hilig) + 8 na talahanayan ng segment",
      activeButton: "Aktibo",
      selectButton: "Pumili",
      tipMessage: "💡 Tip: Pagkatapos pumili ng talahanayan, bumalik sa pangunahing pahina.",
      importSuccess: "matagumpay na na-import!",
      importAllSuccess: "Lahat ng talahanayan ng pollutant ay matagumpay na na-import!",
      clearSuccess: "Lahat ng na-import na talahanayan ay nalinis na.",
      loadError: "Hindi ma-load ang",
      allSelected: "✓ Lahat ng Pollutant ay Napili",
      imported: "Na-import",
      defaultPM: "PM (Default)"
    },

    app: {
      home: "Tahanan",
      dataCatalog: "Katalogo ng Datos"
    }
  }
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
