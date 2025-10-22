import { UsersService } from './users.service';
import { UpdateUserDto, AddAddressDto } from './dto/users.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
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
    update(id: string, updateUserDto: UpdateUserDto, req: any): Promise<{
        id: string;
        email: string;
        name: string;
        createdAt: Date;
        role: import(".prisma/client").$Enums.Role;
    }>;
    addAddress(id: string, addressDto: AddAddressDto, req: any): Promise<{
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
    deleteAddress(id: string, addressId: string, req: any): Promise<{
        message: string;
    }>;
}
