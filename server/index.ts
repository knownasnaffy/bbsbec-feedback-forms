import express, { Request, Response } from "express";
import { generateStudentsPdf } from "./generators/students";
import path from "path";
import archiver from "archiver";

const port = process.env.PORT || 4000;

const app = express();
app.use(express.json());

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, "public")));

app.post("/generate/student", async (req: Request, res: Response) => {
  const records = req.body.records;
  console.info(
    "Request received to generate PDFs for students:",
    records.length,
  );

  console.info("Generating student PDFs...");
  // The function now returns { runId, exportDir, generatedFiles }
  const { runId, exportDir } = await generateStudentsPdf(records);
  console.info("PDF generation completed.");

  // Set response headers for zip download (include runId for reference if needed)
  res.setHeader("Content-Type", "application/zip");
  res.setHeader(
    "Content-Disposition",
    `attachment; filename=students-${runId}.zip`,
  );

  console.info("Creating zip archive...");
  const archive = archiver("zip", { zlib: { level: 9 } });

  archive.on("error", (err) => {
    console.error(err);
    res.status(500).send({ error: "Could not create archive" });
  });

  archive.pipe(res);

  // Append all files in the generated temp directory to the zip
  archive.directory(exportDir, false);

  archive.finalize();
  console.info("Zip archive created and sent to client.");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
