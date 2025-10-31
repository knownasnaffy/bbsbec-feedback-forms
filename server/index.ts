import express, { Request, Response } from "express";
import { generateStudentsPdf } from "./generators/students";
import path from "path";
import archiver from "archiver";
import { tmpdir } from "os";
import { createWriteStream } from "fs";

const port = process.env.PORT || 4000;

const app = express();
app.use(express.json());

const tempDir = path.join(tmpdir(), "app-name");
app.use("/downloads", express.static(tempDir));
// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, "public")));

import * as os from "os";
import { randomUUID } from "crypto";

function getDownloadsFolder(): string {
  const home = os.homedir();
  return path.join(home, "Downloads");
}

const appDir = path.join(getDownloadsFolder(), "feedback-forms");

app.post("/generate/student", async (req: Request, res: Response) => {
  const records = req.body.records;
  const runId = randomUUID();

  // Make the following tasks background
  //
  // Respond early to client with job id
  res.json({ jobId: runId, message: "Processing started" });

  // Background async execution - no await here
  (async () => {
    try {
      const { exportDir } = await generateStudentsPdf(records, appDir, runId);

      const zipPath = path.join(appDir, "students", `${runId}.zip`);
      const output = createWriteStream(zipPath);
      const archive = archiver("zip", { zlib: { level: 9 } });

      output.on("close", () => {
        console.info(`Zip created at ${zipPath}`);
        // Zip is ready to download at /downloads/students/runId.zip
      });

      archive.on("error", (err) => {
        console.error(err);
        // If you add job status tracking, mark job as failed here
      });

      archive.pipe(output);
      archive.directory(exportDir, false);
      await archive.finalize();
    } catch (error) {
      console.error("Background job error:", error);
      // Handle error accordingly, e.g., mark job status failed
    }
  })();
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
