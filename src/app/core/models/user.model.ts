export interface User {
    id?: string;
    useName: string;
    firstName: string;
    lastName: string;
    email: string;
    password?: string;
    role?: string;
    createdAt?: Date;
    updatedAt?: Date;
    isEnabled?: boolean;
}

export interface AuthResponse {
    user: User;
    accessToken: string;
  }

