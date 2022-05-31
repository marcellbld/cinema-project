export interface User {
  id?: number;
  username?: string;
  fullName?: string;
  phone?: string;
  role?: UserRole;
  password?: string;
}

export enum UserRole {
  Admin = 'ADMIN',
  User = 'USER',
}
