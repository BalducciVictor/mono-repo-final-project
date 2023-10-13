export type UserState = {
    role: string | null;
    id: string | null;
    companyId: number | null;
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
    firstName: string | null;
    lastName: string | null;
    email: string | null;
    password: string | null;
    companyId: number | null;
    groupId: number | null;
    role: string | null;
  }