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
  await generateStudentsPdf(records).catch(console.error);

  // Path to the directory containing all student PDFs
  const studentsDir = path.join(__dirname, "..", "export", "students");

  // Set response headers for zip download
  res.setHeader("Content-Type", "application/zip");
  res.setHeader("Content-Disposition", "attachment; filename=students.zip");

  // Create a zip archive and pipe it to response
  const archive = archiver("zip", { zlib: { level: 9 } }); // maximum compression

  archive.on("error", (err) => {
    console.error(err);
    res.status(500).send({ error: "Could not create archive" });
  });

  archive.pipe(res);

  // Append all files in the students directory to the zip
  archive.directory(studentsDir, false);

  // Finalize the archive (signals that no more files will be added)
  archive.finalize();
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
