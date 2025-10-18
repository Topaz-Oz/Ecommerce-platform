import { SellersService } from './sellers.service';
import { CreateSellerDto, UpdateSellerDto } from './dto/sellers.dto';
export declare class SellersController {
    private readonly sellersService;
    constructor(sellersService: SellersService);
    create(req: any, createSellerDto: CreateSellerDto): Promise<{
        user: {
            name: string;
            email: string;
            id: string;
            avatar: string;
            phone: string;
        };
    } & {
        id: string;
        userId: string;
        storeName: string;
        verified: boolean;
        rating: number | null;
    }>;
    findAll(): Promise<({
        user: {
            name: string;
            email: string;
            id: string;
        };
        products: {
            name: string;
            id: string;
            basePrice: number;
            stock: number;
        }[];
    } & {
        id: string;
        userId: string;
        storeName: string;
        verified: boolean;
        rating: number | null;
    })[]>;
    findOne(id: string): Promise<{
        user: {
            name: string;
            email: string;
            id: string;
        };
        products: {
            name: string;
            id: string;
            basePrice: number;
            stock: number;
        }[];
    } & {
        id: string;
        userId: string;
        storeName: string;
        verified: boolean;
        rating: number | null;
    }>;
    update(id: string, updateSellerDto: UpdateSellerDto, req: any): Promise<{
        user: {
            name: string;
            email: string;
            id: string;
        };
    } & {
        id: string;
        userId: string;
        storeName: string;
        verified: boolean;
        rating: number | null;
    }>;
    verifyStatus(id: string, verified: boolean, req: any): Promise<{
        user: {
            name: string;
            email: string;
            id: string;
        };
    } & {
        id: string;
        userId: string;
        storeName: string;
        verified: boolean;
        rating: number | null;
    }>;
    remove(id: string, req: any): Promise<{
        message: string;
    }>;
}
