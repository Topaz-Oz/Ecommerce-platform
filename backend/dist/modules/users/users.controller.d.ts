import { UsersService } from './users.service';
import { UpdateUserDto, AddAddressDto } from './dto/users.dto';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
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
    update(id: string, updateUserDto: UpdateUserDto, req: any): Promise<{
        name: string;
        email: string;
        role: import(".prisma/client").$Enums.Role;
        id: string;
        createdAt: Date;
    }>;
    addAddress(id: string, addressDto: AddAddressDto, req: any): Promise<{
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
    deleteAddress(id: string, addressId: string, req: any): Promise<{
        message: string;
    }>;
}
