export interface User {
    id: string;
    useName: string;
    email: string;
    password?: string;
    role: string;
    createdAt?: Date;
}

export interface AuthResponse {
    accessToken: string;
  }
