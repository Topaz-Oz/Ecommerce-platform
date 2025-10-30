import { PaymentMethod, PaymentStatus } from '@prisma/client';
export declare class CreatePaymentDto {
    orderId: string;
    method: PaymentMethod;
}
export declare class UpdatePaymentDto {
    status: PaymentStatus;
    transactionId?: string;
}
export declare class VNPayCallbackDto {
    vnp_TransactionNo: string;
    vnp_ResponseCode: string;
    vnp_Amount: string;
    vnp_OrderInfo: string;
}
export declare class PayPalCallbackDto {
    paymentId: string;
    PayerID: string;
    token: string;
}
