import { DiscountType } from '@prisma/client';
export declare class CreateVoucherDto {
    code: string;
    discountType: DiscountType;
    discountValue: number;
    minOrderValue?: number;
    startDate: string;
    endDate: string;
    usageLimit?: number;
}
export declare class UpdateVoucherDto {
    isActive?: boolean;
    usageLimit?: number;
    endDate?: string;
}
export declare class CreateFlashSaleDto {
    name: string;
    startDate: string;
    endDate: string;
    products: FlashSaleProductDto[];
}
export declare class FlashSaleProductDto {
    productId: string;
    discountPercentage: number;
    quantity: number;
}
export declare class CreateCampaignDto {
    name: string;
    description: string;
    startDate: string;
    endDate: string;
    categoryIds: string[];
    discountPercentage: number;
}
export declare class SystemStatsDto {
    startDate: string;
    endDate: string;
}
