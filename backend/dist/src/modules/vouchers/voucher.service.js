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
exports.VoucherService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let VoucherService = class VoucherService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createShopVoucher(dto, sellerId) {
        await this.checkCodeExists(dto.code);
        return this.prisma.voucher.create({
            data: Object.assign(Object.assign({}, dto), { startDate: new Date(dto.startDate), endDate: new Date(dto.endDate), scope: client_1.VoucherScope.SHOP, sellerId: sellerId }),
        });
    }
    async createPlatformVoucher(dto) {
        await this.checkCodeExists(dto.code);
        return this.prisma.voucher.create({
            data: Object.assign(Object.assign({}, dto), { startDate: new Date(dto.startDate), endDate: new Date(dto.endDate), scope: client_1.VoucherScope.PLATFORM }),
        });
    }
    async createFreeShipVoucher(dto) {
        await this.checkCodeExists(dto.code);
        return this.prisma.voucher.create({
            data: Object.assign(Object.assign({}, dto), { startDate: new Date(dto.startDate), endDate: new Date(dto.endDate), scope: client_1.VoucherScope.FREESHIP }),
        });
    }
    async checkCodeExists(code) {
        const existing = await this.prisma.voucher.findUnique({ where: { code } });
        if (existing) {
            throw new common_1.BadRequestException('Voucher code already exists');
        }
    }
    async claimVoucher(voucherId, userId) {
        const voucher = await this.prisma.voucher.findFirst({
            where: {
                id: voucherId,
                isActive: true,
                endDate: { gte: new Date() },
            },
        });
        if (!voucher) {
            throw new common_1.NotFoundException('Voucher not found, expired, or inactive');
        }
        if (voucher.usageLimit && voucher.usedCount >= voucher.usageLimit) {
            throw new common_1.BadRequestException('Voucher has reached its usage limit');
        }
        const existingClaim = await this.prisma.voucherDistribution.findUnique({
            where: { voucherId_userId: { voucherId, userId } },
        });
        if (existingClaim) {
            throw new common_1.BadRequestException('Voucher already claimed');
        }
        return this.prisma.voucherDistribution.create({
            data: {
                voucherId,
                userId,
            },
        });
    }
    async getAvailableVouchers(userId, sellerIdsInCart) {
        const claimedVouchers = await this.prisma.voucherDistribution.findMany({
            where: {
                userId,
                used: false,
                voucher: {
                    isActive: true,
                    startDate: { lte: new Date() },
                    endDate: { gte: new Date() },
                },
            },
            include: { voucher: true },
        });
        const shopVouchers = claimedVouchers
            .filter((c) => c.voucher.scope === client_1.VoucherScope.SHOP &&
            sellerIdsInCart.includes(c.voucher.sellerId))
            .map((c) => c.voucher);
        const platformVouchers = claimedVouchers
            .filter((c) => c.voucher.scope === client_1.VoucherScope.PLATFORM)
            .map((c) => c.voucher);
        const freeShipVouchers = claimedVouchers
            .filter((c) => c.voucher.scope === client_1.VoucherScope.FREESHIP)
            .map((c) => c.voucher);
        return { shopVouchers, platformVouchers, freeShipVouchers };
    }
    async calculateCheckout(userId, dto) {
        const { items, shippingFee } = dto;
        const voucherIds = [dto.shopVoucherId, dto.platformVoucherId, dto.freeShipVoucherId].filter(Boolean);
        const vouchers = await this.validateUserVouchers(userId, voucherIds);
        const shopVoucher = vouchers.find((v) => v.scope === client_1.VoucherScope.SHOP);
        const platformVoucher = vouchers.find((v) => v.scope === client_1.VoucherScope.PLATFORM);
        const freeShipVoucher = vouchers.find((v) => v.scope === client_1.VoucherScope.FREESHIP);
        let subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
        let finalShippingFee = shippingFee;
        let shopDiscount = 0;
        let platformDiscount = 0;
        let freeShipDiscount = 0;
        if (shopVoucher && dto.shopVoucherId === shopVoucher.id) {
            const shopSubtotal = items
                .filter((item) => item.sellerId === shopVoucher.sellerId)
                .reduce((acc, item) => acc + item.price * item.quantity, 0);
            if (shopVoucher.minOrderValue && shopSubtotal < shopVoucher.minOrderValue) {
                throw new common_1.BadRequestException(`Shop voucher min order value not met`);
            }
            shopDiscount = this._calculateDiscount(shopVoucher, shopSubtotal);
        }
        let platformBaseAmount = subtotal - shopDiscount;
        if (platformVoucher && dto.platformVoucherId === platformVoucher.id) {
            if (platformVoucher.minOrderValue && platformBaseAmount < platformVoucher.minOrderValue) {
                throw new common_1.BadRequestException(`Platform voucher min order value not met`);
            }
            platformDiscount = this._calculateDiscount(platformVoucher, platformBaseAmount);
        }
        let freeshipBaseAmount = subtotal - shopDiscount - platformDiscount;
        if (freeShipVoucher && dto.freeShipVoucherId === freeShipVoucher.id) {
            if (freeShipVoucher.minOrderValue && freeshipBaseAmount < freeShipVoucher.minOrderValue) {
                throw new common_1.BadRequestException(`FreeShip voucher min order value not met`);
            }
            freeShipDiscount = this._calculateDiscount(freeShipVoucher, finalShippingFee);
        }
        const totalDiscount = shopDiscount + platformDiscount;
        const finalTotal = subtotal - totalDiscount + finalShippingFee - freeShipDiscount;
        return {
            subtotal,
            shippingFee,
            shopDiscount,
            platformDiscount,
            freeShipDiscount,
            totalDiscount,
            finalTotal,
        };
    }
    async validateUserVouchers(userId, voucherIds) {
        if (voucherIds.length === 0)
            return [];
        const claims = await this.prisma.voucherDistribution.findMany({
            where: {
                userId,
                voucherId: { in: voucherIds },
                used: false,
                voucher: {
                    isActive: true,
                    startDate: { lte: new Date() },
                    endDate: { gte: new Date() },
                },
            },
            include: { voucher: true },
        });
        if (claims.length !== voucherIds.length) {
            const foundIds = claims.map(c => c.voucherId);
            const missing = voucherIds.filter(id => !foundIds.includes(id));
            throw new common_1.ForbiddenException(`Invalid or un-claimed vouchers: ${missing.join(', ')}`);
        }
        return claims.map(c => c.voucher);
    }
    _calculateDiscount(voucher, amount) {
        let discount = 0;
        if (voucher.discountType === client_1.DiscountType.FIXED_AMOUNT) {
            discount = voucher.discountValue;
        }
        else if (voucher.discountType === client_1.DiscountType.PERCENTAGE) {
            discount = amount * (voucher.discountValue / 100);
            if (voucher.maxDiscountValue && discount > voucher.maxDiscountValue) {
                discount = voucher.maxDiscountValue;
            }
        }
        return Math.min(discount, amount);
    }
};
exports.VoucherService = VoucherService;
exports.VoucherService = VoucherService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], VoucherService);
//# sourceMappingURL=voucher.service.js.map