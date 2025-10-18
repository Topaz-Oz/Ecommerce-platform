import { OrdersService } from './orders.service';
import { CreateOrderDto, UpdateOrderStatusDto } from './dto/orders.dto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    create(req: any, dto: CreateOrderDto): Promise<{
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
    findAll(req: any): Promise<({
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
    findOne(id: string, req: any): Promise<{
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
    updateStatus(id: string, dto: UpdateOrderStatusDto, req: any): Promise<{
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
