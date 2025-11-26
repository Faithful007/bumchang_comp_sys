// src/modules/dataTables/TableViewer.jsx
import React, { useMemo } from "react";
import { useParams } from "react-router-dom";
import { buildOverrideFromStructuredData, setTableOverride, clearTableOverride } from "../../utils/speedGradeTables";
import { useImportedTable } from "../../contexts/ImportedTableContext";

function loadJson(file) {
  // Dynamic requires for files under src/utils/data
  try {
    // eslint-disable-next-line global-require
    return require(`../../utils/data/${file}`);
  } catch (e) {
    return null;
  }
}

export default function TableViewer() {
  const { file } = useParams();
  const { importedPollutant, setImportedPollutant } = useImportedTable();

  // Handle "all" case
  const isAll = file === "all";
  const allFiles = ["pmSpeedGradeFiv.json", "coSpeedGradeFiv.json", "noxSpeedGradeFiv.json"];
  
  const data = useMemo(() => {
    if (isAll) {
      return allFiles.map(f => ({ file: f, data: loadJson(f) })).filter(x => x.data);
    }
    return loadJson(file);
  }, [file, isAll]);

  if (isAll && (!data || data.length === 0)) {
    return (
      <div style={{ padding: 16 }}>
        <h2>Tables not found</h2>
        <p>Could not load files</p>
      </div>
    );
  }

  if (!isAll && !data) {
    return (
      <div style={{ padding: 16 }}>
        <h2>Table not found</h2>
        <p>Could not load: {file}</p>
      </div>
    );
  }

  function detectPollutant(fileName = "") {
    if (/^pm/i.test(fileName)) return "PM";
    if (/^co/i.test(fileName)) return "CO";
    if (/^nox?/i.test(fileName)) return "NOx";
    return null;
  }

  function handleImportAll() {
    try {
      allFiles.forEach(f => {
        const fileData = loadJson(f);
        const pollutant = detectPollutant(f);
        if (fileData && pollutant) {
          const override = buildOverrideFromStructuredData(fileData);
          setTableOverride(pollutant, override);
        }
      });
      setImportedPollutant("ALL");
    } catch (e) {
      alert(e.message);
    }
  }

  function handleImport() {
    try {
      const pollutant = detectPollutant(file);
      if (!pollutant) throw new Error("Unable to infer pollutant from filename");
      const override = buildOverrideFromStructuredData(data);
      setTableOverride(pollutant, override);
      setImportedPollutant(pollutant);
    } catch (e) {
      alert(e.message);
    }
  }

  function handleClear() {
    if (isAll) {
      allFiles.forEach(f => {
        const pollutant = detectPollutant(f);
        if (pollutant) clearTableOverride(pollutant);
      });
    } else {
      const pollutant = detectPollutant(file);
      if (pollutant) clearTableOverride(pollutant);
    }
    setImportedPollutant(null);
  }

  // Render all tables
  if (isAll) {
    return (
      <div style={{ padding: 16 }}>
        <h2>All Pollutant Tables (PM + CO + NOx)</h2>
        <div style={{ marginBottom: 12 }}>
          <button onClick={handleImportAll} style={{ marginRight: 8 }}>
            Import All for Calculations
          </button>
          {importedPollutant && (
            <button onClick={handleClear} style={{ marginRight: 8 }}>
              Clear All Imported
            </button>
          )}
          {importedPollutant === "ALL" && <span style={{ color: "green" }}>All pollutants imported.</span>}
        </div>

        {data.map(({ file: f, data: d }) => {
          const pollutant = detectPollutant(f);
          const baseTables = d.base_speed_grade_tables || [];
          const segmentTables = d.segment_speed_grade_tables || [];
          
          return (
            <div key={f} style={{ marginBottom: 40, borderTop: "2px solid #333", paddingTop: 16 }}>
              <h3>{d.sheet} ({pollutant})</h3>
              
              <h4 style={{ marginTop: 24 }}>Base Speed-Grade Tables (차속 × 경사도)</h4>
              {baseTables.map((t) => (
                <div key={t.table_id} style={{ marginBottom: 24 }}>
                  <h5>{t.title}</h5>
                  <div style={{ overflowX: "auto", border: "1px solid #ddd" }}>
                    <table style={{ borderCollapse: "collapse", minWidth: 800 }}>
                      <thead>
                        <tr>
                          <th style={{ position: "sticky", left: 0, background: "#fafafa", border: "1px solid #ccc", padding: 8 }}>
                            {t.row_header}
                          </th>
                          {t.grades.map((g) => (
                            <th key={g} style={{ border: "1px solid #ccc", padding: 8 }}>{g}%</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {t.rows.map((r) => (
                          <tr key={r.speed_kmh}>
                            <td style={{ position: "sticky", left: 0, background: "#fafafa", border: "1px solid #ccc", padding: 8 }}>{r.speed_kmh} km/h</td>
                            {t.grades.map((g) => (
                              <td key={g} style={{ border: "1px solid #ddd", padding: 8 }}>
                                {r.values[String(g)]}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}

              {segmentTables.length > 0 && (
                <>
                  <h4 style={{ marginTop: 32 }}>Segment Speed-Grade Tables (구간 × 차속)</h4>
                  {segmentTables.map((t) => (
                    <div key={t.table_id} style={{ marginBottom: 24 }}>
                      <h5>{t.title}</h5>
                      <div style={{ overflowX: "auto", border: "1px solid #ddd" }}>
                        <table style={{ borderCollapse: "collapse", minWidth: 800 }}>
                          <thead>
                            <tr>
                              <th style={{ position: "sticky", left: 0, background: "#fafafa", border: "1px solid #ccc", padding: 8 }}>
                                {t.row_header}
                              </th>
                              <th style={{ background: "#fafafa", border: "1px solid #ccc", padding: 8 }}>
                                {t.column_header}
                              </th>
                              {t.speeds.map((s) => (
                                <th key={s} style={{ border: "1px solid #ccc", padding: 8 }}>{s} km/h</th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {t.rows.map((r, idx) => (
                              <tr key={idx}>
                                <td style={{ position: "sticky", left: 0, background: "#fafafa", border: "1px solid #ccc", padding: 8 }}>{r.segment}</td>
                                <td style={{ background: "#f5f5f5", border: "1px solid #ddd", padding: 8 }}>{r.grade_percent}%</td>
                                {t.speeds.map((s) => (
                                  <td key={s} style={{ border: "1px solid #ddd", padding: 8 }}>
                                    {r.values[String(s)]}
                                  </td>
                                ))}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          );
        })}

        <p style={{ color: "#666" }}>All tables loaded. Click "Import All" to use them in calculations.</p>
      </div>
    );
  }

  // Single file rendering
  const baseTables = data.base_speed_grade_tables || [];
  const segmentTables = data.segment_speed_grade_tables || [];
  const pollutant = detectPollutant(file);

  return (
    <div style={{ padding: 16 }}>
      <h2>{data.sheet} — Full Tables</h2>
      <div style={{ marginBottom: 12 }}>
        <button onClick={handleImport} disabled={!pollutant} style={{ marginRight: 8 }}>
          Import for Calculations {pollutant ? `(${pollutant})` : ""}
        </button>
        {importedPollutant && (
          <button onClick={handleClear} style={{ marginRight: 8 }}>
            Clear Imported {importedPollutant}
          </button>
        )}
        {importedPollutant && <span style={{ color: "green" }}>Imported {importedPollutant} override active.</span>}
      </div>

      <h3 style={{ marginTop: 24 }}>Base Speed-Grade Tables (차속 × 경사도)</h3>
      {baseTables.map((t) => (
        <div key={t.table_id} style={{ marginBottom: 24 }}>
          <h4>{t.title}</h4>
          <div style={{ overflowX: "auto", border: "1px solid #ddd" }}>
            <table style={{ borderCollapse: "collapse", minWidth: 800 }}>
              <thead>
                <tr>
                  <th style={{ position: "sticky", left: 0, background: "#fafafa", border: "1px solid #ccc", padding: 8 }}>
                    {t.row_header}
                  </th>
                  {t.grades.map((g) => (
                    <th key={g} style={{ border: "1px solid #ccc", padding: 8 }}>{g}%</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {t.rows.map((r) => (
                  <tr key={r.speed_kmh}>
                    <td style={{ position: "sticky", left: 0, background: "#fafafa", border: "1px solid #ccc", padding: 8 }}>{r.speed_kmh} km/h</td>
                    {t.grades.map((g) => (
                      <td key={g} style={{ border: "1px solid #ddd", padding: 8 }}>
                        {r.values[String(g)]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}

      {segmentTables.length > 0 && (
        <>
          <h3 style={{ marginTop: 32 }}>Segment Speed-Grade Tables (구간 × 차속)</h3>
          {segmentTables.map((t) => (
            <div key={t.table_id} style={{ marginBottom: 24 }}>
              <h4>{t.title}</h4>
              <div style={{ overflowX: "auto", border: "1px solid #ddd" }}>
                <table style={{ borderCollapse: "collapse", minWidth: 800 }}>
                  <thead>
                    <tr>
                      <th style={{ position: "sticky", left: 0, background: "#fafafa", border: "1px solid #ccc", padding: 8 }}>
                        {t.row_header}
                      </th>
                      <th style={{ background: "#fafafa", border: "1px solid #ccc", padding: 8 }}>
                        {t.column_header}
                      </th>
                      {t.speeds.map((s) => (
                        <th key={s} style={{ border: "1px solid #ccc", padding: 8 }}>{s} km/h</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {t.rows.map((r, idx) => (
                      <tr key={idx}>
                        <td style={{ position: "sticky", left: 0, background: "#fafafa", border: "1px solid #ccc", padding: 8 }}>{r.segment}</td>
                        <td style={{ background: "#f5f5f5", border: "1px solid #ddd", padding: 8 }}>{r.grade_percent}%</td>
                        {t.speeds.map((s) => (
                          <td key={s} style={{ border: "1px solid #ddd", padding: 8 }}>
                            {r.values[String(s)]}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </>
      )}

      <p style={{ color: "#666" }}>Tip: Opened in a separate tab via the catalog.</p>
    </div>
  );
}
