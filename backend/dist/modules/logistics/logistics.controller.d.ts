import { LogisticsService } from './logistics.service';
import { CreateLogisticsPartnerDto, UpdateLogisticsPartnerDto, CreateLogisticsOrderDto, UpdateLogisticsOrderDto, CalculateShippingDto } from './dto/logistics.dto';
export declare class LogisticsController {
    private readonly logisticsService;
    constructor(logisticsService: LogisticsService);
    createPartner(req: any, createLogisticsPartnerDto: CreateLogisticsPartnerDto): Promise<{
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
    updatePartner(id: string, updateLogisticsPartnerDto: UpdateLogisticsPartnerDto, req: any): Promise<{
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
    createOrder(createLogisticsOrderDto: CreateLogisticsOrderDto): Promise<{
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
    findAllOrders(req: any): Promise<({
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
    updateOrderStatus(id: string, updateLogisticsOrderDto: UpdateLogisticsOrderDto): Promise<{
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
    calculateShipping(calculateShippingDto: CalculateShippingDto): Promise<{
        cost: number;
        estimatedDays: number;
    }>;
}
