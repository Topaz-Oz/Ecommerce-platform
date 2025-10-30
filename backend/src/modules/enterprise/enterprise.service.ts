import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '@modules/prisma/prisma.service';
import { Role } from '@prisma/client';
import { FileUploadService } from '../../common/services/file-upload.service';
import { CLOUDINARY } from '../cloudinary/cloudinary.constants';

@Injectable()
export class EnterpriseService {
  constructor(
    private prisma: PrismaService,
    private fileUploadService: FileUploadService
  ) {}

  async create(data: {
    email: string;
    password: string;
    name: string;
    phone?: string;
    avatar?: string;
    companyName: string;
    taxCode?: string;
  }) {
    return this.prisma.user.create({
      data: {
        email: data.email,
        password: data.password,
        name: data.name,
        phone: data.phone,
        avatar: data.avatar,
        role: Role.ENTERPRISE,
        enterprise: {
          create: {
            companyName: data.companyName,
            taxCode: data.taxCode,
          },
        },
      },
      include: {
        enterprise: true,
      },
    });
  }

  async update(userId: string, data: {
    name?: string;
    phone?: string;
    avatar?: string;
    companyName?: string;
    taxCode?: string;
  }) {
    return this.prisma.user.update({
      where: { id: userId },
      data: {
        name: data.name,
        phone: data.phone,
        avatar: data.avatar,
        enterprise: {
          update: {
            companyName: data.companyName,
            taxCode: data.taxCode,
          },
        },
      },
      include: {
        enterprise: true,
      },
    });
  }

  async findById(id: string) {
    return this.prisma.enterprise.findUnique({
      where: { id },
      include: {
        user: true,
        products: true,
      },
    });
  }

  async findByUserId(userId: string) {
    return this.prisma.enterprise.findUnique({
      where: { userId },
      include: {
        user: true,
        products: true,
      },
    });
  }

  async findAll() {
    return this.prisma.enterprise.findMany({
      include: {
        user: true,
        products: true,
      },
    });
  }

  // File Upload Methods
  async uploadLogo(file: Express.Multer.File, enterpriseId: string) {
    const publicId = `${CLOUDINARY.FOLDER.ENTERPRISE}/${enterpriseId}/logo`;
    const result = await this.fileUploadService.safeUploadFile(file, publicId, {
      ...CLOUDINARY.TRANSFORMATION.PROFILE,
    });

    await this.prisma.enterprise.update({
      where: { id: enterpriseId },
      data: { logoUrl: result.secure_url },
    });

    return result;
  }

  async updateLogo(file: Express.Multer.File, enterpriseId: string) {
    const publicId = `${CLOUDINARY.FOLDER.ENTERPRISE}/${enterpriseId}/logo`;
    const result = await this.fileUploadService.safeReplaceFile(file, publicId, {
      ...CLOUDINARY.TRANSFORMATION.PROFILE,
    });

    await this.prisma.enterprise.update({
      where: { id: enterpriseId },
      data: { logoUrl: result.secure_url },
    });

    return result;
  }

  async deleteLogo(enterpriseId: string) {
    const publicId = `${CLOUDINARY.FOLDER.ENTERPRISE}/${enterpriseId}/logo`;
    await this.fileUploadService.safeDeleteFile(publicId);

    await this.prisma.enterprise.update({
      where: { id: enterpriseId },
      data: { logoUrl: null },
    });
  }

  async uploadDocument(
    file: Express.Multer.File,
    enterpriseId: string,
    documentType: 'business' | 'brand' | 'tax'
  ) {
    const publicId = `${CLOUDINARY.FOLDER.ENTERPRISE}/${enterpriseId}/documents/${documentType}`;
    const result = await this.fileUploadService.safeUploadFile(file, publicId);

    // Map document type to the corresponding database field
    const fieldMap = {
      business: 'businessLicenseUrl',
      brand: 'brandRegistrationUrl',
      tax: 'taxDocumentUrl',
    };

    await this.prisma.enterprise.update({
      where: { id: enterpriseId },
      data: { [fieldMap[documentType]]: result.secure_url },
    });

    return result;
  }

  async deleteDocument(enterpriseId: string, documentType: 'business' | 'brand' | 'tax') {
    const publicId = `${CLOUDINARY.FOLDER.ENTERPRISE}/${enterpriseId}/documents/${documentType}`;
    await this.fileUploadService.safeDeleteFile(publicId);

    // Map document type to the corresponding database field
    const fieldMap = {
      business: 'businessLicenseUrl',
      brand: 'brandRegistrationUrl',
      tax: 'taxDocumentUrl',
    };

    await this.prisma.enterprise.update({
      where: { id: enterpriseId },
      data: { [fieldMap[documentType]]: null },
    });
  }

  private async deleteAllDocuments(enterpriseId: string) {
    const documentTypes = ['business', 'brand', 'tax'] as const;
    for (const docType of documentTypes) {
      await this.deleteDocument(enterpriseId, docType);
    }
    await this.deleteLogo(enterpriseId);
  }

  async delete(id: string) {
    const enterprise = await this.prisma.enterprise.findUnique({
      where: { id },
      select: { userId: true }, // 👈 Chỉ cần lấy userId
    });

    if (!enterprise) {
      throw new NotFoundException(`Enterprise with ID ${id} not found`);
    }

    // 1. Xóa tất cả file trên Cloudinary
    await this.deleteAllDocuments(id);

    // 2. Dùng transaction để xóa Enterprise VÀ User
    try {
      await this.prisma.$transaction([
        // 2a. Xóa Enterprise
        this.prisma.enterprise.delete({
          where: { id },
        }),
        // 2b. Xóa User liên quan
        this.prisma.user.delete({
          where: { id: enterprise.userId },
        }),
      ]);
    } catch (error) {
      // Xử lý lỗi (ví dụ: product vẫn còn liên kết)
      console.error('Error deleting enterprise and user:', error);
      throw new InternalServerErrorException('Could not delete enterprise');
    }

    return { message: 'Enterprise and associated user deleted successfully' };
  }
}