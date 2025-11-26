# Traffic Estimation Data Import/Export

## Import File Format

The system accepts CSV or TXT files (comma or tab-separated) with the following structure:

### Required Columns (in order):
1. **Year** (목표년도) - Target year
2. **Gasoline** (휘발유) - Passenger cars gasoline
3. **Diesel** (경유) - Passenger cars diesel  
4. **Bus Small** (버스 소형) - Small buses
5. **Bus Large** (버스 대형) - Large buses
6. **Truck Small** (트럭 소형) - Small trucks
7. **Truck Medium** (트럭 중형) - Medium trucks
8. **Truck Large** (트럭 대형) - Large trucks
9. **Special** (특수) - Special vehicles

### Example CSV File:

```
Year,Gasoline,Diesel,BusSmall,BusLarge,TruckSmall,TruckMedium,TruckLarge,Special
2222,49804,33203,0,815,14331,3020,332,862
2223,50000,33500,0,820,14500,3050,340,870
```

### Import Behavior:
- All rows are imported for batch processing
- **First row** → Direction 1 (Masan → Jinju) - shown in UI for preview
- **Second row** → Direction 2 (Jinju → Masan) - shown in UI for preview
- All rows are stored for batch computation

## Batch Processing Workflow

### 1. Import Data
Click **📁 Import Data** button to upload CSV/TXT file with multiple entries (multiple years or scenarios).

### 2. Compute Results
After importing, click **🧮 Compute** button to calculate AADT and Pt for all imported entries.
- The Compute button will be **green** when there is uncomputed data
- The Compute button will be **disabled** if no data has been imported
- Export is disabled until computation is complete

### 3. Export Results
After computation, you can export results in either CSV or PDF format:
- **📊 Export CSV**: Download results as CSV file for further analysis in Excel
- **📄 Export PDF**: Download formatted PDF report with all results
- Export buttons are enabled only after data has been computed
- Tooltip will remind you to compute first if you try to export uncomputed data

## Export File Formats

### CSV Export:
The CSV export includes all input data plus calculated results:

**Export Columns:**
- All input columns (Year through Special)
- **Total AADT** - Calculated total annual average daily traffic
- **Heavy Mix Pt (%)** - Heavy vehicle mix percentage (busLarge + truckMedium + truckLarge + truckSpecial)

### PDF Export:
The PDF export opens your browser's print dialog with a formatted report:
- Click the PDF button to open a new window with the formatted data
- Use your browser's print function (Ctrl+P or Cmd+P)
- Select "Save as PDF" or "Microsoft Print to PDF" as the printer
- Features include:
  - Document title and generation timestamp
  - Professional table layout with headers
  - All input data and calculated results (AADT and Pt)
  - Landscape orientation for better table viewing
  - Optimized for printing and sharing

### Manual Entry Export:
If you enter data manually (without importing a file), you can directly export the two directions in either CSV or PDF format without using the Compute button.

## Complete Workflow Example:
1. **Import**: Upload CSV with 10 years of traffic data → Message shows "10 entries loaded"
2. **Compute**: Click Compute button → All 10 entries are calculated with AADT and Pt → Message shows "Data computed successfully!"
3. **Export**: 
   - Click **Export CSV** → Download CSV with all 10 entries plus AADT and Pt calculations
   - OR Click **Export PDF** → Download formatted PDF report with all data and calculations

## Notes:
- Files can use comma (,) or tab (\t) as separators
- Header row is optional but recommended
- Values should be numeric (integers or decimals)
- Missing values default to 0
