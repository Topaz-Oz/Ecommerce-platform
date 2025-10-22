import { PrismaService } from '../prisma/prisma.service';
import { CreateSellerDto, UpdateSellerDto } from './dto/sellers.dto';
export declare class SellersService {
    private prisma;
    constructor(prisma: PrismaService);
    create(userId: string, createSellerDto: CreateSellerDto): Promise<{
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
    findByUserId(userId: string): Promise<{
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
    update(id: string, updateSellerDto: UpdateSellerDto): Promise<{
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
    updateVerificationStatus(id: string, verified: boolean): Promise<{
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
    delete(id: string): Promise<{
        message: string;
    }>;
}
