import { CsvUploadForm } from "@/components/csv-upload-form"

export default function StudentsPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 md:py-14">
      <header className="mb-6">
        <h1 className="text-balance text-2xl font-semibold md:text-3xl">Students</h1>
        <p className="mt-2 text-muted-foreground">Submit student group records via CSV.</p>
      </header>

      <CsvUploadForm
        title="Student Group Upload"
        description="Provide a group name and paste CSV records below."
        endpoint="/api/students"
        nameLabel="Group name"
        namePlaceholder="e.g., Freshmen-Group-A"
        textareaPlaceholder={"name,email,year\\nGrace Hopper,grace@uni.edu,1"}
        cta="Upload Students"
      />
    </main>
  )
}
