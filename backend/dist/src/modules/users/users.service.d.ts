import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto, UpdateUserDto, AddAddressDto } from './dto/users.dto';
export declare class UsersService {
    private prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        email: string;
        role: import(".prisma/client").$Enums.Role;
        addresses: {
            id: string;
            userId: string;
            createdAt: Date;
            updatedAt: Date;
            phone: string;
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
        name: string;
        seller: {
            id: string;
            userId: string;
            storeName: string;
            verified: boolean;
            rating: number | null;
            logoUrl: string | null;
            businessDocumentUrl: string | null;
            identityDocumentUrl: string | null;
            addressDocumentUrl: string | null;
        };
        enterprise: {
            id: string;
            userId: string;
            verified: boolean;
            rating: number | null;
            logoUrl: string | null;
            companyName: string;
            taxCode: string | null;
            officialBrand: boolean;
            businessLicenseUrl: string | null;
            brandRegistrationUrl: string | null;
            taxDocumentUrl: string | null;
        };
        createdAt: Date;
        email: string;
        avatar: string;
        phone: string;
        role: import(".prisma/client").$Enums.Role;
        addresses: {
            id: string;
            userId: string;
            createdAt: Date;
            updatedAt: Date;
            phone: string;
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
        name: string;
        createdAt: Date;
        updatedAt: Date;
        email: string;
        password: string;
        avatar: string | null;
        phone: string | null;
        role: import(".prisma/client").$Enums.Role;
        isVerified: boolean;
        verificationToken: string | null;
        isActive: boolean;
    }>;
    create(createUserDto: CreateUserDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        email: string;
        role: import(".prisma/client").$Enums.Role;
    }>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        email: string;
        role: import(".prisma/client").$Enums.Role;
    }>;
    addAddress(userId: string, addressDto: AddAddressDto): Promise<{
        id: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
        phone: string;
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
