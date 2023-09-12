import { Answer } from "./answer";

export class Question {
  readonly _id?: string;
  content: string;
  answers: Answer[];
  idValidAnswers: number[];
}
