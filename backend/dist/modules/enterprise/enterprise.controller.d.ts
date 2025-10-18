import { EnterpriseService } from './enterprise.service';
import { CreateEnterpriseDto, UpdateEnterpriseDto } from './dto/enterprise.dto';
export declare class EnterpriseController {
    private readonly enterpriseService;
    constructor(enterpriseService: EnterpriseService);
    create(createEnterpriseDto: CreateEnterpriseDto): Promise<{
        enterprise: {
            id: string;
            userId: string;
            verified: boolean;
            rating: number | null;
            companyName: string;
            taxCode: string | null;
            officialBrand: boolean;
        };
    } & {
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
    update(userId: string, updateEnterpriseDto: UpdateEnterpriseDto): Promise<{
        enterprise: {
            id: string;
            userId: string;
            verified: boolean;
            rating: number | null;
            companyName: string;
            taxCode: string | null;
            officialBrand: boolean;
        };
    } & {
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
    findById(id: string): Promise<{
        user: {
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
        };
        products: {
            name: string;
            description: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            categoryId: string;
            sellerId: string | null;
            enterpriseId: string | null;
            basePrice: number;
            stock: number;
            active: boolean;
        }[];
    } & {
        id: string;
        userId: string;
        verified: boolean;
        rating: number | null;
        companyName: string;
        taxCode: string | null;
        officialBrand: boolean;
    }>;
    findByUserId(userId: string): Promise<{
        user: {
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
        };
        products: {
            name: string;
            description: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            categoryId: string;
            sellerId: string | null;
            enterpriseId: string | null;
            basePrice: number;
            stock: number;
            active: boolean;
        }[];
    } & {
        id: string;
        userId: string;
        verified: boolean;
        rating: number | null;
        companyName: string;
        taxCode: string | null;
        officialBrand: boolean;
    }>;
    findAll(): Promise<({
        user: {
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
        };
        products: {
            name: string;
            description: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            categoryId: string;
            sellerId: string | null;
            enterpriseId: string | null;
            basePrice: number;
            stock: number;
            active: boolean;
        }[];
    } & {
        id: string;
        userId: string;
        verified: boolean;
        rating: number | null;
        companyName: string;
        taxCode: string | null;
        officialBrand: boolean;
    })[]>;
}
