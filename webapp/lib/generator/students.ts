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

type RatingCounts = {
  excellent: number;
  veryGood: number;
  good: number;
  moderate: number;
  poor: number;
};

type QuestionSummary = {
  questionNo: number;
  counts: RatingCounts;
  average: number;
};

export function prepareFeedbackSummary(
  records: StudentRecordWithFeedback[],
  averages: { [key: string]: number },
): QuestionSummary[] {
  const numQuestions = Object.keys(records[0].responses).length;
  const summary: QuestionSummary[] = [];

  for (let q = 1; q <= numQuestions; q++) {
    const counts: RatingCounts = {
      excellent: 0,
      veryGood: 0,
      good: 0,
      moderate: 0,
      poor: 0,
    };

    records.forEach((rec) => {
      const rating = rec.responses[q.toString()];
      if (rating === 5) counts.excellent++;
      else if (rating === 4) counts.veryGood++;
      else if (rating === 3) counts.good++;
      else if (rating === 2) counts.moderate++;
      else if (rating === 1) counts.poor++;
    });

    summary.push({
      questionNo: q,
      counts,
      average: averages[q.toString()] || 0,
    });
  }

  return summary;
}

export function generateExcelData(
  summary: QuestionSummary[],
  particulars: string[],
) {
  const data = summary.map((item, idx) => ({
    "Sr. No.": item.questionNo,
    Particulars: particulars[idx], // Assuming particulars is 0-indexed for question 1
    " ": "", // Empty column
    Excellent: item.counts.excellent,
    "Very Good": item.counts.veryGood,
    Good: item.counts.good,
    Moderate: item.counts.moderate,
    Poor: item.counts.poor,
    Average: item.average,
    "Total Responses":
      item.counts.excellent +
      item.counts.veryGood +
      item.counts.good +
      item.counts.moderate +
      item.counts.poor,
  }));
  return data;
}

export const studentFeedbackParticulars = [
  "The aptness of the learning objects of the program.",
  "The organization of the syllabi and its appropriateness to the program.",
  "The suitability of the text books and reference books to the courses.",
  "The effectiveness of feedback submitted by the faculty to the university w.r.t design and development of syllabi.",
  "Distribution of contact hours among the course components.",
  "The balance between theory and practical courses/training in the curriculum.",
  "The quality of elective subjects offered in terms of technological advancements.",
  "The aptness of modern tools taught in higher education or career.",
  "Communication skills imparted to effectively communicate and give / receive clear instructions.",
  "Ability to assess societal, health, safety, legal and cultural issues and the associated responsibilities.",
];
