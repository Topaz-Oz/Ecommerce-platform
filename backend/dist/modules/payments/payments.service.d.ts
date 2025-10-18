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
    } & {
        method: import(".prisma/client").$Enums.PaymentMethod;
        id: string;
        createdAt: Date;
        status: import(".prisma/client").$Enums.PaymentStatus;
        orderId: string;
        transactionId: string | null;
    }>;
    handlePayPalCallback(params: PayPalCallbackDto): Promise<{
        message: string;
    }>;
    findAll(): Promise<({
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
    } & {
        method: import(".prisma/client").$Enums.PaymentMethod;
        id: string;
        createdAt: Date;
        status: import(".prisma/client").$Enums.PaymentStatus;
        orderId: string;
        transactionId: string | null;
    })[]>;
    findOne(id: string): Promise<{
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
    } & {
        method: import(".prisma/client").$Enums.PaymentMethod;
        id: string;
        createdAt: Date;
        status: import(".prisma/client").$Enums.PaymentStatus;
        orderId: string;
        transactionId: string | null;
    }>;
    findByOrder(orderId: string): Promise<{
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
    } & {
        method: import(".prisma/client").$Enums.PaymentMethod;
        id: string;
        createdAt: Date;
        status: import(".prisma/client").$Enums.PaymentStatus;
        orderId: string;
        transactionId: string | null;
    }>;
    updatePayment(id: string, dto: UpdatePaymentDto): Promise<{
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
    } & {
        method: import(".prisma/client").$Enums.PaymentMethod;
        id: string;
        createdAt: Date;
        status: import(".prisma/client").$Enums.PaymentStatus;
        orderId: string;
        transactionId: string | null;
    }>;
}
