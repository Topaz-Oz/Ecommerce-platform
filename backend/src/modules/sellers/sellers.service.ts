import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateSellerDto, UpdateSellerDto } from './dto/sellers.dto';
import { FileUploadService } from '../../common/services/file-upload.service';
import { CLOUDINARY } from '../cloudinary/cloudinary.constants';

@Injectable()
export class SellersService {
  constructor(
    private prisma: PrismaService,
    private fileUploadService: FileUploadService
  ) {}

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
            variants: { 
      select: {
        price: true,
        stock: true,
      }
    }
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
            variants: { // 👈 Sửa thành
      select: {
        price: true,
        stock: true,
      }
    }
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
            variants: {
              select: {
                price: true,
                stock: true,
              },
            },
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

    // Delete any associated files
    await this.deleteStoreLogo(id);
    await this.deleteVerificationDocuments(id);

    return { message: 'Seller profile deleted successfully' };
  }

  async uploadStoreLogo(file: Express.Multer.File, sellerId: string) {
    const publicId = `${CLOUDINARY.FOLDER.SELLERS}/${sellerId}/logo`;
    const result = await this.fileUploadService.safeUploadFile(file, publicId, {
      ...CLOUDINARY.TRANSFORMATION.PROFILE,
    });

    // Update seller profile with logo URL
    await this.prisma.seller.update({
      where: { id: sellerId },
      data: { logoUrl: result.secure_url },
    });

    return result;
  }

  async updateStoreLogo(file: Express.Multer.File, sellerId: string) {
    const publicId = `${CLOUDINARY.FOLDER.SELLERS}/${sellerId}/logo`;
    const result = await this.fileUploadService.safeReplaceFile(file, publicId, {
      ...CLOUDINARY.TRANSFORMATION.PROFILE,
    });

    // Update seller profile with new logo URL
    await this.prisma.seller.update({
      where: { id: sellerId },
      data: { logoUrl: result.secure_url },
    });

    return result;
  }

  async deleteStoreLogo(sellerId: string) {
    const publicId = `${CLOUDINARY.FOLDER.SELLERS}/${sellerId}/logo`;
    await this.fileUploadService.safeDeleteFile(publicId);

    // Remove logo URL from seller profile
    await this.prisma.seller.update({
      where: { id: sellerId },
      data: { logoUrl: null },
    });
  }

  async uploadVerificationDocument(
    file: Express.Multer.File,
    sellerId: string,
    documentType: 'business' | 'identity' | 'address'
  ) {
    const publicId = `${CLOUDINARY.FOLDER.SELLERS}/${sellerId}/verification/${documentType}`;
    const result = await this.fileUploadService.safeUploadFile(file, publicId);

    // Update seller profile with document URL
    const updateData = {
      [`${documentType}DocumentUrl`]: result.secure_url,
    };

    await this.prisma.seller.update({
      where: { id: sellerId },
      data: updateData,
    });

    return result;
  }

  async deleteVerificationDocument(
    sellerId: string,
    documentType: 'business' | 'identity' | 'address'
  ) {
    const publicId = `${CLOUDINARY.FOLDER.SELLERS}/${sellerId}/verification/${documentType}`;
    await this.fileUploadService.safeDeleteFile(publicId);

    // Remove document URL from seller profile
    const updateData = {
      [`${documentType}DocumentUrl`]: null,
    };

    await this.prisma.seller.update({
      where: { id: sellerId },
      data: updateData,
    });
  }

  private async deleteVerificationDocuments(sellerId: string) {
    const documentTypes = ['business', 'identity', 'address'] as const;
    for (const docType of documentTypes) {
      await this.deleteVerificationDocument(sellerId, docType);
    }
  }
}