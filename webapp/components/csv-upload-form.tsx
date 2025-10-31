"use client";

import * as React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

type Props = {
  title: string;
  description?: string;
  endpoint: string;
  nameLabel: string;
  namePlaceholder?: string;
  textareaPlaceholder?: string;
  cta?: string;
};

export function CsvUploadForm({
  title,
  description,
  endpoint,
  nameLabel,
  namePlaceholder = "Enter a name",
  textareaPlaceholder = "Paste CSV content here or upload a file",
  cta = "Submit",
}: Props) {
  const [name, setName] = React.useState("");
  const [records, setRecords] = React.useState("");
  const [submitting, setSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState<string | null>(null);
  const [fileError, setFileError] = React.useState<string | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  async function handleFileUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    setFileError(null);

    if (!file) return;

    // Validate file type
    if (
      !file.name.endsWith(".csv") &&
      file.type !== "text/csv" &&
      file.type !== "text/plain"
    ) {
      setFileError("Please upload a valid CSV file (.csv)");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setFileError("File size must be less than 5MB");
      if (fileInputRef.current) fileInputRef.current.value = "";
      return;
    }

    try {
      const text = await file.text();
      setRecords(text);
      setFileError(null);
    } catch (err) {
      setFileError("Failed to read file. Please try again.");
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(null);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20 * 60 * 1000); // 20 minutes

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, records }),
        signal: controller.signal,
      });

      if (res.ok) {
        const data = await res.json();

        if (data.jobId) {
          // Background job started successfully
          setSuccess(`Processing started. Job ID: ${data.jobId}`);
          // You can optionally use the jobId to poll status or show download link later
        } else {
          setError("Unexpected response from server.");
        }
      } else {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Submission failed. Please try again.");
      }
    } catch (err: any) {
      if (err?.name === "AbortError") {
        setError("Request timed out. Please try again later.");
      } else {
        setError("Network error. Please check your connection and try again.");
      }
    } finally {
      setSubmitting(false);
      clearTimeout(timeout);
    }
  }

  return (
    <Card className="border-border bg-card shadow-sm">
      <CardHeader>
        <CardTitle className="text-balance">{title}</CardTitle>
        {description ? (
          <CardDescription className="text-muted-foreground">
            {description}
          </CardDescription>
        ) : null}
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit} className="grid gap-4" noValidate>
          <div className="grid gap-2">
            <Label htmlFor="name">{nameLabel}</Label>
            <Input
              id="name"
              value={name}
              disabled={submitting}
              onChange={(e) => setName(e.target.value)}
              placeholder={namePlaceholder}
              className="bg-background"
              required
              aria-required="true"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="csv-file">Upload CSV File</Label>
            <Input
              ref={fileInputRef}
              id="csv-file"
              type="file"
              accept=".csv,text/csv,text/plain"
              disabled={submitting}
              onChange={handleFileUpload}
              className="bg-background cursor-pointer"
              aria-describedby="file-help"
            />
            <p id="file-help" className="text-sm text-muted-foreground">
              Select a CSV file (max 5MB) to auto-populate the records field
            </p>
            {fileError ? (
              <Alert variant="destructive" role="alert" aria-live="polite">
                <AlertTitle>File error</AlertTitle>
                <AlertDescription>{fileError}</AlertDescription>
              </Alert>
            ) : null}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="records">Records (CSV)</Label>
            <Textarea
              id="records"
              value={records}
              onChange={(e) => setRecords(e.target.value)}
              disabled={submitting}
              placeholder={textareaPlaceholder}
              className="min-h-40 bg-background"
              required
              aria-required="true"
            />
            <p className="text-sm text-muted-foreground">
              Tip: Include a header row. Example:{" "}
              {'"name,email\\nAda,ada@uni.edu"'}
            </p>
          </div>

          {error ? (
            <Alert variant="destructive" role="alert" aria-live="polite">
              <AlertTitle>Submission failed</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          ) : null}

          {success ? (
            <Alert
              role="status"
              aria-live="polite"
              className="border-primary/30"
            >
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          ) : null}

          <CardFooter className="px-0">
            <Button
              type="submit"
              className="bg-primary text-primary-foreground hover:opacity-90"
              disabled={submitting}
              aria-busy={submitting}
            >
              {submitting ? "Submitting…" : cta}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
