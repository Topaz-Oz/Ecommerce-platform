import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto, UpdateUserDto, AddAddressDto } from './dto/users.dto';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        id: string;
        email: string;
        name: string;
        createdAt: Date;
        role: import(".prisma/client").$Enums.Role;
        addresses: {
            id: string;
            phone: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            label: string | null;
            fullName: string;
            province: string;
            district: string;
            ward: string;
            street: string;
            isDefault: boolean;
        }[];
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        email: string;
        name: string;
        phone: string;
        avatar: string;
        createdAt: Date;
        role: import(".prisma/client").$Enums.Role;
        seller: {
            id: string;
            rating: number | null;
            verified: boolean;
            userId: string;
            storeName: string;
        };
        enterprise: {
            id: string;
            rating: number | null;
            companyName: string;
            taxCode: string | null;
            verified: boolean;
            officialBrand: boolean;
            userId: string;
        };
        addresses: {
            id: string;
            phone: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            label: string | null;
            fullName: string;
            province: string;
            district: string;
            ward: string;
            street: string;
            isDefault: boolean;
        }[];
    }>;
    findByEmail(email: string): Promise<{
        id: string;
        email: string;
        password: string;
        name: string;
        phone: string | null;
        avatar: string | null;
        createdAt: Date;
        updatedAt: Date;
        role: import(".prisma/client").$Enums.Role;
        isVerified: boolean;
        verificationToken: string | null;
        isActive: boolean;
    }>;
    create(createUserDto: CreateUserDto): Promise<{
        id: string;
        email: string;
        name: string;
        createdAt: Date;
        role: import(".prisma/client").$Enums.Role;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        id: string;
        email: string;
        name: string;
        createdAt: Date;
        role: import(".prisma/client").$Enums.Role;
    }>;
    addAddress(userId: string, addressDto: AddAddressDto): Promise<{
        id: string;
        phone: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        label: string | null;
        fullName: string;
        province: string;
        district: string;
        ward: string;
        street: string;
        isDefault: boolean;
    }>;
    deleteAddress(userId: string, addressId: string): Promise<{
        message: string;
    }>;
}
