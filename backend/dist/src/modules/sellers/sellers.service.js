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
exports.SellersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const file_upload_service_1 = require("../../common/services/file-upload.service");
const cloudinary_constants_1 = require("../cloudinary/cloudinary.constants");
let SellersService = class SellersService {
    constructor(prisma, fileUploadService) {
        this.prisma = prisma;
        this.fileUploadService = fileUploadService;
    }
    async create(userId, createSellerDto) {
        const existingSeller = await this.prisma.seller.findUnique({
            where: { userId },
        });
        if (existingSeller) {
            throw new common_1.ConflictException('User already has a seller profile');
        }
        return this.prisma.seller.create({
            data: Object.assign(Object.assign({}, createSellerDto), { userId }),
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
    async findOne(id) {
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
        if (!seller) {
            throw new common_1.NotFoundException(`Seller with ID ${id} not found`);
        }
        return seller;
    }
    async findByUserId(userId) {
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
            throw new common_1.NotFoundException(`Seller profile for user ${userId} not found`);
        }
        return seller;
    }
    async update(id, updateSellerDto) {
        const seller = await this.prisma.seller.findUnique({
            where: { id },
        });
        if (!seller) {
            throw new common_1.NotFoundException(`Seller with ID ${id} not found`);
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
    async updateVerificationStatus(id, verified) {
        const seller = await this.prisma.seller.findUnique({
            where: { id },
        });
        if (!seller) {
            throw new common_1.NotFoundException(`Seller with ID ${id} not found`);
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
    async delete(id) {
        const seller = await this.prisma.seller.findUnique({
            where: { id },
        });
        if (!seller) {
            throw new common_1.NotFoundException(`Seller with ID ${id} not found`);
        }
        await this.prisma.seller.delete({
            where: { id },
        });
        await this.deleteStoreLogo(id);
        await this.deleteVerificationDocuments(id);
        return { message: 'Seller profile deleted successfully' };
    }
    async uploadStoreLogo(file, sellerId) {
        const publicId = `${cloudinary_constants_1.CLOUDINARY.FOLDER.SELLERS}/${sellerId}/logo`;
        const result = await this.fileUploadService.safeUploadFile(file, publicId, Object.assign({}, cloudinary_constants_1.CLOUDINARY.TRANSFORMATION.PROFILE));
        await this.prisma.seller.update({
            where: { id: sellerId },
            data: { logoUrl: result.secure_url },
        });
        return result;
    }
    async updateStoreLogo(file, sellerId) {
        const publicId = `${cloudinary_constants_1.CLOUDINARY.FOLDER.SELLERS}/${sellerId}/logo`;
        const result = await this.fileUploadService.safeReplaceFile(file, publicId, Object.assign({}, cloudinary_constants_1.CLOUDINARY.TRANSFORMATION.PROFILE));
        await this.prisma.seller.update({
            where: { id: sellerId },
            data: { logoUrl: result.secure_url },
        });
        return result;
    }
    async deleteStoreLogo(sellerId) {
        const publicId = `${cloudinary_constants_1.CLOUDINARY.FOLDER.SELLERS}/${sellerId}/logo`;
        await this.fileUploadService.safeDeleteFile(publicId);
        await this.prisma.seller.update({
            where: { id: sellerId },
            data: { logoUrl: null },
        });
    }
    async uploadVerificationDocument(file, sellerId, documentType) {
        const publicId = `${cloudinary_constants_1.CLOUDINARY.FOLDER.SELLERS}/${sellerId}/verification/${documentType}`;
        const result = await this.fileUploadService.safeUploadFile(file, publicId);
        const updateData = {
            [`${documentType}DocumentUrl`]: result.secure_url,
        };
        await this.prisma.seller.update({
            where: { id: sellerId },
            data: updateData,
        });
        return result;
    }
    async deleteVerificationDocument(sellerId, documentType) {
        const publicId = `${cloudinary_constants_1.CLOUDINARY.FOLDER.SELLERS}/${sellerId}/verification/${documentType}`;
        await this.fileUploadService.safeDeleteFile(publicId);
        const updateData = {
            [`${documentType}DocumentUrl`]: null,
        };
        await this.prisma.seller.update({
            where: { id: sellerId },
            data: updateData,
        });
    }
    async deleteVerificationDocuments(sellerId) {
        const documentTypes = ['business', 'identity', 'address'];
        for (const docType of documentTypes) {
            await this.deleteVerificationDocument(sellerId, docType);
        }
    }
};
exports.SellersService = SellersService;
exports.SellersService = SellersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        file_upload_service_1.FileUploadService])
], SellersService);
//# sourceMappingURL=sellers.service.js.map