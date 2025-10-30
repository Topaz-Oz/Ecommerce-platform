import { OrdersService } from './orders.service';
import { CreateOrderDto, UpdateOrderStatusDto } from './dto/orders.dto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    create(req: any, dto: CreateOrderDto): Promise<{
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
        appliedVouchers: {
            description: string | null;
            title: string;
            code: string;
            discountType: import(".prisma/client").$Enums.DiscountType;
            discountValue: number;
            maxDiscountValue: number | null;
            minOrderValue: number | null;
            startDate: Date;
            endDate: Date;
            usageLimit: number | null;
            isActive: boolean;
            id: string;
            sellerId: string | null;
            enterpriseId: string | null;
            scope: import(".prisma/client").$Enums.VoucherScope;
            usedCount: number;
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
    }>;
    findAll(req: any): Promise<({
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
        appliedVouchers: {
            description: string | null;
            title: string;
            code: string;
            discountType: import(".prisma/client").$Enums.DiscountType;
            discountValue: number;
            maxDiscountValue: number | null;
            minOrderValue: number | null;
            startDate: Date;
            endDate: Date;
            usageLimit: number | null;
            isActive: boolean;
            id: string;
            sellerId: string | null;
            enterpriseId: string | null;
            scope: import(".prisma/client").$Enums.VoucherScope;
            usedCount: number;
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
    })[]>;
    findOne(id: string, req: any): Promise<{
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
        appliedVouchers: {
            description: string | null;
            title: string;
            code: string;
            discountType: import(".prisma/client").$Enums.DiscountType;
            discountValue: number;
            maxDiscountValue: number | null;
            minOrderValue: number | null;
            startDate: Date;
            endDate: Date;
            usageLimit: number | null;
            isActive: boolean;
            id: string;
            sellerId: string | null;
            enterpriseId: string | null;
            scope: import(".prisma/client").$Enums.VoucherScope;
            usedCount: number;
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
    }>;
    updateStatus(id: string, dto: UpdateOrderStatusDto, req: any): Promise<{
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
    }>;
}
