import { PrismaService } from '../prisma/prisma.service';
import { CreatePaymentDto, UpdatePaymentDto, VNPayCallbackDto, PayPalCallbackDto } from './dto/payments.dto';
export declare class PaymentsService {
    private prisma;
    constructor(prisma: PrismaService);
    private generateSignature;
    create(dto: CreatePaymentDto): Promise<any>;
    private createVNPayPayment;
    private createPayPalPayment;
    private createCODPayment;
    handleVNPayCallback(params: VNPayCallbackDto): Promise<{
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
        status: import(".prisma/client").$Enums.PaymentStatus;
        createdAt: Date;
        orderId: string;
        method: import(".prisma/client").$Enums.PaymentMethod;
        transactionId: string | null;
    }>;
    handlePayPalCallback(params: PayPalCallbackDto): Promise<{
        message: string;
    }>;
    findAll(): Promise<({
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
        status: import(".prisma/client").$Enums.PaymentStatus;
        createdAt: Date;
        orderId: string;
        method: import(".prisma/client").$Enums.PaymentMethod;
        transactionId: string | null;
    })[]>;
    findOne(id: string): Promise<{
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
        status: import(".prisma/client").$Enums.PaymentStatus;
        createdAt: Date;
        orderId: string;
        method: import(".prisma/client").$Enums.PaymentMethod;
        transactionId: string | null;
    }>;
    findByOrder(orderId: string): Promise<{
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
        status: import(".prisma/client").$Enums.PaymentStatus;
        createdAt: Date;
        orderId: string;
        method: import(".prisma/client").$Enums.PaymentMethod;
        transactionId: string | null;
    }>;
    updatePayment(id: string, dto: UpdatePaymentDto): Promise<{
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
        status: import(".prisma/client").$Enums.PaymentStatus;
        createdAt: Date;
        orderId: string;
        method: import(".prisma/client").$Enums.PaymentMethod;
        transactionId: string | null;
    }>;
}
