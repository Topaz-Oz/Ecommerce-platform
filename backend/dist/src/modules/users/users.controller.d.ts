import { UsersService } from './users.service';
import { UpdateUserDto, AddAddressDto } from './dto/users.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
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
    update(id: string, updateUserDto: UpdateUserDto, req: any): Promise<{
        id: string;
        name: string;
        createdAt: Date;
        email: string;
        role: import(".prisma/client").$Enums.Role;
    }>;
    addAddress(id: string, addressDto: AddAddressDto, req: any): Promise<{
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
    deleteAddress(id: string, addressId: string, req: any): Promise<{
        message: string;
    }>;
}
