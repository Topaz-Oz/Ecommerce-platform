import { LogisticsStatus } from '@prisma/client';
export declare class CreateLogisticsPartnerDto {
    name: string;
    apiEndpoint?: string;
    baseRate: number;
}
export declare class UpdateLogisticsPartnerDto {
    name?: string;
    apiEndpoint?: string;
    baseRate?: number;
    rating?: number;
}
export declare class CreateLogisticsOrderDto {
    orderId: string;
    logisticsPartnerId: string;
    estimatedDelivery?: Date;
}
export declare class UpdateLogisticsOrderDto {
    status: LogisticsStatus;
    estimatedDelivery?: Date;
}
export declare class CalculateShippingDto {
    fromProvince: string;
    toProvince: string;
    weight: number;
    express?: boolean;
}
