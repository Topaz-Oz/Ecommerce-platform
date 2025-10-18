import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto, UpdateUserDto, AddAddressDto } from './dto/users.dto';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        name: string;
        email: string;
        role: import(".prisma/client").$Enums.Role;
        id: string;
        createdAt: Date;
        addresses: {
            id: string;
            phone: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            fullName: string;
            province: string;
            district: string;
            ward: string;
            street: string;
            label: string | null;
            isDefault: boolean;
        }[];
    }[]>;
    findOne(id: string): Promise<{
        seller: {
            id: string;
            userId: string;
            storeName: string;
            verified: boolean;
            rating: number | null;
        };
        enterprise: {
            id: string;
            userId: string;
            verified: boolean;
            rating: number | null;
            companyName: string;
            taxCode: string | null;
            officialBrand: boolean;
        };
        name: string;
        email: string;
        role: import(".prisma/client").$Enums.Role;
        id: string;
        avatar: string;
        phone: string;
        createdAt: Date;
        addresses: {
            id: string;
            phone: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            fullName: string;
            province: string;
            district: string;
            ward: string;
            street: string;
            label: string | null;
            isDefault: boolean;
        }[];
    }>;
    findByEmail(email: string): Promise<{
        name: string;
        email: string;
        password: string;
        role: import(".prisma/client").$Enums.Role;
        id: string;
        avatar: string | null;
        phone: string | null;
        isVerified: boolean;
        verificationToken: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    create(createUserDto: CreateUserDto): Promise<{
        name: string;
        email: string;
        role: import(".prisma/client").$Enums.Role;
        id: string;
        createdAt: Date;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        name: string;
        email: string;
        role: import(".prisma/client").$Enums.Role;
        id: string;
        createdAt: Date;
    }>;
    addAddress(userId: string, addressDto: AddAddressDto): Promise<{
        id: string;
        phone: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        fullName: string;
        province: string;
        district: string;
        ward: string;
        street: string;
        label: string | null;
        isDefault: boolean;
    }>;
    deleteAddress(userId: string, addressId: string): Promise<{
        message: string;
    }>;
}
