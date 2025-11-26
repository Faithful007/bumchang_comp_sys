// src/App.jsx
import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { LanguageProvider, useLanguage } from "./i18n/LanguageContext";
import { ImportedTableProvider } from "./contexts/ImportedTableContext";
import { DesignSpeedProvider } from "./contexts/DesignSpeedContext";
import { DesignConditionsForm } from "./modules/designConditions";
import { TrafficEstimationModule } from "./modules/trafficEstimation";
import { FivTableView } from "./modules/fivSpeedGrade";
import DataCatalog from "./modules/dataTables/DataCatalog";
import TrafficDensityModule from "./modules/trafficDensity/TrafficDensityModule";
import { getModuleStrings } from "./i18n/appStrings";
import LanguageSelector from "./components/LanguageSelector";

function AppContent() {
  const { lang } = useLanguage();
  const t = getModuleStrings("app", lang);
  
  return (
    <div style={{ padding: 12 }}>
      <nav style={{ marginBottom: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div>
          <Link to="/">{t.home}</Link>{" "}|{" "}
          <Link to="/catalog">{t.dataCatalog}</Link>
        </div>
        <LanguageSelector />
      </nav>
      <Routes>
        <Route
          path="/"
          element={(
            <>
              <DesignConditionsForm />
              <TrafficEstimationModule />
              
              <FivTableView />
              <TrafficDensityModule />
            </>
          )}
        />
        <Route path="/catalog" element={<DataCatalog />} />
      </Routes>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
        <DesignSpeedProvider>
          <ImportedTableProvider>
            <AppContent />
          </ImportedTableProvider>
        </DesignSpeedProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}

