import { OrdersService } from './orders.service';
import { CreateOrderDto, UpdateOrderStatusDto } from './dto/orders.dto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    create(req: any, dto: CreateOrderDto): Promise<{
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
    findAll(req: any): Promise<({
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
    findOne(id: string, req: any): Promise<{
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
    updateStatus(id: string, dto: UpdateOrderStatusDto, req: any): Promise<{
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
