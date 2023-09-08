import { Question } from './question';

export class Questionnaire {
  readonly _id?: string;
  chapterId: number;
  step: number;
  question: Question[];
}
