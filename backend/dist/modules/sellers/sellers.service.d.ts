import { PrismaService } from '../prisma/prisma.service';
import { CreateSellerDto, UpdateSellerDto } from './dto/sellers.dto';
export declare class SellersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: string, createSellerDto: CreateSellerDto): Promise<{
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
    findByUserId(userId: string): Promise<{
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
    update(id: string, updateSellerDto: UpdateSellerDto): Promise<{
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
    updateVerificationStatus(id: string, verified: boolean): Promise<{
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
    delete(id: string): Promise<{
        message: string;
    }>;
}
