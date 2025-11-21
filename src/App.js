// src/App.jsx
import React from "react";
import { LanguageProvider } from "./i18n/LanguageContext";
import { DesignConditionsForm } from "./modules/designConditions";
import { TrafficEstimationModule } from "./modules/trafficEstimation";

export default function App() {
  return (
    <LanguageProvider>
      <DesignConditionsForm />
      <TrafficEstimationModule />
    </LanguageProvider>
  );
}

