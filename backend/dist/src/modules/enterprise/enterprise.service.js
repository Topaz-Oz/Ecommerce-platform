"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EnterpriseService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
const file_upload_service_1 = require("../../common/services/file-upload.service");
const cloudinary_constants_1 = require("../cloudinary/cloudinary.constants");
let EnterpriseService = class EnterpriseService {
    constructor(prisma, fileUploadService) {
        this.prisma = prisma;
        this.fileUploadService = fileUploadService;
    }
    async create(data) {
        return this.prisma.user.create({
            data: {
                email: data.email,
                password: data.password,
                name: data.name,
                phone: data.phone,
                avatar: data.avatar,
                role: client_1.Role.ENTERPRISE,
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
    async update(userId, data) {
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
    async findById(id) {
        return this.prisma.enterprise.findUnique({
            where: { id },
            include: {
                user: true,
                products: true,
            },
        });
    }
    async findByUserId(userId) {
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
    async uploadLogo(file, enterpriseId) {
        const publicId = `${cloudinary_constants_1.CLOUDINARY.FOLDER.ENTERPRISE}/${enterpriseId}/logo`;
        const result = await this.fileUploadService.safeUploadFile(file, publicId, Object.assign({}, cloudinary_constants_1.CLOUDINARY.TRANSFORMATION.PROFILE));
        await this.prisma.enterprise.update({
            where: { id: enterpriseId },
            data: { logoUrl: result.secure_url },
        });
        return result;
    }
    async updateLogo(file, enterpriseId) {
        const publicId = `${cloudinary_constants_1.CLOUDINARY.FOLDER.ENTERPRISE}/${enterpriseId}/logo`;
        const result = await this.fileUploadService.safeReplaceFile(file, publicId, Object.assign({}, cloudinary_constants_1.CLOUDINARY.TRANSFORMATION.PROFILE));
        await this.prisma.enterprise.update({
            where: { id: enterpriseId },
            data: { logoUrl: result.secure_url },
        });
        return result;
    }
    async deleteLogo(enterpriseId) {
        const publicId = `${cloudinary_constants_1.CLOUDINARY.FOLDER.ENTERPRISE}/${enterpriseId}/logo`;
        await this.fileUploadService.safeDeleteFile(publicId);
        await this.prisma.enterprise.update({
            where: { id: enterpriseId },
            data: { logoUrl: null },
        });
    }
    async uploadDocument(file, enterpriseId, documentType) {
        const publicId = `${cloudinary_constants_1.CLOUDINARY.FOLDER.ENTERPRISE}/${enterpriseId}/documents/${documentType}`;
        const result = await this.fileUploadService.safeUploadFile(file, publicId);
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
    async deleteDocument(enterpriseId, documentType) {
        const publicId = `${cloudinary_constants_1.CLOUDINARY.FOLDER.ENTERPRISE}/${enterpriseId}/documents/${documentType}`;
        await this.fileUploadService.safeDeleteFile(publicId);
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
    async deleteAllDocuments(enterpriseId) {
        const documentTypes = ['business', 'brand', 'tax'];
        for (const docType of documentTypes) {
            await this.deleteDocument(enterpriseId, docType);
        }
        await this.deleteLogo(enterpriseId);
    }
    async delete(id) {
        const enterprise = await this.prisma.enterprise.findUnique({
            where: { id },
            select: { userId: true },
        });
        if (!enterprise) {
            throw new common_1.NotFoundException(`Enterprise with ID ${id} not found`);
        }
        await this.deleteAllDocuments(id);
        try {
            await this.prisma.$transaction([
                this.prisma.enterprise.delete({
                    where: { id },
                }),
                this.prisma.user.delete({
                    where: { id: enterprise.userId },
                }),
            ]);
        }
        catch (error) {
            console.error('Error deleting enterprise and user:', error);
            throw new common_1.InternalServerErrorException('Could not delete enterprise');
        }
        return { message: 'Enterprise and associated user deleted successfully' };
    }
};
exports.EnterpriseService = EnterpriseService;
exports.EnterpriseService = EnterpriseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        file_upload_service_1.FileUploadService])
], EnterpriseService);
//# sourceMappingURL=enterprise.service.js.map