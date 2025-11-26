// src/modules/dataTables/DataCatalog.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useImportedTable } from "../../contexts/ImportedTableContext";
import { useLanguage } from "../../i18n/LanguageContext";
import { getModuleStrings } from "../../i18n/appStrings";
import { buildOverrideFromStructuredData, setTableOverride, clearTableOverride } from "../../utils/speedGradeTables";

function loadJson(file) {
  try {
    return require(`../../utils/data/${file}`);
  } catch (e) {
    return null;
  }
}



export default function DataCatalog() {
  const navigate = useNavigate();
  const { lang } = useLanguage();
  const t = getModuleStrings("dataCatalog", lang);
  const { importedPollutant, setImportedPollutant } = useImportedTable();

  const DATA_OPTIONS = [
    { name: t.pmCorrectionFactor, file: "pmSpeedGradeFiv.json", pollutant: "PM" },
    { name: t.coCorrectionFactor, file: "coSpeedGradeFiv.json", pollutant: "CO" },
    { name: t.noxCorrectionFactor, file: "noxSpeedGradeFiv.json", pollutant: "NOx" },
    { name: t.allPollutants, file: "all", pollutant: "ALL" }
  ];

  function handleSelect(option) {
    try {
      if (option.pollutant === "ALL") {
        // Import all three pollutants
        const files = [
          { file: "pmSpeedGradeFiv.json", pollutant: "PM" },
          { file: "coSpeedGradeFiv.json", pollutant: "CO" },
          { file: "noxSpeedGradeFiv.json", pollutant: "NOx" }
        ];
        
        files.forEach(({ file, pollutant }) => {
          const data = loadJson(file);
          if (data) {
            const override = buildOverrideFromStructuredData(data);
            setTableOverride(pollutant, override);
          }
        });
        
        setImportedPollutant("ALL");
        alert(t.importAllSuccess);
      } else {
        // Import single pollutant
        const data = loadJson(option.file);
        if (!data) throw new Error(`${t.loadError} ${option.file}`);
        
        const override = buildOverrideFromStructuredData(data);
        setTableOverride(option.pollutant, override);
        setImportedPollutant(option.pollutant);
        alert(`${option.pollutant} ${t.importSuccess}`);
      }
      
      // Navigate back to home to view the table
      navigate("/");
    } catch (e) {
      alert(`Error importing table: ${e.message}`);
    }
  }

  function handleClearAll() {
    ["PM", "CO", "NOx"].forEach(p => clearTableOverride(p));
    setImportedPollutant(null);
    alert(t.clearSuccess);
  }

  return (
    <div style={{ padding: 24, maxWidth: 800, margin: "0 auto" }}>
      <h2 style={{ marginBottom: 8 }}>{t.title}</h2>
      <p style={{ fontSize: 14, color: "#555", marginBottom: 24 }}>
        {t.description}
      </p>

      {importedPollutant && (
        <div style={{
          padding: 12,
          marginBottom: 20,
          background: "#dcfce7",
          border: "1px solid #16a34a",
          borderRadius: 6,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center"
        }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: "#166534" }}>
            ✓ {t.currentlyActive} {
              importedPollutant === "ALL" ? t.allPollutants :
              importedPollutant === "PM" ? t.pmCorrectionFactor :
              importedPollutant === "CO" ? t.coCorrectionFactor :
              importedPollutant === "NOx" ? t.noxCorrectionFactor : ""
            }
          </span>
          <button 
            onClick={handleClearAll}
            style={{
              padding: "6px 12px",
              fontSize: 13,
              background: "#fff",
              border: "1px solid #16a34a",
              borderRadius: 4,
              cursor: "pointer",
              color: "#16a34a",
              fontWeight: 600
            }}
          >
            {t.clearAllButton}
          </button>
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {DATA_OPTIONS.map((option) => (
          <div
            key={option.pollutant}
            style={{
              padding: 16,
              border: "2px solid",
              borderColor: importedPollutant === option.pollutant ? "#16a34a" : "#cbd5e1",
              borderRadius: 8,
              background: importedPollutant === option.pollutant ? "#f0fdf4" : "#fff",
              cursor: "pointer",
              transition: "all 0.2s"
            }}
            onClick={() => handleSelect(option)}
            onMouseEnter={(e) => {
              if (importedPollutant !== option.pollutant) {
                e.currentTarget.style.borderColor = "#94a3b8";
                e.currentTarget.style.background = "#f8fafc";
              }
            }}
            onMouseLeave={(e) => {
              if (importedPollutant !== option.pollutant) {
                e.currentTarget.style.borderColor = "#cbd5e1";
                e.currentTarget.style.background = "#fff";
              }
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4, color: "#1e293b" }}>
                  {importedPollutant === option.pollutant && "✓ "}{option.name}
                </div>
                <div style={{ fontSize: 12, color: "#64748b" }}>
                  {option.pollutant === "ALL"
                    ? t.allDescription
                    : t.tableDescription}
                </div>
              </div>
              <div style={{
                padding: "8px 16px",
                background: importedPollutant === option.pollutant ? "#16a34a" : "#0ea5e9",
                color: "#fff",
                borderRadius: 4,
                fontSize: 13,
                fontWeight: 600
              }}>
                {importedPollutant === option.pollutant ? t.activeButton : t.selectButton}
              </div>
            </div>
          </div>
        ))}
      </div>

      <p style={{ marginTop: 24, fontSize: 12, color: "#94a3b8", fontStyle: "italic" }}>
        {t.tipMessage}
      </p>
    </div>
  );
}
