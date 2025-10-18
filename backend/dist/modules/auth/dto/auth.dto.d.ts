import { Role } from '@prisma/client';
export declare class RegisterDto {
    email: string;
    password: string;
    name: string;
    phone?: string;
    avatar?: string;
    role?: Role;
    storeName?: string;
    companyName?: string;
    taxCode?: string;
}
export declare class LoginDto {
    email: string;
    password: string;
}
export declare class VerifyEmailDto {
    token: string;
}
export declare class ResendVerificationDto {
    email: string;
}
