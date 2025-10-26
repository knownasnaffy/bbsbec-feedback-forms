import { NextResponse } from "next/server"
import { isValidCsv, countCsvRows } from "@/lib/csv"

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}) as any)
  const name = typeof body?.name === "string" ? body.name.trim() : ""
  const records = body?.records

  if (name.length < 2) {
    return NextResponse.json({ error: "Please provide a valid department name." }, { status: 400 })
  }
  if (!isValidCsv(records)) {
    return NextResponse.json({ error: "Please provide valid CSV content." }, { status: 400 })
  }

  const count = countCsvRows(records as string)
  // Dummy processing — in real app, insert into DB
  return NextResponse.json({ ok: true, type: "faculty", name, count })
}
