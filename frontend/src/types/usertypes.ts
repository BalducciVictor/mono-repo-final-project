export type UserState = {
    role: string | null;
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