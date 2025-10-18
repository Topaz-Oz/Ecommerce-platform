import { Role } from '@prisma/client';
export declare class LoginDto {
    email: string;
    password: string;
}
export declare class RegisterDto {
    email: string;
    password: string;
    name: string;
    role?: Role;
}
export declare class ChangePasswordDto {
    oldPassword: string;
    newPassword: string;
}
export declare class AuthResponse {
    access_token: string;
    user: {
        id: string;
        email: string;
        name: string;
        role: string;
        seller?: any;
        logistics?: any;
    };
}
