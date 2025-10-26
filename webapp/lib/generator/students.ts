import { StudentRecord, StudentRecordWithFeedback } from "../types/students";
import { generateResponses, randomInt } from "./common";

const suggestions = [
  "",
  "",
  "",
  "",
  "",
  "Good program",
  "Great execution",
  "Well structured course",
  "Engaging faculty",
  "Needs improvement",
  "Excellent curriculum",
  "Very informative",
  "Enjoyed assignments",
  "Could use more hands-on",
  "Supportive environment",
];

export function calcWeightedAverage(
  records: StudentRecordWithFeedback[],
): number {
  let sum = 0;
  let count = 0;
  records.forEach((rec) => {
    Object.values(rec.responses).forEach((val) => {
      sum += val;
      count++;
    });
  });
  return sum / count;
}

export function generateRecords(
  baseRecords: StudentRecord[],
  avgTarget = 4.5,
  questions = 10,
  attempts = 30,
): StudentRecordWithFeedback[] {
  let out: StudentRecordWithFeedback[] = [];
  let avg = 0;
  for (let attempt = 0; attempt < attempts; attempt++) {
    out = baseRecords.map((rec) => ({
      ...rec,
      responses: generateResponses(avgTarget, questions),
      suggestion: suggestions[randomInt(0, suggestions.length - 1)],
    }));
    avg = calcWeightedAverage(out);
    if (avg >= 4.3 && avg <= 4.7) break;
    // Slightly tweak the bias if necessary
    avgTarget += (4.5 - avg) * 0.6;
  }
  return out;
}

// const records: StudentRecord[] = [
//   { name: "Barinderpreet Singh", roll: "2414225", program: "B.Tech CSE 2024" },
//   { name: "Amritpal Singh", roll: "2414205", program: "B.Tech CSE 2024" },
//   { name: "Amritpal Singh", roll: "2414205", program: "B.Tech CSE 2024" },
//   { name: "Amritpal Singh", roll: "2414205", program: "B.Tech CSE 2024" },
//   { name: "Amritpal Singh", roll: "2414205", program: "B.Tech CSE 2024" },
//   { name: "Amritpal Singh", roll: "2414205", program: "B.Tech CSE 2024" },
//   { name: "Amritpal Singh", roll: "2414205", program: "B.Tech CSE 2024" },
//   // Add more if needed...
// ];

// const dataset = generateRecords(records, 4.5, 10);
//
// console.log(dataset);
//
// console.log("Weighted average:", calcWeightedAverage(dataset));

export function calcPerQuestionWeightedAverages(
  records: StudentRecordWithFeedback[],
): { [key: string]: number } {
  const numQuestions = Object.keys(records[0].responses).length;
  const result: { [key: string]: number } = {};
  for (let q = 1; q <= numQuestions; q++) {
    let sum = 0;
    let count = 0;
    records.forEach((rec) => {
      sum += rec.responses[q.toString()];
      count++;
    });
    // Rounded to two decimal points
    result[q.toString()] = Math.round((sum / count) * 100) / 100;
  }
  return result;
}

// Example usage (put after generateRecords):
// const perQuestionAverages = calcPerQuestionWeightedAverages(dataset);
// console.log(perQuestionAverages);

/* Output example:
{
  "1": 4.6,
  "2": 4.7,
  "3": 4.5,
  "4": 4.3,
  ...
  "10": 4.4
}
*/
