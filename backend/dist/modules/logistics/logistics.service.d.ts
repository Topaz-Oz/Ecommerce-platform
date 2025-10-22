import { PrismaService } from '../prisma/prisma.service';
import { CreateLogisticsPartnerDto, UpdateLogisticsPartnerDto, CreateLogisticsOrderDto, UpdateLogisticsOrderDto, CalculateShippingDto } from './dto/logistics.dto';
import { Prisma } from '@prisma/client';
export declare class LogisticsService {
    private prisma;
    constructor(prisma: PrismaService);
    createPartner(userId: string, dto: CreateLogisticsPartnerDto): Promise<{
        user: {
            id: string;
            email: string;
            name: string;
        };
    } & {
        id: string;
        name: string;
        rating: number | null;
        verified: boolean;
        userId: string;
        apiEndpoint: string | null;
        baseRate: number;
    }>;
    findAllPartners(): Promise<({
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
        user: {
            id: string;
            email: string;
            name: string;
        };
    } & {
        id: string;
        name: string;
        rating: number | null;
        verified: boolean;
        userId: string;
        apiEndpoint: string | null;
        baseRate: number;
    })[]>;
    findOnePartner(id: string): Promise<{
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
        user: {
            id: string;
            email: string;
            name: string;
        };
    } & {
        id: string;
        name: string;
        rating: number | null;
        verified: boolean;
        userId: string;
        apiEndpoint: string | null;
        baseRate: number;
    }>;
    updatePartner(id: string, dto: UpdateLogisticsPartnerDto): Promise<{
        user: {
            id: string;
            email: string;
            name: string;
        };
    } & {
        id: string;
        name: string;
        rating: number | null;
        verified: boolean;
        userId: string;
        apiEndpoint: string | null;
        baseRate: number;
    }>;
    deletePartner(id: string): Promise<{
        message: string;
    }>;
    createOrder(dto: CreateLogisticsOrderDto): Promise<{
        logisticsPartner: {
            id: string;
            name: string;
            rating: number | null;
            verified: boolean;
            userId: string;
            apiEndpoint: string | null;
            baseRate: number;
        };
        order: {
            orderItems: {
                id: string;
                orderId: string;
                productId: string;
                variantId: string | null;
                quantity: number;
                price: number;
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
        };
    } & {
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
        logisticsPartner: {
            id: string;
            name: string;
            rating: number | null;
            verified: boolean;
            userId: string;
            apiEndpoint: string | null;
            baseRate: number;
        };
        order: {
            orderItems: {
                id: string;
                orderId: string;
                productId: string;
                variantId: string | null;
                quantity: number;
                price: number;
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
        };
    } & {
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
        logisticsPartner: {
            id: string;
            name: string;
            rating: number | null;
            verified: boolean;
            userId: string;
            apiEndpoint: string | null;
            baseRate: number;
        };
        order: {
            orderItems: {
                id: string;
                orderId: string;
                productId: string;
                variantId: string | null;
                quantity: number;
                price: number;
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
        };
    } & {
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
        logisticsPartner: {
            id: string;
            name: string;
            rating: number | null;
            verified: boolean;
            userId: string;
            apiEndpoint: string | null;
            baseRate: number;
        };
        order: {
            orderItems: {
                id: string;
                orderId: string;
                productId: string;
                variantId: string | null;
                quantity: number;
                price: number;
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
        };
    } & {
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
