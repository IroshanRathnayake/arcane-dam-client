export interface Team {
    id?: string;
    name: string;
    description?: string;
    tags?: string[];
    createdAt?: Date;
    updatedAt?: Date;
    isEnabled?: boolean;
}
