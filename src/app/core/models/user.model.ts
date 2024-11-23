import { Space } from "../../features/team/models/space";

export interface User {
    id?: string;
    userName: string;
    firstName: string;
    lastName: string;
    email: string;
    spaces?: Space[];
    password?: string;
    role?: string;
    createdAt?: Date;
    updatedAt?: Date;
    isEnabled?: boolean;
    
}

export interface AuthResponse {
    user: User;
    token: string;
}
