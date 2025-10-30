import { PrismaService } from '../prisma/prisma.service';
import { CreateLogisticsPartnerDto, UpdateLogisticsPartnerDto, CreateLogisticsOrderDto, UpdateLogisticsOrderDto, CalculateShippingDto } from './dto/logistics.dto';
import { Prisma } from '@prisma/client';
export declare class LogisticsService {
    private prisma;
    constructor(prisma: PrismaService);
    createPartner(userId: string, dto: CreateLogisticsPartnerDto): Promise<{
        user: {
            name: string;
            id: string;
            email: string;
        };
    } & {
        name: string;
        id: string;
        verified: boolean;
        userId: string;
        rating: number | null;
        apiEndpoint: string | null;
        baseRate: number;
    }>;
    findAllPartners(): Promise<({
        user: {
            name: string;
            id: string;
            email: string;
        };
        orders: {
            id: string;
            order: {
                id: string;
                status: import(".prisma/client").$Enums.OrderStatus;
                totalAmount: number;
            };
            status: import(".prisma/client").$Enums.LogisticsStatus;
            estimatedDelivery: Date;
        }[];
    } & {
        name: string;
        id: string;
        verified: boolean;
        userId: string;
        rating: number | null;
        apiEndpoint: string | null;
        baseRate: number;
    })[]>;
    findOnePartner(id: string): Promise<{
        user: {
            name: string;
            id: string;
            email: string;
        };
        orders: {
            id: string;
            order: {
                id: string;
                status: import(".prisma/client").$Enums.OrderStatus;
                totalAmount: number;
            };
            status: import(".prisma/client").$Enums.LogisticsStatus;
            estimatedDelivery: Date;
        }[];
    } & {
        name: string;
        id: string;
        verified: boolean;
        userId: string;
        rating: number | null;
        apiEndpoint: string | null;
        baseRate: number;
    }>;
    updatePartner(id: string, dto: UpdateLogisticsPartnerDto): Promise<{
        user: {
            name: string;
            id: string;
            email: string;
        };
    } & {
        name: string;
        id: string;
        verified: boolean;
        userId: string;
        rating: number | null;
        apiEndpoint: string | null;
        baseRate: number;
    }>;
    deletePartner(id: string): Promise<{
        message: string;
    }>;
    createOrder(dto: CreateLogisticsOrderDto): Promise<{
        order: {
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
        };
        logisticsPartner: {
            name: string;
            id: string;
            verified: boolean;
            userId: string;
            rating: number | null;
            apiEndpoint: string | null;
            baseRate: number;
        };
    } & {
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
        pickupLocation: Prisma.JsonValue | null;
        deliveryLocation: Prisma.JsonValue | null;
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
    findAllOrders(partnerId?: string): Promise<({
        order: {
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
        };
        logisticsPartner: {
            name: string;
            id: string;
            verified: boolean;
            userId: string;
            rating: number | null;
            apiEndpoint: string | null;
            baseRate: number;
        };
    } & {
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
        pickupLocation: Prisma.JsonValue | null;
        deliveryLocation: Prisma.JsonValue | null;
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
        order: {
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
        };
        logisticsPartner: {
            name: string;
            id: string;
            verified: boolean;
            userId: string;
            rating: number | null;
            apiEndpoint: string | null;
            baseRate: number;
        };
    } & {
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
        pickupLocation: Prisma.JsonValue | null;
        deliveryLocation: Prisma.JsonValue | null;
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
    updateOrderStatus(id: string, dto: UpdateLogisticsOrderDto): Promise<{
        order: {
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
        };
        logisticsPartner: {
            name: string;
            id: string;
            verified: boolean;
            userId: string;
            rating: number | null;
            apiEndpoint: string | null;
            baseRate: number;
        };
    } & {
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
        pickupLocation: Prisma.JsonValue | null;
        deliveryLocation: Prisma.JsonValue | null;
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
    private generateTrackingCode;
    calculateShipping(dto: CalculateShippingDto): Promise<{
        cost: number;
        estimatedDays: number;
    }>;
}
