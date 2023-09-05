import { v4 as uuidv4 } from 'uuid';

export default class UserModel {
  constructor(user: UserModel | any) {
    this._id = uuidv4();
    this.firstName = user.name;
    this.lastName = user.lastname;
    this.password = user.password;
    this.email = user.email;
    this.companyId = user.companyId;
    this.role = user.role;
    this.currentChapterId = user.currentChapterId;
    this.currentChapterStepId = user.currentChapterStepId;
    this.validatedChapterId = user.validatedChapterId;
  }

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

  save(): UserModel {
    return this;
  }
}
