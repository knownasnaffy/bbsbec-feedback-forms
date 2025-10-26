import { Responses } from "./common";

export type StudentRecord = {
  name: string;
  roll: string;
  program: string;
};

export type StudentRecordWithFeedback = StudentRecord & {
  responses: Responses;
  suggestion: string;
};
