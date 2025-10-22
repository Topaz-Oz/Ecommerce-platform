export declare class CreateShipperDto {
    email: string;
    password: string;
    name: string;
    phone?: string;
    avatar?: string;
}
export declare class UpdateShipperDto {
    name?: string;
    phone?: string;
    avatar?: string;
    active?: boolean;
    available?: boolean;
}
export declare class UpdateLocationDto {
    latitude: number;
    longitude: number;
}
export declare class AssignOrderDto {
    orderId: string;
    shipperId: string;
}
