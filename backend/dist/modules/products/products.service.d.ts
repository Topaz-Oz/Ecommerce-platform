import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto, UpdateProductDto, CreateCategoryDto, UpdateCategoryDto, CreateReviewDto } from './dto/products.dto';
export declare class ProductsService {
    private prisma;
    constructor(prisma: PrismaService);
    findSellerByUserId(userId: string): Promise<{
        id: string;
        rating: number | null;
        verified: boolean;
        userId: string;
        storeName: string;
    }>;
    findEnterpriseByUserId(userId: string): Promise<{
        id: string;
        rating: number | null;
        companyName: string;
        taxCode: string | null;
        verified: boolean;
        officialBrand: boolean;
        userId: string;
    }>;
    createProduct(createProductDto: CreateProductDto): Promise<{
        seller: {
            id: string;
            verified: boolean;
            storeName: string;
        };
        enterprise: {
            id: string;
            companyName: string;
            verified: boolean;
            officialBrand: boolean;
        };
        category: {
            id: string;
            name: string;
            parentId: string | null;
        };
        variants: {
            id: string;
            stock: number;
            productId: string;
            price: number;
            color: string | null;
            size: string | null;
        }[];
    } & {
        id: string;
        name: string;
        active: boolean;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        categoryId: string;
        sellerId: string | null;
        enterpriseId: string | null;
        basePrice: number;
        stock: number;
    }>;
    findAllProducts(skip?: number, take?: number, categoryId?: string, sellerId?: string, enterpriseId?: string): Promise<({
        seller: {
            id: string;
            verified: boolean;
            storeName: string;
        };
        enterprise: {
            id: string;
            companyName: string;
            verified: boolean;
            officialBrand: boolean;
        };
        category: {
            id: string;
            name: string;
            parentId: string | null;
        };
        variants: {
            id: string;
            stock: number;
            productId: string;
            price: number;
            color: string | null;
            size: string | null;
        }[];
    } & {
        id: string;
        name: string;
        active: boolean;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        categoryId: string;
        sellerId: string | null;
        enterpriseId: string | null;
        basePrice: number;
        stock: number;
    })[]>;
    findOneProduct(id: string): Promise<{
        seller: {
            id: string;
            verified: boolean;
            storeName: string;
        };
        enterprise: {
            id: string;
            companyName: string;
            verified: boolean;
            officialBrand: boolean;
        };
        reviews: ({
            user: {
                id: string;
                name: string;
            };
        } & {
            id: string;
            rating: number;
            createdAt: Date;
            userId: string;
            productId: string;
            comment: string | null;
        })[];
        category: {
            id: string;
            name: string;
            parentId: string | null;
        };
        variants: {
            id: string;
            stock: number;
            productId: string;
            price: number;
            color: string | null;
            size: string | null;
        }[];
    } & {
        id: string;
        name: string;
        active: boolean;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        categoryId: string;
        sellerId: string | null;
        enterpriseId: string | null;
        basePrice: number;
        stock: number;
    }>;
    updateProduct(id: string, sellerId: string, updateProductDto: UpdateProductDto): Promise<{
        category: {
            id: string;
            name: string;
            parentId: string | null;
        };
        variants: {
            id: string;
            stock: number;
            productId: string;
            price: number;
            color: string | null;
            size: string | null;
        }[];
    } & {
        id: string;
        name: string;
        active: boolean;
        createdAt: Date;
        updatedAt: Date;
        description: string;
        categoryId: string;
        sellerId: string | null;
        enterpriseId: string | null;
        basePrice: number;
        stock: number;
    }>;
    deleteProduct(id: string, sellerId: string): Promise<{
        message: string;
    }>;
    createCategory(createCategoryDto: CreateCategoryDto): Promise<{
        parent: {
            id: string;
            name: string;
            parentId: string | null;
        };
        children: {
            id: string;
            name: string;
            parentId: string | null;
        }[];
    } & {
        id: string;
        name: string;
        parentId: string | null;
    }>;
    findAllCategories(): Promise<({
        parent: {
            id: string;
            name: string;
            parentId: string | null;
        };
        children: {
            id: string;
            name: string;
            parentId: string | null;
        }[];
    } & {
        id: string;
        name: string;
        parentId: string | null;
    })[]>;
    findOneCategory(id: string): Promise<{
        products: ({
            seller: {
                id: string;
                verified: boolean;
                storeName: string;
            };
            enterprise: {
                id: string;
                companyName: string;
                verified: boolean;
                officialBrand: boolean;
            };
            variants: {
                id: string;
                stock: number;
                productId: string;
                price: number;
                color: string | null;
                size: string | null;
            }[];
        } & {
            id: string;
            name: string;
            active: boolean;
            createdAt: Date;
            updatedAt: Date;
            description: string;
            categoryId: string;
            sellerId: string | null;
            enterpriseId: string | null;
            basePrice: number;
            stock: number;
        })[];
        parent: {
            id: string;
            name: string;
            parentId: string | null;
        };
        children: {
            id: string;
            name: string;
            parentId: string | null;
        }[];
    } & {
        id: string;
        name: string;
        parentId: string | null;
    }>;
    updateCategory(id: string, updateCategoryDto: UpdateCategoryDto): Promise<{
        parent: {
            id: string;
            name: string;
            parentId: string | null;
        };
        children: {
            id: string;
            name: string;
            parentId: string | null;
        }[];
    } & {
        id: string;
        name: string;
        parentId: string | null;
    }>;
    deleteCategory(id: string): Promise<{
        message: string;
    }>;
    createReview(productId: string, userId: string, createReviewDto: CreateReviewDto): Promise<{
        user: {
            id: string;
            name: string;
        };
    } & {
        id: string;
        rating: number;
        createdAt: Date;
        userId: string;
        productId: string;
        comment: string | null;
    }>;
    getProductReviews(productId: string): Promise<({
        user: {
            id: string;
            name: string;
        };
    } & {
        id: string;
        rating: number;
        createdAt: Date;
        userId: string;
        productId: string;
        comment: string | null;
    })[]>;
}
