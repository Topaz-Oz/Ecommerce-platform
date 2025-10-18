import { PrismaService } from '../prisma/prisma.service';
import { CreateLogisticsPartnerDto, UpdateLogisticsPartnerDto, CreateLogisticsOrderDto, UpdateLogisticsOrderDto, CalculateShippingDto } from './dto/logistics.dto';
export declare class LogisticsService {
    private prisma;
    constructor(prisma: PrismaService);
    createPartner(userId: string, dto: CreateLogisticsPartnerDto): Promise<{
        user: {
            name: string;
            email: string;
            id: string;
        };
    } & {
        name: string;
        id: string;
        userId: string;
        rating: number | null;
        apiEndpoint: string | null;
        baseRate: number;
    }>;
    findAllPartners(): Promise<({
        user: {
            name: string;
            email: string;
            id: string;
        };
        orders: {
            order: {
                id: string;
                status: import(".prisma/client").$Enums.OrderStatus;
                totalAmount: number;
            };
            id: string;
            status: import(".prisma/client").$Enums.LogisticsStatus;
            estimatedDelivery: Date;
        }[];
    } & {
        name: string;
        id: string;
        userId: string;
        rating: number | null;
        apiEndpoint: string | null;
        baseRate: number;
    })[]>;
    findOnePartner(id: string): Promise<{
        user: {
            name: string;
            email: string;
            id: string;
        };
        orders: {
            order: {
                id: string;
                status: import(".prisma/client").$Enums.OrderStatus;
                totalAmount: number;
            };
            id: string;
            status: import(".prisma/client").$Enums.LogisticsStatus;
            estimatedDelivery: Date;
        }[];
    } & {
        name: string;
        id: string;
        userId: string;
        rating: number | null;
        apiEndpoint: string | null;
        baseRate: number;
    }>;
    updatePartner(id: string, dto: UpdateLogisticsPartnerDto): Promise<{
        user: {
            name: string;
            email: string;
            id: string;
        };
    } & {
        name: string;
        id: string;
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
                price: number;
                productId: string;
                variantId: string | null;
                quantity: number;
                orderId: string;
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
        };
        logisticsPartner: {
            name: string;
            id: string;
            userId: string;
            rating: number | null;
            apiEndpoint: string | null;
            baseRate: number;
        };
    } & {
        id: string;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.LogisticsStatus;
        orderId: string;
        logisticsPartnerId: string;
        estimatedDelivery: Date | null;
        trackingCode: string;
    }>;
    findAllOrders(partnerId?: string): Promise<({
        order: {
            orderItems: {
                id: string;
                price: number;
                productId: string;
                variantId: string | null;
                quantity: number;
                orderId: string;
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
        };
        logisticsPartner: {
            name: string;
            id: string;
            userId: string;
            rating: number | null;
            apiEndpoint: string | null;
            baseRate: number;
        };
    } & {
        id: string;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.LogisticsStatus;
        orderId: string;
        logisticsPartnerId: string;
        estimatedDelivery: Date | null;
        trackingCode: string;
    })[]>;
    findOneOrder(id: string): Promise<{
        order: {
            orderItems: {
                id: string;
                price: number;
                productId: string;
                variantId: string | null;
                quantity: number;
                orderId: string;
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
        };
        logisticsPartner: {
            name: string;
            id: string;
            userId: string;
            rating: number | null;
            apiEndpoint: string | null;
            baseRate: number;
        };
    } & {
        id: string;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.LogisticsStatus;
        orderId: string;
        logisticsPartnerId: string;
        estimatedDelivery: Date | null;
        trackingCode: string;
    }>;
    updateOrderStatus(id: string, dto: UpdateLogisticsOrderDto): Promise<{
        order: {
            orderItems: {
                id: string;
                price: number;
                productId: string;
                variantId: string | null;
                quantity: number;
                orderId: string;
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
        };
        logisticsPartner: {
            name: string;
            id: string;
            userId: string;
            rating: number | null;
            apiEndpoint: string | null;
            baseRate: number;
        };
    } & {
        id: string;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.LogisticsStatus;
        orderId: string;
        logisticsPartnerId: string;
        estimatedDelivery: Date | null;
        trackingCode: string;
    }>;
    private generateTrackingCode;
    calculateShipping(dto: CalculateShippingDto): Promise<{
        cost: number;
        estimatedDays: number;
    }>;
}
