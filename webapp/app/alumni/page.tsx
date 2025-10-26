import { CsvUploadForm } from "@/components/csv-upload-form"

export default function AlumniPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 md:py-14">
      <header className="mb-6">
        <h1 className="text-balance text-2xl font-semibold md:text-3xl">Alumni</h1>
        <p className="mt-2 text-muted-foreground">Upload alumni batch records via CSV.</p>
      </header>

      <CsvUploadForm
        title="Alumni Batch Upload"
        description="Provide a batch name and paste CSV records below."
        endpoint="/api/alumni"
        nameLabel="Batch name"
        namePlaceholder="e.g., 2015-Computer Science"
        textareaPlaceholder={"name,email,grad_year\\nAda Lovelace,ada@uni.edu,1835"}
        cta="Upload Alumni"
      />
    </main>
  )
}
