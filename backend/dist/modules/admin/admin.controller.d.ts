import { AdminService } from './admin.service';
import { CreateVoucherDto, UpdateVoucherDto, CreateFlashSaleDto, CreateCampaignDto, SystemStatsDto } from './dto/admin.dto';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    getAllUsers(): Promise<({
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
        logistics: {
            id: string;
            name: string;
            rating: number | null;
            verified: boolean;
            userId: string;
            apiEndpoint: string | null;
            baseRate: number;
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
        orders: {
            id: string;
            status: import(".prisma/client").$Enums.OrderStatus;
            createdAt: Date;
            userId: string;
            totalAmount: number;
            paymentId: string | null;
            shippingId: string | null;
            voucherId: string | null;
        }[];
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
    })[]>;
    getUserById(id: string): Promise<{
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
        logistics: {
            id: string;
            name: string;
            rating: number | null;
            verified: boolean;
            userId: string;
            apiEndpoint: string | null;
            baseRate: number;
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
        orders: ({
            orderItems: {
                id: string;
                orderId: string;
                productId: string;
                variantId: string | null;
                quantity: number;
                price: number;
            }[];
            payment: {
                id: string;
                status: import(".prisma/client").$Enums.PaymentStatus;
                createdAt: Date;
                orderId: string;
                method: import(".prisma/client").$Enums.PaymentMethod;
                transactionId: string | null;
            };
            logisticsOrders: {
                id: string;
                logisticsPartnerId: string;
                status: import(".prisma/client").$Enums.LogisticsStatus;
                rating: number | null;
                updatedAt: Date;
                orderId: string;
                shipperId: string | null;
                trackingCode: string;
                pickupAddress: string;
                deliveryAddress: string;
                pickupLocation: import("@prisma/client/runtime/library").JsonValue | null;
                deliveryLocation: import("@prisma/client/runtime/library").JsonValue | null;
                distance: number | null;
                estimatedTime: number | null;
                estimatedDelivery: Date | null;
                pickupTime: Date | null;
                deliveredTime: Date | null;
                notes: string | null;
                deliveryAttempts: number;
                customerSignature: string | null;
                proofOfDelivery: string[];
                cancelReason: string | null;
                feedback: string | null;
            }[];
        } & {
            id: string;
            status: import(".prisma/client").$Enums.OrderStatus;
            createdAt: Date;
            userId: string;
            totalAmount: number;
            paymentId: string | null;
            shippingId: string | null;
            voucherId: string | null;
        })[];
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
    verifyEnterprise(id: string, verified: boolean): Promise<{
        message: string;
    }>;
    updateEnterpriseBrandStatus(id: string, officialBrand: boolean): Promise<{
        id: string;
        rating: number | null;
        companyName: string;
        taxCode: string | null;
        verified: boolean;
        officialBrand: boolean;
        userId: string;
    }>;
    updateUserStatus(id: string, active: boolean): Promise<{
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
    getAllSellers(): Promise<({
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
            name: string;
            isVerified: boolean;
        };
    } & {
        id: string;
        rating: number | null;
        verified: boolean;
        userId: string;
        storeName: string;
    })[]>;
    verifySeller(id: string, verified: boolean): Promise<{
        message: string;
    }>;
    getAllProducts(): Promise<({
        seller: {
            id: string;
            verified: boolean;
            storeName: string;
        };
        enterprise: {
            id: string;
            companyName: string;
            verified: boolean;
            officialBrand: boolean;
        };
        reviews: {
            id: string;
            rating: number;
            createdAt: Date;
            userId: string;
            productId: string;
            comment: string | null;
        }[];
        category: {
            id: string;
            name: string;
            parentId: string | null;
        };
        variants: {
            id: string;
            stock: number;
            productId: string;
            price: number;
            color: string | null;
            size: string | null;
        }[];
    } & {
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
    })[]>;
    updateProductStatus(id: string, active: boolean): Promise<{
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
    }>;
    getAllOrders(): Promise<({
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
        orderItems: ({
            product: {
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
            };
        } & {
            id: string;
            orderId: string;
            productId: string;
            variantId: string | null;
            quantity: number;
            price: number;
        })[];
        payment: {
            id: string;
            status: import(".prisma/client").$Enums.PaymentStatus;
            createdAt: Date;
            orderId: string;
            method: import(".prisma/client").$Enums.PaymentMethod;
            transactionId: string | null;
        };
        logisticsOrders: {
            id: string;
            logisticsPartnerId: string;
            status: import(".prisma/client").$Enums.LogisticsStatus;
            rating: number | null;
            updatedAt: Date;
            orderId: string;
            shipperId: string | null;
            trackingCode: string;
            pickupAddress: string;
            deliveryAddress: string;
            pickupLocation: import("@prisma/client/runtime/library").JsonValue | null;
            deliveryLocation: import("@prisma/client/runtime/library").JsonValue | null;
            distance: number | null;
            estimatedTime: number | null;
            estimatedDelivery: Date | null;
            pickupTime: Date | null;
            deliveredTime: Date | null;
            notes: string | null;
            deliveryAttempts: number;
            customerSignature: string | null;
            proofOfDelivery: string[];
            cancelReason: string | null;
            feedback: string | null;
        }[];
    } & {
        id: string;
        status: import(".prisma/client").$Enums.OrderStatus;
        createdAt: Date;
        userId: string;
        totalAmount: number;
        paymentId: string | null;
        shippingId: string | null;
        voucherId: string | null;
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
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        startDate: Date;
        endDate: Date;
        type: import(".prisma/client").$Enums.PromotionType;
        discountPercentage: number | null;
    }>;
    getAllFlashSales(): Promise<({
        products: ({
            product: {
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
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        startDate: Date;
        endDate: Date;
        type: import(".prisma/client").$Enums.PromotionType;
        discountPercentage: number | null;
    })[]>;
    createCampaign(createCampaignDto: CreateCampaignDto): Promise<{
        categories: ({
            category: {
                id: string;
                name: string;
                parentId: string | null;
            };
        } & {
            id: string;
            categoryId: string;
            promotionId: string;
        })[];
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        startDate: Date;
        endDate: Date;
        type: import(".prisma/client").$Enums.PromotionType;
        discountPercentage: number | null;
    }>;
    getAllCampaigns(): Promise<({
        categories: ({
            category: {
                id: string;
                name: string;
                parentId: string | null;
            };
        } & {
            id: string;
            categoryId: string;
            promotionId: string;
        })[];
    } & {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        startDate: Date;
        endDate: Date;
        type: import(".prisma/client").$Enums.PromotionType;
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
