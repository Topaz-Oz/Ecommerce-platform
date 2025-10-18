import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSellerDto, UpdateSellerDto } from './dto/sellers.dto';

@Injectable()
export class SellersService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, createSellerDto: CreateSellerDto) {
    // Check if user already has a seller profile
    const existingSeller = await this.prisma.seller.findUnique({
      where: { userId },
    });

    if (existingSeller) {
      throw new ConflictException('User already has a seller profile');
    }

    return this.prisma.seller.create({
      data: {
        ...createSellerDto,
        userId,
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            phone: true,
            avatar: true,
          },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.seller.findMany({
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
        products: {
          select: {
            id: true,
            name: true,
            basePrice: true,
            stock: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    const seller = await this.prisma.seller.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
        products: {
          select: {
            id: true,
            name: true,
            basePrice: true,
            stock: true,
          },
        },
      },
    });

    if (!seller) {
      throw new NotFoundException(`Seller with ID ${id} not found`);
    }

    return seller;
  }

  async findByUserId(userId: string) {
    const seller = await this.prisma.seller.findUnique({
      where: { userId },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
        products: {
          select: {
            id: true,
            name: true,
            basePrice: true,
            stock: true,
          },
        },
      },
    });

    if (!seller) {
      throw new NotFoundException(`Seller profile for user ${userId} not found`);
    }

    return seller;
  }

  async update(id: string, updateSellerDto: UpdateSellerDto) {
    const seller = await this.prisma.seller.findUnique({
      where: { id },
    });

    if (!seller) {
      throw new NotFoundException(`Seller with ID ${id} not found`);
    }

    return this.prisma.seller.update({
      where: { id },
      data: updateSellerDto,
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
    });
  }

  async updateVerificationStatus(id: string, verified: boolean) {
    const seller = await this.prisma.seller.findUnique({
      where: { id },
    });

    if (!seller) {
      throw new NotFoundException(`Seller with ID ${id} not found`);
    }

    return this.prisma.seller.update({
      where: { id },
      data: { verified },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
      },
    });
  }

  async delete(id: string) {
    const seller = await this.prisma.seller.findUnique({
      where: { id },
    });

    if (!seller) {
      throw new NotFoundException(`Seller with ID ${id} not found`);
    }

    // Delete seller profile
    await this.prisma.seller.delete({
      where: { id },
    });

    return { message: 'Seller profile deleted successfully' };
  }
}