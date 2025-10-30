import { ShipperStatus } from '@prisma/client';
export declare class CreateShipperDto {
    email: string;
    password: string;
    name: string;
    phone?: string;
    avatar?: string;
    deliveryRange?: number;
}
export declare class UpdateShipperDto {
    active?: boolean;
    status?: ShipperStatus;
    deliveryRange?: number;
}
export declare class UpdateLocationDto {
    latitude: number;
    longitude: number;
}
export declare class AssignOrderDto {
    orderId: string;
    shipperId: string;
}
