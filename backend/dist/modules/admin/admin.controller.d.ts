import { AdminService } from './admin.service';
import { CreateVoucherDto, UpdateVoucherDto, CreateFlashSaleDto, CreateCampaignDto, SystemStatsDto } from './dto/admin.dto';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    getAllUsers(): Promise<({
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
        logistics: {
            name: string;
            id: string;
            userId: string;
            rating: number | null;
            apiEndpoint: string | null;
            baseRate: number;
        };
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
        orders: {
            id: string;
            createdAt: Date;
            userId: string;
            voucherId: string | null;
            status: import(".prisma/client").$Enums.OrderStatus;
            totalAmount: number;
            paymentId: string | null;
            shippingId: string | null;
        }[];
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
    })[]>;
    getUserById(id: string): Promise<{
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
        logistics: {
            name: string;
            id: string;
            userId: string;
            rating: number | null;
            apiEndpoint: string | null;
            baseRate: number;
        };
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
        orders: ({
            payment: {
                method: import(".prisma/client").$Enums.PaymentMethod;
                id: string;
                createdAt: Date;
                status: import(".prisma/client").$Enums.PaymentStatus;
                orderId: string;
                transactionId: string | null;
            };
            orderItems: {
                id: string;
                price: number;
                productId: string;
                variantId: string | null;
                quantity: number;
                orderId: string;
            }[];
            logisticsOrders: {
                id: string;
                updatedAt: Date;
                status: import(".prisma/client").$Enums.LogisticsStatus;
                orderId: string;
                logisticsPartnerId: string;
                estimatedDelivery: Date | null;
                trackingCode: string;
            }[];
        } & {
            id: string;
            createdAt: Date;
            userId: string;
            voucherId: string | null;
            status: import(".prisma/client").$Enums.OrderStatus;
            totalAmount: number;
            paymentId: string | null;
            shippingId: string | null;
        })[];
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
    verifyEnterprise(id: string, verified: boolean): Promise<{
        message: string;
    }>;
    updateEnterpriseBrandStatus(id: string, officialBrand: boolean): Promise<{
        id: string;
        userId: string;
        verified: boolean;
        rating: number | null;
        companyName: string;
        taxCode: string | null;
        officialBrand: boolean;
    }>;
    updateUserStatus(id: string, active: boolean): Promise<{
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
    getAllSellers(): Promise<({
        user: {
            name: string;
            email: string;
            id: string;
            isVerified: boolean;
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
        storeName: string;
        verified: boolean;
        rating: number | null;
    })[]>;
    verifySeller(id: string, verified: boolean): Promise<{
        message: string;
    }>;
    getAllProducts(): Promise<({
        seller: {
            id: string;
            storeName: string;
            verified: boolean;
        };
        enterprise: {
            id: string;
            verified: boolean;
            companyName: string;
            officialBrand: boolean;
        };
        category: {
            name: string;
            id: string;
            parentId: string | null;
        };
        reviews: {
            id: string;
            createdAt: Date;
            userId: string;
            rating: number;
            comment: string | null;
            productId: string;
        }[];
        variants: {
            id: string;
            stock: number;
            color: string | null;
            size: string | null;
            price: number;
            productId: string;
        }[];
    } & {
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
    })[]>;
    updateProductStatus(id: string, active: boolean): Promise<{
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
    }>;
    getAllOrders(): Promise<({
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
        payment: {
            method: import(".prisma/client").$Enums.PaymentMethod;
            id: string;
            createdAt: Date;
            status: import(".prisma/client").$Enums.PaymentStatus;
            orderId: string;
            transactionId: string | null;
        };
        orderItems: ({
            product: {
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
            };
        } & {
            id: string;
            price: number;
            productId: string;
            variantId: string | null;
            quantity: number;
            orderId: string;
        })[];
        logisticsOrders: {
            id: string;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.LogisticsStatus;
            orderId: string;
            logisticsPartnerId: string;
            estimatedDelivery: Date | null;
            trackingCode: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        voucherId: string | null;
        status: import(".prisma/client").$Enums.OrderStatus;
        totalAmount: number;
        paymentId: string | null;
        shippingId: string | null;
    })[]>;
    createVoucher(createVoucherDto: CreateVoucherDto): Promise<{
        id: string;
        code: string;
        discountType: import(".prisma/client").$Enums.DiscountType;
        discountValue: number;
        minOrderValue: number | null;
        startDate: Date;
        endDate: Date;
        usageLimit: number | null;
        usedCount: number;
    }>;
    updateVoucher(id: string, updateVoucherDto: UpdateVoucherDto): Promise<{
        id: string;
        code: string;
        discountType: import(".prisma/client").$Enums.DiscountType;
        discountValue: number;
        minOrderValue: number | null;
        startDate: Date;
        endDate: Date;
        usageLimit: number | null;
        usedCount: number;
    }>;
    getAllVouchers(): Promise<({
        orders: {
            id: string;
            totalAmount: number;
        }[];
    } & {
        id: string;
        code: string;
        discountType: import(".prisma/client").$Enums.DiscountType;
        discountValue: number;
        minOrderValue: number | null;
        startDate: Date;
        endDate: Date;
        usageLimit: number | null;
        usedCount: number;
    })[]>;
    createFlashSale(createFlashSaleDto: CreateFlashSaleDto): Promise<{
        products: ({
            product: {
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
            };
        } & {
            id: string;
            productId: string;
            quantity: number | null;
            discountPercentage: number;
            soldQuantity: number | null;
            promotionId: string;
        })[];
    } & {
        name: string;
        type: import(".prisma/client").$Enums.PromotionType;
        description: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        startDate: Date;
        endDate: Date;
        discountPercentage: number | null;
    }>;
    getAllFlashSales(): Promise<({
        products: ({
            product: {
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
            };
        } & {
            id: string;
            productId: string;
            quantity: number | null;
            discountPercentage: number;
            soldQuantity: number | null;
            promotionId: string;
        })[];
    } & {
        name: string;
        type: import(".prisma/client").$Enums.PromotionType;
        description: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        startDate: Date;
        endDate: Date;
        discountPercentage: number | null;
    })[]>;
    createCampaign(createCampaignDto: CreateCampaignDto): Promise<{
        categories: ({
            category: {
                name: string;
                id: string;
                parentId: string | null;
            };
        } & {
            id: string;
            categoryId: string;
            promotionId: string;
        })[];
    } & {
        name: string;
        type: import(".prisma/client").$Enums.PromotionType;
        description: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        startDate: Date;
        endDate: Date;
        discountPercentage: number | null;
    }>;
    getAllCampaigns(): Promise<({
        categories: ({
            category: {
                name: string;
                id: string;
                parentId: string | null;
            };
        } & {
            id: string;
            categoryId: string;
            promotionId: string;
        })[];
    } & {
        name: string;
        type: import(".prisma/client").$Enums.PromotionType;
        description: string | null;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        startDate: Date;
        endDate: Date;
        discountPercentage: number | null;
    })[]>;
    getSystemStats(systemStatsDto: SystemStatsDto): Promise<{
        period: {
            startDate: Date;
            endDate: Date;
        };
        metrics: {
            totalUsers: number;
            totalSellers: number;
            totalEnterprises: number;
            totalOrders: number;
            totalRevenue: number;
            totalProducts: number;
        };
        topSellingProducts: (import(".prisma/client").Prisma.PickEnumerable<import(".prisma/client").Prisma.OrderItemGroupByOutputType, "productId"[]> & {
            _sum: {
                quantity: number;
            };
        })[];
        topSellers: {
            id: string;
            name: string;
            email: string;
            storeName: string;
            totalSales: number;
        }[];
    }>;
    createInitialAdmins(): Promise<{
        message: string;
    }>;
}
