import { CartItemDto } from './cart-item.dto';
export declare class ApplyVoucherDto {
    items: CartItemDto[];
    shippingFee: number;
    shopVoucherId?: string;
    platformVoucherId?: string;
    freeShipVoucherId?: string;
}
