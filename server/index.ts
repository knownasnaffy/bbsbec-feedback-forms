import express, { Request, Response } from "express";
import { generateStudentsPdf } from "./generators/students";
import path from "path";

const PORT = 3001;

const app = express();
app.use(express.json());

// Serve static files from the 'public' folder
app.use(express.static(path.join(__dirname, "public")));

app.post("/generate", async (req: Request, res: Response) => {
  const records = req.body.records;
  await generateStudentsPdf(records).catch(console.error);
  res.download(`export/students/${records[0].roll}.pdf`);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
