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

  // console.log(perQuestionAverages);
  await generateStudentsPdf(dataset);

  // Dummy processing — in real app, insert into DB
  return NextResponse.json({
    ok: true,
    type: "students",
    name: program,
    count,
  });
}
