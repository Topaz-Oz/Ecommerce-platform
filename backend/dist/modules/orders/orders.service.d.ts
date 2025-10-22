import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto, UpdateOrderStatusDto } from './dto/orders.dto';
export declare class OrdersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: string, dto: CreateOrderDto): Promise<{
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
    }>;
    findAll(userId: string, role: string): Promise<({
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
    })[]>;
    findOne(id: string, userId: string, role: string): Promise<{
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
    }>;
    updateStatus(id: string, dto: UpdateOrderStatusDto, userId: string, role: string): Promise<{
        id: string;
        status: import(".prisma/client").$Enums.OrderStatus;
        createdAt: Date;
        userId: string;
        totalAmount: number;
        paymentId: string | null;
        shippingId: string | null;
        voucherId: string | null;
    }>;
}
