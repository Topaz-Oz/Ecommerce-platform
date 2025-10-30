import { DiscountType } from '@prisma/client';
export declare class CreateVoucherDto {
    code: string;
    title: string;
    description?: string;
    discountType: DiscountType;
    discountValue: number;
    maxDiscountValue?: number;
    minOrderValue?: number;
    startDate: string;
    endDate: string;
    usageLimit?: number;
    isActive?: boolean;
}
