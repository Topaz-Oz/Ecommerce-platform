import { PaymentsService } from './payments.service';
import { CreatePaymentDto, VNPayCallbackDto, PayPalCallbackDto } from './dto/payments.dto';
export declare class PaymentsController {
    private readonly paymentsService;
    constructor(paymentsService: PaymentsService);
    create(createPaymentDto: CreatePaymentDto): Promise<any>;
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
}
