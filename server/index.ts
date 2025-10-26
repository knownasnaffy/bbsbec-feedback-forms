import express from "express";
import fs from "fs";
import { generateStudentsPdf } from "./generators/students";
const app = express();
app.use(express.json());

app.post("/generate", async (req, res) => {
  // Accepts JSON payload, returns (or streams) PDF file
  const records = req.body.records;
  console.log(records);
  await generateStudentsPdf(records);
  // fs.mkdirSync("export/students", { recursive: true });
  // res.download(`students/${records[0].roll}.pdf`); // adjust for your use-case
});

app.listen(3000);
