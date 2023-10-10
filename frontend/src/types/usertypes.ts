export type UserState = {
    token: string | null;
    role: string | null;
};

export enum UserRole {
    Admin = 'ADMIN',
    User = 'DEFAULT'
}