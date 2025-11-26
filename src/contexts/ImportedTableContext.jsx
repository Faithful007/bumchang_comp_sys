// src/contexts/ImportedTableContext.jsx
import React, { createContext, useContext, useState } from "react";

const ImportedTableContext = createContext();

export function ImportedTableProvider({ children }) {
  const [importedPollutant, setImportedPollutant] = useState(null); // "PM", "CO", "NOx", or null

  return (
    <ImportedTableContext.Provider value={{ importedPollutant, setImportedPollutant }}>
      {children}
    </ImportedTableContext.Provider>
  );
}

export function useImportedTable() {
  const context = useContext(ImportedTableContext);
  if (!context) {
    throw new Error("useImportedTable must be used within ImportedTableProvider");
  }
  return context;
}
