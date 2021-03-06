export enum UserType {
  Student = 1,
  Teacher,
  Builder,
  Admin,
  Editor,
}

export enum UserStatus {
  Pending,
  Active,
  Disabled
}

export interface UserRole {
  roleId: number;
  name?: string;
}

export interface UserBase {
  id: number;
  firstName: string;
  lastName: string;
  tutorialPassed: boolean;
  email: string;
  subjects: any[];
  status: UserStatus;
}

export interface User extends UserBase {
  roles: UserRole[];
}

export interface UserProfile extends UserBase {
  password: string;
  roles: number[];
}
