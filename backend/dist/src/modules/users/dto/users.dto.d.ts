import { Role } from '@prisma/client';
export declare class CreateUserDto {
    email: string;
    password: string;
    name: string;
    role: Role;
}
export declare class UpdateUserDto {
    name?: string;
    password?: string;
}
export declare class AddAddressDto {
    fullName: string;
    phone: string;
    province: string;
    district: string;
    ward: string;
    street: string;
    label?: string;
    isDefault?: boolean;
}
