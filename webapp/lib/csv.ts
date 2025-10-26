export function isValidCsv(text: unknown): boolean {
  if (typeof text !== "string") return false
  const t = text.trim()
  if (t.length < 3) return false
  // Must contain at least a comma or a newline to resemble CSV
  return /,|\n/.test(t)
}

export function countCsvRows(text: string): number {
  return text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0).length
}
