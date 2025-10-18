export declare class CreateOrderItemDto {
    productId: string;
    variantId?: string;
    quantity: number;
    price: number;
}
export declare class CreateOrderDto {
    items: CreateOrderItemDto[];
    voucherId?: string;
    addressId?: string;
    paymentMethod?: string;
}
export declare class UpdateOrderStatusDto {
    status: string;
}
