export type UserState = {
    role: string | null;
    id: number | null;
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
    User = 'DEFAULT'
}