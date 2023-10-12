export type UserState = {
    role: string | null;
    id: string | null;
    companyId: string | null;
    currentChapterId: number | null;
    currentChapterStepId: number | null;
    email: string | null;
    firstName: string | null;
    lastName: string | null;
    validatedChapterId: Array<null> | null;
};

export enum UserRole {
    Admin = 'ADMIN',
    User = 'USER',
    SuperAdmin = 'SUPERADMIN',
}

export interface UserFormData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    companyId: string;
    groupId: string;
    role: string;
  }