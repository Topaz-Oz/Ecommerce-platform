import { SellersService } from './sellers.service';
import { CreateSellerDto, UpdateSellerDto } from './dto/sellers.dto';
export declare class SellersController {
    private readonly sellersService;
    constructor(sellersService: SellersService);
    create(req: any, createSellerDto: CreateSellerDto): Promise<{
        user: {
            id: string;
            email: string;
            name: string;
            phone: string;
            avatar: string;
        };
    } & {
        id: string;
        rating: number | null;
        verified: boolean;
        userId: string;
        storeName: string;
    }>;
    findAll(): Promise<({
        products: {
            id: string;
            name: string;
            basePrice: number;
            stock: number;
        }[];
        user: {
            id: string;
            email: string;
            name: string;
        };
    } & {
        id: string;
        rating: number | null;
        verified: boolean;
        userId: string;
        storeName: string;
    })[]>;
    findOne(id: string): Promise<{
        products: {
            id: string;
            name: string;
            basePrice: number;
            stock: number;
        }[];
        user: {
            id: string;
            email: string;
            name: string;
        };
    } & {
        id: string;
        rating: number | null;
        verified: boolean;
        userId: string;
        storeName: string;
    }>;
    update(id: string, updateSellerDto: UpdateSellerDto, req: any): Promise<{
        user: {
            id: string;
            email: string;
            name: string;
        };
    } & {
        id: string;
        rating: number | null;
        verified: boolean;
        userId: string;
        storeName: string;
    }>;
    verifyStatus(id: string, verified: boolean, req: any): Promise<{
        user: {
            id: string;
            email: string;
            name: string;
        };
    } & {
        id: string;
        rating: number | null;
        verified: boolean;
        userId: string;
        storeName: string;
    }>;
    remove(id: string, req: any): Promise<{
        message: string;
    }>;
}
