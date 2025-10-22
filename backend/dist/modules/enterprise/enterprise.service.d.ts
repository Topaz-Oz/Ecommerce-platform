import { PrismaService } from '@modules/prisma/prisma.service';
export declare class EnterpriseService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: {
        email: string;
        password: string;
        name: string;
        phone?: string;
        avatar?: string;
        companyName: string;
        taxCode?: string;
    }): Promise<{
        enterprise: {
            id: string;
            rating: number | null;
            companyName: string;
            taxCode: string | null;
            verified: boolean;
            officialBrand: boolean;
            userId: string;
        };
    } & {
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
    update(userId: string, data: {
        name?: string;
        phone?: string;
        avatar?: string;
        companyName?: string;
        taxCode?: string;
    }): Promise<{
        enterprise: {
            id: string;
            rating: number | null;
            companyName: string;
            taxCode: string | null;
            verified: boolean;
            officialBrand: boolean;
            userId: string;
        };
    } & {
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
    findById(id: string): Promise<{
        products: {
            id: string;
            name: string;
            active: boolean;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            categoryId: string;
            sellerId: string | null;
            enterpriseId: string | null;
            basePrice: number;
            stock: number;
        }[];
        user: {
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
        };
    } & {
        id: string;
        rating: number | null;
        companyName: string;
        taxCode: string | null;
        verified: boolean;
        officialBrand: boolean;
        userId: string;
    }>;
    findByUserId(userId: string): Promise<{
        products: {
            id: string;
            name: string;
            active: boolean;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            categoryId: string;
            sellerId: string | null;
            enterpriseId: string | null;
            basePrice: number;
            stock: number;
        }[];
        user: {
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
        };
    } & {
        id: string;
        rating: number | null;
        companyName: string;
        taxCode: string | null;
        verified: boolean;
        officialBrand: boolean;
        userId: string;
    }>;
    findAll(): Promise<({
        products: {
            id: string;
            name: string;
            active: boolean;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            categoryId: string;
            sellerId: string | null;
            enterpriseId: string | null;
            basePrice: number;
            stock: number;
        }[];
        user: {
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
        };
    } & {
        id: string;
        rating: number | null;
        companyName: string;
        taxCode: string | null;
        verified: boolean;
        officialBrand: boolean;
        userId: string;
    })[]>;
}
