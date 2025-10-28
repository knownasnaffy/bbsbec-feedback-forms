import * as XLSX from "xlsx";
import { StudentRecordWithFeedback } from "../../types/students";

interface WeightedAverages {
  [key: string]: number;
}

export function createExcelReport(
  data: StudentRecordWithFeedback[],
  weightedAvg: WeightedAverages,
): XLSX.WorkBook {
  // Create worksheet data array (rows as arrays of values)
  const wsData: Array<Array<string | number>> = [];

  // Header row, assuming questions 1 to 10
  const headerRow = [
    "Name",
    "Roll",
    "Program",
    ...Array.from({ length: 10 }, (_, i) => `Q${i + 1}`),
    "Suggestion",
  ];
  wsData.push(headerRow);

  // Add each student's data row
  for (const student of data) {
    const row = [
      student.name,
      student.roll,
      student.program,
      ...Array.from(
        { length: 10 },
        (_, i) => student.responses[(i + 1).toString()] ?? "",
      ),
      student.suggestion,
    ];
    wsData.push(row);
  }

  // Add a blank row before averages
  wsData.push([]);

  // Add weighted average row
  const avgRow = [
    "Weighted Average",
    "",
    "",
    ...Array.from(
      { length: 10 },
      (_, i) => weightedAvg[(i + 1).toString()] ?? "",
    ),
    "",
  ];
  wsData.push(avgRow);

  // Create worksheet from data
  const ws = XLSX.utils.aoa_to_sheet(wsData);

  // Create a new workbook and append worksheet
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Feedback Analysis");

  return wb;
}
