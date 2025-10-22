import { ProductsService } from './products.service';
import { CreateProductDto, UpdateProductDto, CreateCategoryDto, UpdateCategoryDto, CreateReviewDto } from './dto/products.dto';
export declare class ProductsController {
    private readonly productsService;
    constructor(productsService: ProductsService);
    createProduct(req: any, createProductDto: CreateProductDto): Promise<{
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
    findAllProducts(skip?: number, take?: number, categoryId?: string, sellerId?: string): Promise<({
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
    updateProduct(id: string, updateProductDto: UpdateProductDto, req: any): Promise<{
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
    deleteProduct(id: string, req: any): Promise<{
        message: string;
    }>;
    createCategory(createCategoryDto: CreateCategoryDto, req: any): Promise<{
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
    updateCategory(id: string, updateCategoryDto: UpdateCategoryDto, req: any): Promise<{
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
    deleteCategory(id: string, req: any): Promise<{
        message: string;
    }>;
    createReview(productId: string, createReviewDto: CreateReviewDto, req: any): Promise<{
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
