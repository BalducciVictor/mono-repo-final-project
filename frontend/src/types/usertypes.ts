export type UserState = {
    role: string | null;
};

export enum UserRole {
    Admin = 'ADMIN',
    User = 'DEFAULT'
}