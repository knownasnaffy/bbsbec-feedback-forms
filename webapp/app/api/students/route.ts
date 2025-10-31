import { NextResponse } from "next/server";
import { StudentRecord } from "@/lib/types/students";
import {
  calcPerQuestionWeightedAverages,
  generateRecords,
} from "@/lib/generator/students";
import { isValidCsv } from "@/lib/csv";
import { randomizedSubset } from "@/lib/utils";

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

  const records = input
    .trim()
    .split("\n")
    .map((line: string) => {
      const [roll, name] = line.split("\t");
      return { name, roll, program };
    }) as StudentRecord[];

  const dataset = generateRecords(records, 4.5, 10);
  const perQuestionAverages = calcPerQuestionWeightedAverages(dataset);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20 * 60 * 1000); // 20 minutes

  // Forward the JSON data to the backend server
  const zipReqResponse = await fetch("http://localhost:4000/generate/student", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      records: randomizedSubset(dataset),
    }),
    signal: controller.signal,
  });

  clearTimeout(timeout);

  if (!zipReqResponse.ok) {
    const errorData = await zipReqResponse.json().catch(() => ({}));
    return NextResponse.json(
      { error: errorData.error || "Backend generation failed" },
      { status: zipReqResponse.status },
    );
  }

  // Read the JSON response with jobId (no zip directly)
  const data = await zipReqResponse.json();

  return NextResponse.json({
    message: "Processing started",
    jobId: data.jobId,
  });
}
