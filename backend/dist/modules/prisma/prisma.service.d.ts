import { OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient, Prisma, LogisticsStatus, ShipperStatus } from '@prisma/client';
export declare class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    private readonly logger;
    constructor();
    onModuleInit(): Promise<void>;
    onModuleDestroy(): Promise<void>;
    private registerSoftDeleteMiddleware;
    findAvailableShippers(logisticsPartnerId: string, pickupLocation: {
        latitude: number;
        longitude: number;
    }, deliveryRange?: number): Promise<{
        id: string;
        email: string;
        password: string;
        name: string;
        phone: string | null;
        avatar: string | null;
        logisticsPartnerId: string;
        active: boolean;
        currentLocation: Prisma.JsonValue | null;
        status: import(".prisma/client").$Enums.ShipperStatus;
        rating: number | null;
        totalDeliveries: number;
        totalRatings: number;
        deliveryRange: number;
        deliveryHistory: Prisma.JsonValue[];
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    updateShipperStatus(shipperId: string, status: ShipperStatus): Promise<{
        id: string;
        email: string;
        password: string;
        name: string;
        phone: string | null;
        avatar: string | null;
        logisticsPartnerId: string;
        active: boolean;
        currentLocation: Prisma.JsonValue | null;
        status: import(".prisma/client").$Enums.ShipperStatus;
        rating: number | null;
        totalDeliveries: number;
        totalRatings: number;
        deliveryRange: number;
        deliveryHistory: Prisma.JsonValue[];
        createdAt: Date;
        updatedAt: Date;
    }>;
    updateOrderStatus(orderId: string, status: LogisticsStatus, data?: Prisma.LogisticsOrderUpdateInput): Promise<{
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
    calculateDeliveryStats(shipperId: string): Promise<{
        totalDeliveries: number;
        averageRating: number;
    }>;
}
