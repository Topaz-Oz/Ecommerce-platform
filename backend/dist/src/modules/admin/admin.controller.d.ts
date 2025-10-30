import { AdminService } from './admin.service';
import { CreateVoucherDto, UpdateVoucherDto, CreateFlashSaleDto, CreateCampaignDto, SystemStatsDto } from './dto/admin.dto';
export declare class AdminController {
    private readonly adminService;
    constructor(adminService: AdminService);
    getAllUsers(): Promise<({
        enterprise: {
            id: string;
            verified: boolean;
            officialBrand: boolean;
            userId: string;
            companyName: string;
            taxCode: string | null;
            rating: number | null;
            logoUrl: string | null;
            businessLicenseUrl: string | null;
            brandRegistrationUrl: string | null;
            taxDocumentUrl: string | null;
        };
        logistics: {
            name: string;
            id: string;
            verified: boolean;
            userId: string;
            rating: number | null;
            apiEndpoint: string | null;
            baseRate: number;
        };
        seller: {
            id: string;
            verified: boolean;
            userId: string;
            rating: number | null;
            logoUrl: string | null;
            storeName: string;
            businessDocumentUrl: string | null;
            identityDocumentUrl: string | null;
            addressDocumentUrl: string | null;
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
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            status: import(".prisma/client").$Enums.OrderStatus;
            paymentId: string | null;
            subtotal: number;
            shippingFee: number;
            shopDiscount: number;
            platformDiscount: number;
            freeshipDiscount: number;
            totalDiscount: number;
            totalAmount: number;
        }[];
    } & {
        name: string;
        isActive: boolean;
        id: string;
        email: string;
        password: string;
        avatar: string | null;
        phone: string | null;
        role: import(".prisma/client").$Enums.Role;
        isVerified: boolean;
        verificationToken: string | null;
        createdAt: Date;
        updatedAt: Date;
    })[]>;
    getUserById(id: string): Promise<{
        enterprise: {
            id: string;
            verified: boolean;
            officialBrand: boolean;
            userId: string;
            companyName: string;
            taxCode: string | null;
            rating: number | null;
            logoUrl: string | null;
            businessLicenseUrl: string | null;
            brandRegistrationUrl: string | null;
            taxDocumentUrl: string | null;
        };
        logistics: {
            name: string;
            id: string;
            verified: boolean;
            userId: string;
            rating: number | null;
            apiEndpoint: string | null;
            baseRate: number;
        };
        seller: {
            id: string;
            verified: boolean;
            userId: string;
            rating: number | null;
            logoUrl: string | null;
            storeName: string;
            businessDocumentUrl: string | null;
            identityDocumentUrl: string | null;
            addressDocumentUrl: string | null;
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
                sellerId: string | null;
                enterpriseId: string | null;
                quantity: number;
                productId: string;
                orderId: string;
                variantId: string | null;
                price: number;
            }[];
            payment: {
                id: string;
                createdAt: Date;
                status: import(".prisma/client").$Enums.PaymentStatus;
                orderId: string;
                method: import(".prisma/client").$Enums.PaymentMethod;
                transactionId: string | null;
                amount: number;
            };
            logisticsOrders: {
                id: string;
                updatedAt: Date;
                rating: number | null;
                sellerId: string | null;
                enterpriseId: string | null;
                status: import(".prisma/client").$Enums.LogisticsStatus;
                logisticsPartnerId: string;
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
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            status: import(".prisma/client").$Enums.OrderStatus;
            paymentId: string | null;
            subtotal: number;
            shippingFee: number;
            shopDiscount: number;
            platformDiscount: number;
            freeshipDiscount: number;
            totalDiscount: number;
            totalAmount: number;
        })[];
    } & {
        name: string;
        isActive: boolean;
        id: string;
        email: string;
        password: string;
        avatar: string | null;
        phone: string | null;
        role: import(".prisma/client").$Enums.Role;
        isVerified: boolean;
        verificationToken: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    verifyEnterprise(id: string, verified: boolean): Promise<{
        message: string;
    }>;
    updateEnterpriseBrandStatus(id: string, officialBrand: boolean): Promise<{
        id: string;
        verified: boolean;
        officialBrand: boolean;
        userId: string;
        companyName: string;
        taxCode: string | null;
        rating: number | null;
        logoUrl: string | null;
        businessLicenseUrl: string | null;
        brandRegistrationUrl: string | null;
        taxDocumentUrl: string | null;
    }>;
    updateUserStatus(id: string, active: boolean): Promise<{
        name: string;
        isActive: boolean;
        id: string;
        email: string;
        password: string;
        avatar: string | null;
        phone: string | null;
        role: import(".prisma/client").$Enums.Role;
        isVerified: boolean;
        verificationToken: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getAllSellers(): Promise<({
        products: {
            name: string;
            description: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            active: boolean;
            categoryId: string;
            sellerId: string | null;
            enterpriseId: string | null;
            images: string[];
        }[];
        user: {
            name: string;
            id: string;
            email: string;
            isVerified: boolean;
        };
    } & {
        id: string;
        verified: boolean;
        userId: string;
        rating: number | null;
        logoUrl: string | null;
        storeName: string;
        businessDocumentUrl: string | null;
        identityDocumentUrl: string | null;
        addressDocumentUrl: string | null;
    })[]>;
    verifySeller(id: string, verified: boolean): Promise<{
        message: string;
    }>;
    getAllProducts(): Promise<({
        enterprise: {
            id: string;
            verified: boolean;
            officialBrand: boolean;
            companyName: string;
        };
        seller: {
            id: string;
            verified: boolean;
            storeName: string;
        };
        reviews: {
            id: string;
            createdAt: Date;
            userId: string;
            rating: number;
            productId: string;
            comment: string | null;
        }[];
        category: {
            name: string;
            id: string;
            parentId: string | null;
        };
        variants: {
            id: string;
            productId: string;
            price: number;
            color: string | null;
            size: string | null;
            stock: number;
            sku: string | null;
        }[];
    } & {
        name: string;
        description: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        active: boolean;
        categoryId: string;
        sellerId: string | null;
        enterpriseId: string | null;
        images: string[];
    })[]>;
    updateProductStatus(id: string, active: boolean): Promise<{
        name: string;
        description: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        active: boolean;
        categoryId: string;
        sellerId: string | null;
        enterpriseId: string | null;
        images: string[];
    }>;
    getAllOrders(): Promise<({
        user: {
            name: string;
            isActive: boolean;
            id: string;
            email: string;
            password: string;
            avatar: string | null;
            phone: string | null;
            role: import(".prisma/client").$Enums.Role;
            isVerified: boolean;
            verificationToken: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
        orderItems: ({
            product: {
                name: string;
                description: string;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                active: boolean;
                categoryId: string;
                sellerId: string | null;
                enterpriseId: string | null;
                images: string[];
            };
        } & {
            id: string;
            sellerId: string | null;
            enterpriseId: string | null;
            quantity: number;
            productId: string;
            orderId: string;
            variantId: string | null;
            price: number;
        })[];
        payment: {
            id: string;
            createdAt: Date;
            status: import(".prisma/client").$Enums.PaymentStatus;
            orderId: string;
            method: import(".prisma/client").$Enums.PaymentMethod;
            transactionId: string | null;
            amount: number;
        };
        logisticsOrders: {
            id: string;
            updatedAt: Date;
            rating: number | null;
            sellerId: string | null;
            enterpriseId: string | null;
            status: import(".prisma/client").$Enums.LogisticsStatus;
            logisticsPartnerId: string;
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
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        status: import(".prisma/client").$Enums.OrderStatus;
        paymentId: string | null;
        subtotal: number;
        shippingFee: number;
        shopDiscount: number;
        platformDiscount: number;
        freeshipDiscount: number;
        totalDiscount: number;
        totalAmount: number;
    })[]>;
    createVoucher(createVoucherDto: CreateVoucherDto): Promise<{
        description: string | null;
        title: string;
        code: string;
        discountType: import(".prisma/client").$Enums.DiscountType;
        discountValue: number;
        maxDiscountValue: number | null;
        minOrderValue: number | null;
        startDate: Date;
        endDate: Date;
        usageLimit: number | null;
        isActive: boolean;
        id: string;
        sellerId: string | null;
        enterpriseId: string | null;
        scope: import(".prisma/client").$Enums.VoucherScope;
        usedCount: number;
    }>;
    updateVoucher(id: string, updateVoucherDto: UpdateVoucherDto): Promise<{
        description: string | null;
        title: string;
        code: string;
        discountType: import(".prisma/client").$Enums.DiscountType;
        discountValue: number;
        maxDiscountValue: number | null;
        minOrderValue: number | null;
        startDate: Date;
        endDate: Date;
        usageLimit: number | null;
        isActive: boolean;
        id: string;
        sellerId: string | null;
        enterpriseId: string | null;
        scope: import(".prisma/client").$Enums.VoucherScope;
        usedCount: number;
    }>;
    getAllVouchers(): Promise<({
        orders: {
            id: string;
            totalAmount: number;
        }[];
    } & {
        description: string | null;
        title: string;
        code: string;
        discountType: import(".prisma/client").$Enums.DiscountType;
        discountValue: number;
        maxDiscountValue: number | null;
        minOrderValue: number | null;
        startDate: Date;
        endDate: Date;
        usageLimit: number | null;
        isActive: boolean;
        id: string;
        sellerId: string | null;
        enterpriseId: string | null;
        scope: import(".prisma/client").$Enums.VoucherScope;
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
                active: boolean;
                categoryId: string;
                sellerId: string | null;
                enterpriseId: string | null;
                images: string[];
            };
        } & {
            id: string;
            discountPercentage: number;
            quantity: number | null;
            soldQuantity: number | null;
            productId: string;
            promotionId: string;
        })[];
    } & {
        name: string;
        type: import(".prisma/client").$Enums.PromotionType;
        description: string | null;
        startDate: Date;
        endDate: Date;
        id: string;
        createdAt: Date;
        updatedAt: Date;
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
                active: boolean;
                categoryId: string;
                sellerId: string | null;
                enterpriseId: string | null;
                images: string[];
            };
        } & {
            id: string;
            discountPercentage: number;
            quantity: number | null;
            soldQuantity: number | null;
            productId: string;
            promotionId: string;
        })[];
    } & {
        name: string;
        type: import(".prisma/client").$Enums.PromotionType;
        description: string | null;
        startDate: Date;
        endDate: Date;
        id: string;
        createdAt: Date;
        updatedAt: Date;
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
        startDate: Date;
        endDate: Date;
        id: string;
        createdAt: Date;
        updatedAt: Date;
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
        startDate: Date;
        endDate: Date;
        id: string;
        createdAt: Date;
        updatedAt: Date;
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
