import { Role } from './role';

export interface Account {
    id: string;
    username: string;
    email: string;
    role: Role;
    is_active: boolean;
    jwtToken?: string;
}
