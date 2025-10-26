import { Injectable, NotFoundException } from '@nestjs/common';
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
    });

    if (!enterprise) {
      throw new NotFoundException(`Enterprise with ID ${id} not found`);
    }

    // Delete all associated files first
    await this.deleteAllDocuments(id);

    // Then delete the enterprise record
    await this.prisma.enterprise.delete({
      where: { id },
    });

    return { message: 'Enterprise deleted successfully' };
  }
}