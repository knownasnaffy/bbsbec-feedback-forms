import { NextResponse } from "next/server";
import { isValidCsv, countCsvRows } from "@/lib/csv";
import { writeFileSync } from "fs";
import { StudentRecord } from "@/lib/types/students";
import {
  calcPerQuestionWeightedAverages,
  generateRecords,
} from "@/lib/generator/students";
import { generateStudentsPdf } from "@/lib/pdf/students";

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}) as any);
  const program = typeof body?.name === "string" ? body.name.trim() : "";
  const input = body?.records;

  if (program.length < 2) {
    return NextResponse.json(
      { error: "Please provide a valid group name." },
      { status: 400 },
    );
  }
  if (!isValidCsv(input)) {
    return NextResponse.json(
      { error: "Please provide valid CSV content." },
      { status: 400 },
    );
  }

  const count = countCsvRows(input as string);
  const records = input
    .trim()
    .split("\n")
    .map((line: string) => {
      const [roll, name] = line.split("\t");
      return { name, roll, program };
    }) as StudentRecord[];

  const dataset = generateRecords(records, 4.5, 10);

  // console.log(dataset);

  const perQuestionAverages = calcPerQuestionWeightedAverages(dataset);

  console.log(perQuestionAverages);
  // await generateStudentsPdf(dataset);

  // Forward the JSON data to the backend server as a POST request
  const zipReqResponse = await fetch("http://localhost:4000/generate/student", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      records: dataset.splice(0, 20), // Limit to first 500 records for testing
    }),
  });

  // Read the response as a Blob (binary data)
  const zipArrayBuffer = await zipReqResponse.arrayBuffer();
  const zipBuffer = Buffer.from(zipArrayBuffer);

  // Return the zip file as an attachment (download)
  return NextResponse.json({
    ok: true,
    type: "students",
    name: program,
    count,
  });
}
