import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateProductDto,
  UpdateProductDto,
  CreateCategoryDto,
  UpdateCategoryDto,
  CreateReviewDto,
} from './dto/products.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async findSellerByUserId(userId: string) {
    const seller = await this.prisma.seller.findUnique({
      where: { userId },
    });
    if (!seller) {
      throw new NotFoundException('Seller profile not found');
    }
    return seller;
  }

  async findEnterpriseByUserId(userId: string) {
    const enterprise = await this.prisma.enterprise.findUnique({
      where: { userId },
    });
    if (!enterprise) {
      throw new NotFoundException('Enterprise profile not found');
    }
    return enterprise;
  }

  // Product Methods
  async createProduct(createProductDto: CreateProductDto) {
    const category = await this.prisma.category.findUnique({
      where: { id: createProductDto.categoryId },
    });

    if (!category) {
      throw new NotFoundException('Category not found');
    }

    if (!createProductDto.sellerId && !createProductDto.enterpriseId) {
      throw new BadRequestException('Either sellerId or enterpriseId must be provided');
    }

    if (createProductDto.sellerId && createProductDto.enterpriseId) {
      throw new BadRequestException('Product can only belong to either a seller or an enterprise');
    }

    // Verify seller/enterprise exists
    if (createProductDto.sellerId) {
      const seller = await this.prisma.seller.findUnique({
        where: { id: createProductDto.sellerId },
      });
      if (!seller) {
        throw new NotFoundException('Seller not found');
      }
    }

    if (createProductDto.enterpriseId) {
      const enterprise = await this.prisma.enterprise.findUnique({
        where: { id: createProductDto.enterpriseId },
      });
      if (!enterprise) {
        throw new NotFoundException('Enterprise not found');
      }
    }

    const { variants, ...productData } = createProductDto;

    const product = await this.prisma.product.create({
      data: {
        ...productData,
        variants: {
          create: variants || [],
        },
      },
      include: {
        category: true,
        variants: true,
        enterprise: {
          select: {
            id: true,
            companyName: true,
            verified: true,
            officialBrand: true,
          },
        },
        seller: {
          select: {
            id: true,
            storeName: true,
            verified: true,
          },
        },
      },
    });

    return product;
  }

  async findAllProducts(
    skip?: number,
    take?: number,
    categoryId?: string,
    sellerId?: string,
    enterpriseId?: string,
  ) {
    const where = {
      ...(categoryId && { categoryId }),
      ...(sellerId && { sellerId }),
      ...(enterpriseId && { enterpriseId }),
    };

    return this.prisma.product.findMany({
      where,
      skip,
      take,
      include: {
        category: true,
        variants: true,
        enterprise: {
          select: {
            id: true,
            companyName: true,
            verified: true,
            officialBrand: true,
          },
        },
        seller: {
          select: {
            id: true,
            storeName: true,
            verified: true,
          },
        },
      },
    });
  }

  async findOneProduct(id: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
      include: {
        category: true,
        variants: true,
        enterprise: {
          select: {
            id: true,
            companyName: true,
            verified: true,
            officialBrand: true,
          },
        },
        seller: {
          select: {
            id: true,
            storeName: true,
            verified: true,
          },
        },
        reviews: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
              },
            },
          },
        },
      },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    return product;
  }

  async updateProduct(
    id: string,
    sellerId: string,
    updateProductDto: UpdateProductDto,
  ) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    if (product.sellerId !== sellerId) {
      throw new BadRequestException('You can only update your own products');
    }

    return this.prisma.product.update({
      where: { id },
      data: updateProductDto,
      include: {
        category: true,
        variants: true,
      },
    });
  }

  async deleteProduct(id: string, sellerId: string) {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }

    if (product.sellerId !== sellerId) {
      throw new BadRequestException('You can only delete your own products');
    }

    await this.prisma.product.delete({
      where: { id },
    });

    return { message: 'Product deleted successfully' };
  }

  // Category Methods
  async createCategory(createCategoryDto: CreateCategoryDto) {
    if (createCategoryDto.parentId) {
      const parentCategory = await this.prisma.category.findUnique({
        where: { id: createCategoryDto.parentId },
      });

      if (!parentCategory) {
        throw new NotFoundException('Parent category not found');
      }
    }

    return this.prisma.category.create({
      data: createCategoryDto,
      include: {
        parent: true,
        children: true,
      },
    });
  }

  async findAllCategories() {
    return this.prisma.category.findMany({
      include: {
        parent: true,
        children: true,
      },
    });
  }

  async findOneCategory(id: string) {
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: {
        parent: true,
        children: true,
        products: {
          include: {
            variants: true,
            seller: {
              select: {
                id: true,
                storeName: true,
                verified: true,
              },
            },
            enterprise: {
          select: {
            id: true,
            companyName: true,
            verified: true,
            officialBrand: true,
          },
        },
      },
    }}});

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    return category;
  }

  async updateCategory(id: string, updateCategoryDto: UpdateCategoryDto) {
    if (updateCategoryDto.parentId) {
      const parentCategory = await this.prisma.category.findUnique({
        where: { id: updateCategoryDto.parentId },
      });

      if (!parentCategory) {
        throw new NotFoundException('Parent category not found');
      }
    }

    const category = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    return this.prisma.category.update({
      where: { id },
      data: updateCategoryDto,
      include: {
        parent: true,
        children: true,
      },
    });
  }

  async deleteCategory(id: string) {
    const category = await this.prisma.category.findUnique({
      where: { id },
      include: {
        children: true,
        products: true,
      },
    });

    if (!category) {
      throw new NotFoundException(`Category with ID ${id} not found`);
    }

    if (category.children.length > 0) {
      throw new BadRequestException(
        'Cannot delete category with existing subcategories',
      );
    }

    if (category.products.length > 0) {
      throw new BadRequestException(
        'Cannot delete category with existing products',
      );
    }

    await this.prisma.category.delete({
      where: { id },
    });

    return { message: 'Category deleted successfully' };
  }

  // Review Methods
  async createReview(
    productId: string,
    userId: string,
    createReviewDto: CreateReviewDto,
  ) {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }

    return this.prisma.review.create({
      data: {
        ...createReviewDto,
        productId,
        userId,
      },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async getProductReviews(productId: string) {
    const product = await this.prisma.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found`);
    }

    return this.prisma.review.findMany({
      where: { productId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }
}