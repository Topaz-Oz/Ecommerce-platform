import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto, UpdateOrderStatusDto } from './dto/orders.dto';
export declare class OrdersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: string, dto: CreateOrderDto): Promise<{
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
    }>;
    findAll(userId: string, role: string): Promise<({
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
    })[]>;
    findOne(id: string, userId: string, role: string): Promise<{
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
    }>;
    updateStatus(id: string, dto: UpdateOrderStatusDto, userId: string, role: string): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        voucherId: string | null;
        status: import(".prisma/client").$Enums.OrderStatus;
        totalAmount: number;
        paymentId: string | null;
        shippingId: string | null;
    }>;
}
