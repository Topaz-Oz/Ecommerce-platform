import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto, UpdateOrderStatusDto } from './dto/orders.dto';
export declare class OrdersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: string, dto: CreateOrderDto): Promise<{
        orderItems: {
            id: string;
            sellerId: string | null;
            enterpriseId: string | null;
            price: number;
            productId: string;
            orderId: string;
            variantId: string | null;
            quantity: number;
        }[];
        appliedVouchers: {
            id: string;
            description: string | null;
            sellerId: string | null;
            enterpriseId: string | null;
            isActive: boolean;
            scope: import(".prisma/client").$Enums.VoucherScope;
            code: string;
            title: string;
            discountType: import(".prisma/client").$Enums.DiscountType;
            discountValue: number;
            maxDiscountValue: number | null;
            minOrderValue: number | null;
            startDate: Date;
            endDate: Date;
            usageLimit: number | null;
            usedCount: number;
        }[];
    } & {
        id: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.OrderStatus;
        shippingFee: number;
        paymentId: string | null;
        subtotal: number;
        shopDiscount: number;
        platformDiscount: number;
        freeshipDiscount: number;
        totalDiscount: number;
        totalAmount: number;
    }>;
    findAll(userId: string, role: string): Promise<({
        orderItems: {
            id: string;
            sellerId: string | null;
            enterpriseId: string | null;
            price: number;
            productId: string;
            orderId: string;
            variantId: string | null;
            quantity: number;
        }[];
        appliedVouchers: {
            id: string;
            description: string | null;
            sellerId: string | null;
            enterpriseId: string | null;
            isActive: boolean;
            scope: import(".prisma/client").$Enums.VoucherScope;
            code: string;
            title: string;
            discountType: import(".prisma/client").$Enums.DiscountType;
            discountValue: number;
            maxDiscountValue: number | null;
            minOrderValue: number | null;
            startDate: Date;
            endDate: Date;
            usageLimit: number | null;
            usedCount: number;
        }[];
    } & {
        id: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.OrderStatus;
        shippingFee: number;
        paymentId: string | null;
        subtotal: number;
        shopDiscount: number;
        platformDiscount: number;
        freeshipDiscount: number;
        totalDiscount: number;
        totalAmount: number;
    })[]>;
    findOne(id: string, userId: string, role: string): Promise<{
        orderItems: {
            id: string;
            sellerId: string | null;
            enterpriseId: string | null;
            price: number;
            productId: string;
            orderId: string;
            variantId: string | null;
            quantity: number;
        }[];
        appliedVouchers: {
            id: string;
            description: string | null;
            sellerId: string | null;
            enterpriseId: string | null;
            isActive: boolean;
            scope: import(".prisma/client").$Enums.VoucherScope;
            code: string;
            title: string;
            discountType: import(".prisma/client").$Enums.DiscountType;
            discountValue: number;
            maxDiscountValue: number | null;
            minOrderValue: number | null;
            startDate: Date;
            endDate: Date;
            usageLimit: number | null;
            usedCount: number;
        }[];
    } & {
        id: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.OrderStatus;
        shippingFee: number;
        paymentId: string | null;
        subtotal: number;
        shopDiscount: number;
        platformDiscount: number;
        freeshipDiscount: number;
        totalDiscount: number;
        totalAmount: number;
    }>;
    updateStatus(id: string, dto: UpdateOrderStatusDto, userId: string, role: string): Promise<{
        id: string;
        userId: string;
        createdAt: Date;
        updatedAt: Date;
        status: import(".prisma/client").$Enums.OrderStatus;
        shippingFee: number;
        paymentId: string | null;
        subtotal: number;
        shopDiscount: number;
        platformDiscount: number;
        freeshipDiscount: number;
        totalDiscount: number;
        totalAmount: number;
    }>;
}
