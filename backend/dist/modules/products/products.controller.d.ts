import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto, CreateCategoryDto, UpdateCategoryDto, CreateReviewDto } from './dto/products.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    createProduct(req: any, createProductDto: CreateProductDto): Promise<{
        seller: {
            id: string;
            storeName: string;
            verified: boolean;
        };
        enterprise: {
            id: string;
            verified: boolean;
            companyName: string;
            officialBrand: boolean;
        };
        category: {
            name: string;
            id: string;
            parentId: string | null;
        };
        variants: {
            id: string;
            stock: number;
            color: string | null;
            size: string | null;
            price: number;
            productId: string;
        }[];
    } & {
        name: string;
        description: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        categoryId: string;
        sellerId: string | null;
        enterpriseId: string | null;
        basePrice: number;
        stock: number;
        active: boolean;
    }>;
    findAllProducts(skip?: number, take?: number, categoryId?: string, sellerId?: string): Promise<({
        seller: {
            id: string;
            storeName: string;
            verified: boolean;
        };
        enterprise: {
            id: string;
            verified: boolean;
            companyName: string;
            officialBrand: boolean;
        };
        category: {
            name: string;
            id: string;
            parentId: string | null;
        };
        variants: {
            id: string;
            stock: number;
            color: string | null;
            size: string | null;
            price: number;
            productId: string;
        }[];
    } & {
        name: string;
        description: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        categoryId: string;
        sellerId: string | null;
        enterpriseId: string | null;
        basePrice: number;
        stock: number;
        active: boolean;
    })[]>;
    findOneProduct(id: string): Promise<{
        seller: {
            id: string;
            storeName: string;
            verified: boolean;
        };
        enterprise: {
            id: string;
            verified: boolean;
            companyName: string;
            officialBrand: boolean;
        };
        category: {
            name: string;
            id: string;
            parentId: string | null;
        };
        reviews: ({
            user: {
                name: string;
                id: string;
            };
        } & {
            id: string;
            createdAt: Date;
            userId: string;
            rating: number;
            comment: string | null;
            productId: string;
        })[];
        variants: {
            id: string;
            stock: number;
            color: string | null;
            size: string | null;
            price: number;
            productId: string;
        }[];
    } & {
        name: string;
        description: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        categoryId: string;
        sellerId: string | null;
        enterpriseId: string | null;
        basePrice: number;
        stock: number;
        active: boolean;
    }>;
    updateProduct(id: string, updateProductDto: UpdateProductDto, req: any): Promise<{
        category: {
            name: string;
            id: string;
            parentId: string | null;
        };
        variants: {
            id: string;
            stock: number;
            color: string | null;
            size: string | null;
            price: number;
            productId: string;
        }[];
    } & {
        name: string;
        description: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        categoryId: string;
        sellerId: string | null;
        enterpriseId: string | null;
        basePrice: number;
        stock: number;
        active: boolean;
    }>;
    deleteProduct(id: string, req: any): Promise<{
        message: string;
    }>;
    createCategory(createCategoryDto: CreateCategoryDto, req: any): Promise<{
        parent: {
            name: string;
            id: string;
            parentId: string | null;
        };
        children: {
            name: string;
            id: string;
            parentId: string | null;
        }[];
    } & {
        name: string;
        id: string;
        parentId: string | null;
    }>;
    findAllCategories(): Promise<({
        parent: {
            name: string;
            id: string;
            parentId: string | null;
        };
        children: {
            name: string;
            id: string;
            parentId: string | null;
        }[];
    } & {
        name: string;
        id: string;
        parentId: string | null;
    })[]>;
    findOneCategory(id: string): Promise<{
        products: ({
            seller: {
                id: string;
                storeName: string;
                verified: boolean;
            };
            enterprise: {
                id: string;
                verified: boolean;
                companyName: string;
                officialBrand: boolean;
            };
            variants: {
                id: string;
                stock: number;
                color: string | null;
                size: string | null;
                price: number;
                productId: string;
            }[];
        } & {
            name: string;
            description: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            categoryId: string;
            sellerId: string | null;
            enterpriseId: string | null;
            basePrice: number;
            stock: number;
            active: boolean;
        })[];
        parent: {
            name: string;
            id: string;
            parentId: string | null;
        };
        children: {
            name: string;
            id: string;
            parentId: string | null;
        }[];
    } & {
        name: string;
        id: string;
        parentId: string | null;
    }>;
    updateCategory(id: string, updateCategoryDto: UpdateCategoryDto, req: any): Promise<{
        parent: {
            name: string;
            id: string;
            parentId: string | null;
        };
        children: {
            name: string;
            id: string;
            parentId: string | null;
        }[];
    } & {
        name: string;
        id: string;
        parentId: string | null;
    }>;
    deleteCategory(id: string, req: any): Promise<{
        message: string;
    }>;
    createReview(productId: string, createReviewDto: CreateReviewDto, req: any): Promise<{
        user: {
            name: string;
            id: string;
        };
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        rating: number;
        comment: string | null;
        productId: string;
    }>;
    getProductReviews(productId: string): Promise<({
        user: {
            name: string;
            id: string;
        };
    } & {
        id: string;
        createdAt: Date;
        userId: string;
        rating: number;
        comment: string | null;
        productId: string;
    })[]>;
}
