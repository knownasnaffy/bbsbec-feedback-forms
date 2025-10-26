import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function HomePage() {
  const links = [
    {
      href: "/alumni",
      title: "Alumni",
      desc: "Upload alumni batch records in CSV format.",
    },
    {
      href: "/students",
      title: "Students",
      desc: "Submit student group CSV records.",
    },
    {
      href: "/faculty",
      title: "Faculty",
      desc: "Provide faculty department CSV records.",
    },
  ]

  return (
    <main className="mx-auto max-w-6xl px-4 py-10 md:py-14">
      <section className="mb-10 md:mb-14">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-pretty text-3xl font-semibold leading-tight md:text-5xl">A Simple, Elegant CSV Portal</h1>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Quickly submit Alumni, Student, and Faculty data. Built with accessible, responsive UI and clear feedback.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Link href="/alumni">
              <Button className="bg-primary text-primary-foreground">Go to Alumni</Button>
            </Link>
            <Link href="/students">
              <Button variant="outline" className="border-border bg-transparent">
                Go to Students
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <section aria-label="Sections" className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {links.map((l) => (
          <Link key={l.href} href={l.href} className="group">
            <Card className="h-full transition-colors hover:border-primary/40">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{l.title}</span>
                  <span className="text-sm font-normal text-muted-foreground group-hover:text-foreground">
                    {"Explore →"}
                  </span>
                </CardTitle>
                <CardDescription className="text-muted-foreground">{l.desc}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="rounded-md bg-muted/40 p-4 text-sm text-muted-foreground">
                  Use CSV with a header row for best results.
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </section>
    </main>
  )
}
