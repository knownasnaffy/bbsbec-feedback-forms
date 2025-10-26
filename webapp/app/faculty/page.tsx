import { CsvUploadForm } from "@/components/csv-upload-form"

export default function FacultyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 md:py-14">
      <header className="mb-6">
        <h1 className="text-balance text-2xl font-semibold md:text-3xl">Faculty</h1>
        <p className="mt-2 text-muted-foreground">Provide faculty department records via CSV.</p>
      </header>

      <CsvUploadForm
        title="Faculty Department Upload"
        description="Provide a department name and paste CSV records below."
        endpoint="/api/faculty"
        nameLabel="Department name"
        namePlaceholder="e.g., Mathematics"
        textareaPlaceholder={"name,email,role\\nAlan Turing,alan@uni.edu,Professor"}
        cta="Upload Faculty"
      />
    </main>
  )
}
