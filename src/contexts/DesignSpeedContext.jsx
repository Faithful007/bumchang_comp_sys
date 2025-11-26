// src/contexts/DesignSpeedContext.jsx
import React, { createContext, useContext, useState } from "react";

const DesignSpeedContext = createContext();

export function DesignSpeedProvider({ children }) {
  const [designSpeed, setDesignSpeed] = useState(80);

  return (
    <DesignSpeedContext.Provider value={{ designSpeed, setDesignSpeed }}>
      {children}
    </DesignSpeedContext.Provider>
  );
}

export function useDesignSpeed() {
  const context = useContext(DesignSpeedContext);
  if (!context) {
    throw new Error("useDesignSpeed must be used within DesignSpeedProvider");
  }
  return context;
}
