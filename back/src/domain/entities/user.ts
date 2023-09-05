export class User {
  readonly _id?: string;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  companyId: string;
  role: string;
  currentChapterId: number;
  currentChapterStepId: number;
  validatedChapterId: number[];
}
