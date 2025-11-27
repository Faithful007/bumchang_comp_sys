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
  
  const containerStyle = {
    padding: '8px',
    maxWidth: '100%',
    margin: '0 auto',
    overflowX: 'hidden'
  };

  const navStyle = {
    marginBottom: 12,
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '8px',
    padding: '8px',
    backgroundColor: '#f5f5f5',
    borderRadius: '4px'
  };

  const linkStyle = {
    padding: '4px 8px',
    textDecoration: 'none',
    color: '#0066cc',
    fontWeight: 500
  };
  
  return (
    <div style={containerStyle}>
      <nav style={navStyle}>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Link to="/" style={linkStyle}>{t.home}</Link>
          <span>|</span>
          <Link to="/catalog" style={linkStyle}>{t.dataCatalog}</Link>
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
    <BrowserRouter basename="/bumchang_comp_sys">
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

