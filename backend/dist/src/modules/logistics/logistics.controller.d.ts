import { LogisticsService } from './logistics.service';
import { CreateLogisticsPartnerDto, UpdateLogisticsPartnerDto, CreateLogisticsOrderDto, UpdateLogisticsOrderDto, CalculateShippingDto } from './dto/logistics.dto';
export declare class LogisticsController {
    private readonly logisticsService;
    constructor(logisticsService: LogisticsService);
    createPartner(req: any, createLogisticsPartnerDto: CreateLogisticsPartnerDto): Promise<{
        user: {
            id: string;
            name: string;
            email: string;
        };
    } & {
        id: string;
        userId: string;
        verified: boolean;
        rating: number | null;
        name: string;
        apiEndpoint: string | null;
        baseRate: number;
    }>;
    findAllPartners(): Promise<({
        user: {
            id: string;
            name: string;
            email: string;
        };
        orders: {
            id: string;
            status: import(".prisma/client").$Enums.LogisticsStatus;
            estimatedDelivery: Date;
            order: {
                id: string;
                status: import(".prisma/client").$Enums.OrderStatus;
                totalAmount: number;
            };
        }[];
    } & {
        id: string;
        userId: string;
        verified: boolean;
        rating: number | null;
        name: string;
        apiEndpoint: string | null;
        baseRate: number;
    })[]>;
    findOnePartner(id: string): Promise<{
        user: {
            id: string;
            name: string;
            email: string;
        };
        orders: {
            id: string;
            status: import(".prisma/client").$Enums.LogisticsStatus;
            estimatedDelivery: Date;
            order: {
                id: string;
                status: import(".prisma/client").$Enums.OrderStatus;
                totalAmount: number;
            };
        }[];
    } & {
        id: string;
        userId: string;
        verified: boolean;
        rating: number | null;
        name: string;
        apiEndpoint: string | null;
        baseRate: number;
    }>;
    updatePartner(id: string, updateLogisticsPartnerDto: UpdateLogisticsPartnerDto, req: any): Promise<{
        user: {
            id: string;
            name: string;
            email: string;
        };
    } & {
        id: string;
        userId: string;
        verified: boolean;
        rating: number | null;
        name: string;
        apiEndpoint: string | null;
        baseRate: number;
    }>;
    deletePartner(id: string): Promise<{
        message: string;
    }>;
    createOrder(createLogisticsOrderDto: CreateLogisticsOrderDto): Promise<{
        logisticsPartner: {
            id: string;
            userId: string;
            verified: boolean;
            rating: number | null;
            name: string;
            apiEndpoint: string | null;
            baseRate: number;
        };
        order: {
            orderItems: {
                id: string;
                sellerId: string | null;
                enterpriseId: string | null;
                price: number;
                productId: string;
                orderId: string;
                variantId: string | null;
                quantity: number;
            }[];
        } & {
            id: string;
            userId: string;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.OrderStatus;
            shippingFee: number;
            paymentId: string | null;
            subtotal: number;
            shopDiscount: number;
            platformDiscount: number;
            freeshipDiscount: number;
            totalDiscount: number;
            totalAmount: number;
        };
    } & {
        id: string;
        rating: number | null;
        updatedAt: Date;
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
    }>;
    findAllOrders(req: any): Promise<({
        logisticsPartner: {
            id: string;
            userId: string;
            verified: boolean;
            rating: number | null;
            name: string;
            apiEndpoint: string | null;
            baseRate: number;
        };
        order: {
            orderItems: {
                id: string;
                sellerId: string | null;
                enterpriseId: string | null;
                price: number;
                productId: string;
                orderId: string;
                variantId: string | null;
                quantity: number;
            }[];
        } & {
            id: string;
            userId: string;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.OrderStatus;
            shippingFee: number;
            paymentId: string | null;
            subtotal: number;
            shopDiscount: number;
            platformDiscount: number;
            freeshipDiscount: number;
            totalDiscount: number;
            totalAmount: number;
        };
    } & {
        id: string;
        rating: number | null;
        updatedAt: Date;
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
    })[]>;
    findOneOrder(id: string): Promise<{
        logisticsPartner: {
            id: string;
            userId: string;
            verified: boolean;
            rating: number | null;
            name: string;
            apiEndpoint: string | null;
            baseRate: number;
        };
        order: {
            orderItems: {
                id: string;
                sellerId: string | null;
                enterpriseId: string | null;
                price: number;
                productId: string;
                orderId: string;
                variantId: string | null;
                quantity: number;
            }[];
        } & {
            id: string;
            userId: string;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.OrderStatus;
            shippingFee: number;
            paymentId: string | null;
            subtotal: number;
            shopDiscount: number;
            platformDiscount: number;
            freeshipDiscount: number;
            totalDiscount: number;
            totalAmount: number;
        };
    } & {
        id: string;
        rating: number | null;
        updatedAt: Date;
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
    }>;
    updateOrderStatus(id: string, updateLogisticsOrderDto: UpdateLogisticsOrderDto): Promise<{
        logisticsPartner: {
            id: string;
            userId: string;
            verified: boolean;
            rating: number | null;
            name: string;
            apiEndpoint: string | null;
            baseRate: number;
        };
        order: {
            orderItems: {
                id: string;
                sellerId: string | null;
                enterpriseId: string | null;
                price: number;
                productId: string;
                orderId: string;
                variantId: string | null;
                quantity: number;
            }[];
        } & {
            id: string;
            userId: string;
            createdAt: Date;
            updatedAt: Date;
            status: import(".prisma/client").$Enums.OrderStatus;
            shippingFee: number;
            paymentId: string | null;
            subtotal: number;
            shopDiscount: number;
            platformDiscount: number;
            freeshipDiscount: number;
            totalDiscount: number;
            totalAmount: number;
        };
    } & {
        id: string;
        rating: number | null;
        updatedAt: Date;
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
    }>;
    calculateShipping(calculateShippingDto: CalculateShippingDto): Promise<{
        cost: number;
        estimatedDays: number;
    }>;
}
