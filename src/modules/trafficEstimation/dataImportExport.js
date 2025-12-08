// src/modules/trafficEstimation/dataImportExport.js

/**
 * Parse CSV/TSV text into array of row objects
 * Expected columns: Year, Gasoline, Diesel, BusSmall, BusLarge, TruckSmall, TruckMedium, TruckLarge, Special
 */
export function parseCSV(text) {
  const lines = text.trim().split('\n');
  if (lines.length < 2) {
    throw new Error('File must have at least a header row and one data row');
  }

  // Skip header row (first line) and parse data rows
  const data = [];
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split(/[,\t]/);
    if (values.length < 9) continue; // Skip incomplete rows
    
    const row = {
      year: parseInt(values[0]) || 0,
      passengerGasoline: parseFloat(values[1]) || 0,
      passengerDiesel: parseFloat(values[2]) || 0,
      busSmall: parseFloat(values[3]) || 0,
      busLarge: parseFloat(values[4]) || 0,
      truckSmall: parseFloat(values[5]) || 0,
      truckMedium: parseFloat(values[6]) || 0,
      truckLarge: parseFloat(values[7]) || 0,
      truckSpecial: parseFloat(values[8]) || 0
    };
    data.push(row);
  }
  
  return data;
}

/**
 * Read file as text
 */
export function readFileAsText(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = (e) => reject(e);
    reader.readAsText(file);
  });
}

/**
 * Export data to CSV format
 * data: array of { year, direction, passengerGasoline, ..., totalAadt, heavyVehicleMixPt }
 */
export function exportToCSV(data, direction) {
  const headers = [
    'Year',
    'Direction',
    'Gasoline',
    'Diesel',
    'Bus Small',
    'Bus Large',
    'Truck Small',
    'Truck Medium',
    'Truck Large',
    'Special',
    'Total AADT',
    'Heavy Mix Pt (%)'
  ];
  
  const rows = data.map(row => {
    // Derive Total AADT if missing
    const totalAadt =
      row.totalAadt != null
        ? Number(row.totalAadt)
        : [
            row.passengerGasoline,
            row.passengerDiesel,
            row.busSmall,
            row.busLarge,
            row.truckSmall,
            row.truckMedium,
            row.truckLarge,
            row.truckSpecial
          ]
            .map(v => Number(v) || 0)
            .reduce((s, v) => s + v, 0);

    // Derive Pt% if missing: F + H + I + J mix percentages
    let pt = row.heavyVehicleMixPt;
    if (pt == null) {
      // If mixPercents available, use them directly
      if (row.mixPercents) {
        const mp = row.mixPercents;
        pt = Number(
          (
            (mp.busLarge || 0) +
            (mp.truckMedium || 0) +
            (mp.truckLarge || 0) +
            (mp.truckSpecial || 0)
          ).toFixed(2)
        );
      } else if (totalAadt > 0) {
        // Compute on the fly from counts
        const f = Number(row.busLarge) || 0;
        const h = Number(row.truckMedium) || 0;
        const i = Number(row.truckLarge) || 0;
        const j = Number(row.truckSpecial) || 0;
        pt = Number((((f + h + i + j) / totalAadt) * 100).toFixed(2));
      }
    }

    return [
      row.year,
      direction,
      row.passengerGasoline,
      row.passengerDiesel,
      row.busSmall,
      row.busLarge,
      row.truckSmall,
      row.truckMedium,
      row.truckLarge,
      row.truckSpecial,
      totalAadt || '',
      pt != null ? Number(pt).toFixed(2) : ''
    ];
  });
  
  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.join(','))
  ].join('\n');
  
  return csvContent;
}

/**
 * Trigger download of CSV file
 */
export function downloadCSV(csvContent, filename = 'traffic_estimation.csv') {
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Export data to PDF format using HTML and browser print
 * Opens a print dialog for the user to save as PDF
 */
export function exportToPDF(data, title = 'Traffic Estimation Results') {
  // Create HTML content for PDF
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>${title}</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          margin: 20px;
          font-size: 12px;
        }
        h1 {
          color: #333;
          font-size: 18px;
          margin-bottom: 5px;
        }
        .timestamp {
          color: #666;
          font-size: 10px;
          margin-bottom: 20px;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          margin-top: 10px;
        }
        th, td {
          border: 1px solid #ddd;
          padding: 8px;
          text-align: right;
        }
        th {
          background-color: #4CAF50;
          color: white;
          font-weight: bold;
          font-size: 11px;
        }
        td:first-child, th:first-child {
          text-align: center;
        }
        tr:nth-child(even) {
          background-color: #f9f9f9;
        }
        @media print {
          body { margin: 10px; }
          @page { size: landscape; }
        }
      </style>
    </head>
    <body>
      <h1>${title}</h1>
      <div class="timestamp">Generated: ${new Date().toLocaleString()}</div>
      <table>
        <thead>
          <tr>
            <th>Year</th>
            <th>Gasoline</th>
            <th>Diesel</th>
            <th>Bus Small</th>
            <th>Bus Large</th>
            <th>Truck Small</th>
            <th>Truck Medium</th>
            <th>Truck Large</th>
            <th>Special</th>
            <th>Total AADT</th>
            <th>Pt (%)</th>
          </tr>
        </thead>
        <tbody>
          ${data.map(row => `
            <tr>
              <td>${row.year}</td>
              <td>${(row.passengerGasoline || 0).toLocaleString()}</td>
              <td>${(row.passengerDiesel || 0).toLocaleString()}</td>
              <td>${(row.busSmall || 0).toLocaleString()}</td>
              <td>${(row.busLarge || 0).toLocaleString()}</td>
              <td>${(row.truckSmall || 0).toLocaleString()}</td>
              <td>${(row.truckMedium || 0).toLocaleString()}</td>
              <td>${(row.truckLarge || 0).toLocaleString()}</td>
              <td>${(row.truckSpecial || 0).toLocaleString()}</td>
              <td><strong>${(row.totalAadt || 0).toLocaleString()}</strong></td>
              <td><strong>${row.heavyVehicleMixPt != null ? row.heavyVehicleMixPt.toFixed(2) : ''}</strong></td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </body>
    </html>
  `;

  // Open print dialog in a new window
  const printWindow = window.open('', '_blank');
  if (printWindow) {
    printWindow.document.write(htmlContent);
    printWindow.document.close();
    
    // Wait for content to load, then trigger print dialog
    printWindow.onload = function() {
      printWindow.focus();
      printWindow.print();
    };
    
    return Promise.resolve(true);
  } else {
    throw new Error('Failed to open print window. Please check your browser settings.');
  }
}
