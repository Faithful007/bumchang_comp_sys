// src/components/LanguageSelector.jsx
import React from "react";
import { useLanguage } from "../i18n/LanguageContext";
import { SUPPORTED_LANGS, LANGUAGE_LABELS } from "../i18n/appStrings";

export default function LanguageSelector() {
  const { lang, setLang } = useLanguage();

  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
      <label style={{ fontSize: 14, fontWeight: 500 }}>🌐</label>
      <select
        value={lang}
        onChange={(e) => setLang(e.target.value)}
        style={{
          padding: "6px 10px",
          fontSize: 14,
          borderRadius: 4,
          border: "1px solid #cbd5e1",
          background: "#fff",
          cursor: "pointer",
          fontWeight: 500
        }}
      >
        {SUPPORTED_LANGS.map((langCode) => (
          <option key={langCode} value={langCode}>
            {LANGUAGE_LABELS[langCode]}
          </option>
        ))}
      </select>
    </div>
  );
}
