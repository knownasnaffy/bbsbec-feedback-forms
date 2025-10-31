import * as XLSX from "xlsx";
import * as path from "path";
import * as fs from "fs";

export interface FeedbackExcelRow {
  "Sr. No.": number;
  Particulars: string;
  Excellent: number;
  "Very Good": number;
  Good: number;
  Moderate: number;
  Poor: number;
  Average: number;
}

/**
 * Saves an Excel file with the feedback summary in the specified directory.
 * @param excelData - Array of objects as returned by generateExcelData.
 * @param exportDir - Directory path where the file will be saved.
 * @param filename - File name for the Excel file (e.g. 'FeedbackSummary.xlsx').
 */
export function saveFeedbackExcel(
  excelData: FeedbackExcelRow[],
  exportDir: string,
  filename: string,
): void {
  // Ensure the export directory exists
  if (!fs.existsSync(exportDir)) {
    fs.mkdirSync(exportDir, { recursive: true });
  }
  const ws = XLSX.utils.json_to_sheet(excelData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Feedback Summary");
  const filePath = path.join(exportDir, filename);
  XLSX.writeFile(wb, filePath);
}
