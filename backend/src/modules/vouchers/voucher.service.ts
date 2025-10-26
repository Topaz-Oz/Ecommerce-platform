// src/voucher/voucher.service.ts
import {
  BadRequestException,
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; 
import { CreateVoucherDto } from './dto/create-voucher.dto';
import { DiscountType, Prisma, Voucher, VoucherScope } from '@prisma/client';
import { ApplyVoucherDto } from './dto/apply-voucher.dto';

@Injectable()
export class VoucherService {
  constructor(private prisma: PrismaService) {}

  // ==========================================
  // 1. TẠO VOUCHER (ADMIN / SELLER)
  // ==========================================

  async createShopVoucher(dto: CreateVoucherDto, sellerId: string) {
    await this.checkCodeExists(dto.code);
    return this.prisma.voucher.create({
      data: {
        ...dto,
        startDate: new Date(dto.startDate),
        endDate: new Date(dto.endDate),
        scope: VoucherScope.SHOP,
        sellerId: sellerId,
      },
    });
  }

  async createPlatformVoucher(dto: CreateVoucherDto) {
    await this.checkCodeExists(dto.code);
    return this.prisma.voucher.create({
      data: {
        ...dto,
        startDate: new Date(dto.startDate),
        endDate: new Date(dto.endDate),
        scope: VoucherScope.PLATFORM,
      },
    });
  }

  async createFreeShipVoucher(dto: CreateVoucherDto) {
    await this.checkCodeExists(dto.code);
    return this.prisma.voucher.create({
      data: {
        ...dto,
        startDate: new Date(dto.startDate),
        endDate: new Date(dto.endDate),
        scope: VoucherScope.FREESHIP,
      },
    });
  }

  private async checkCodeExists(code: string) {
    const existing = await this.prisma.voucher.findUnique({ where: { code } });
    if (existing) {
      throw new BadRequestException('Voucher code already exists');
    }
  }

  // ==========================================
  // 2. USER LƯU (CLAIM) VOUCHER
  // ==========================================

  async claimVoucher(voucherId: string, userId: string) {
    const voucher = await this.prisma.voucher.findFirst({
      where: {
        id: voucherId,
        isActive: true,
        endDate: { gte: new Date() },
      },
    });

    if (!voucher) {
      throw new NotFoundException('Voucher not found, expired, or inactive');
    }

    if (voucher.usageLimit && voucher.usedCount >= voucher.usageLimit) {
      throw new BadRequestException('Voucher has reached its usage limit');
    }

    const existingClaim = await this.prisma.voucherDistribution.findUnique({
      where: { voucherId_userId: { voucherId, userId } },
    });

    if (existingClaim) {
      throw new BadRequestException('Voucher already claimed');
    }

    return this.prisma.voucherDistribution.create({
      data: {
        voucherId,
        userId,
      },
    });
  }

  // ==========================================
  // 3. LẤY VOUCHER KHẢ DỤNG CHO GIỎ HÀNG
  // ==========================================

  async getAvailableVouchers(userId: string, sellerIdsInCart: string[]) {
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
      .filter(
        (c) =>
          c.voucher.scope === VoucherScope.SHOP &&
          sellerIdsInCart.includes(c.voucher.sellerId),
      )
      .map((c) => c.voucher);

    const platformVouchers = claimedVouchers
      .filter((c) => c.voucher.scope === VoucherScope.PLATFORM)
      .map((c) => c.voucher);

    const freeShipVouchers = claimedVouchers
      .filter((c) => c.voucher.scope === VoucherScope.FREESHIP)
      .map((c) => c.voucher);

    return { shopVouchers, platformVouchers, freeShipVouchers };
  }

  // ==========================================
  // 4. TẠM TÍNH GIỎ HÀNG (KHÔNG GHI DB)
  // ==========================================

  async calculateCheckout(userId: string, dto: ApplyVoucherDto) {
    const { items, shippingFee } = dto;
    const voucherIds = [dto.shopVoucherId, dto.platformVoucherId, dto.freeShipVoucherId].filter(Boolean);

    // 1. Lấy thông tin các voucher được chọn
    const vouchers = await this.validateUserVouchers(userId, voucherIds);
    const shopVoucher = vouchers.find((v) => v.scope === VoucherScope.SHOP);
    const platformVoucher = vouchers.find((v) => v.scope === VoucherScope.PLATFORM);
    const freeShipVoucher = vouchers.find((v) => v.scope === VoucherScope.FREESHIP);

    // 2. Tính toán giá trị
    let subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    let finalShippingFee = shippingFee;
    let shopDiscount = 0;
    let platformDiscount = 0;
    let freeShipDiscount = 0;

    // 3. Áp dụng Shop Voucher
    if (shopVoucher && dto.shopVoucherId === shopVoucher.id) {
      const shopSubtotal = items
        .filter((item) => item.sellerId === shopVoucher.sellerId)
        .reduce((acc, item) => acc + item.price * item.quantity, 0);

      if (shopVoucher.minOrderValue && shopSubtotal < shopVoucher.minOrderValue) {
        throw new BadRequestException(`Shop voucher min order value not met`);
      }
      shopDiscount = this._calculateDiscount(shopVoucher, shopSubtotal);
    }

    // 4. Áp dụng Platform Voucher (trên subtotal đã trừ shop)
    let platformBaseAmount = subtotal - shopDiscount;
    if (platformVoucher && dto.platformVoucherId === platformVoucher.id) {
      if (platformVoucher.minOrderValue && platformBaseAmount < platformVoucher.minOrderValue) {
        throw new BadRequestException(`Platform voucher min order value not met`);
      }
      platformDiscount = this._calculateDiscount(platformVoucher, platformBaseAmount);
    }

    // 5. Áp dụng FreeShip Voucher (trên subtotal cuối)
    let freeshipBaseAmount = subtotal - shopDiscount - platformDiscount;
    if (freeShipVoucher && dto.freeShipVoucherId === freeShipVoucher.id) {
      if (freeShipVoucher.minOrderValue && freeshipBaseAmount < freeShipVoucher.minOrderValue) {
        throw new BadRequestException(`FreeShip voucher min order value not met`);
      }
      freeShipDiscount = this._calculateDiscount(freeShipVoucher, finalShippingFee);
    }

    // 6. Trả về kết quả
    const totalDiscount = shopDiscount + platformDiscount;
    const finalTotal = subtotal - totalDiscount + finalShippingFee - freeShipDiscount;

    return {
      subtotal,
      shippingFee,
      shopDiscount,
      platformDiscount,
      freeShipDiscount,
      totalDiscount, // Tổng giảm giá hàng
      finalTotal,    // Tổng tiền cuối cùng
    };
  }

  // ==========================================
  // 5. HÀM HỖ TRỢ (PRIVATE)
  // ==========================================

  /**
   * Kiểm tra xem user có sở hữu các voucher này không và chúng có hợp lệ không
   */
  private async validateUserVouchers(userId: string, voucherIds: string[]): Promise<Voucher[]> {
    if (voucherIds.length === 0) return [];
    
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

    // Check nếu user không sở hữu 1 trong các voucher đã gửi lên
    if (claims.length !== voucherIds.length) {
        const foundIds = claims.map(c => c.voucherId);
        const missing = voucherIds.filter(id => !foundIds.includes(id));
        throw new ForbiddenException(`Invalid or un-claimed vouchers: ${missing.join(', ')}`);
    }
    
    return claims.map(c => c.voucher);
  }

  private _calculateDiscount(voucher: Voucher, amount: number): number {
    let discount = 0;
    if (voucher.discountType === DiscountType.FIXED_AMOUNT) {
      discount = voucher.discountValue;
    } else if (voucher.discountType === DiscountType.PERCENTAGE) {
      discount = amount * (voucher.discountValue / 100);
      if (voucher.maxDiscountValue && discount > voucher.maxDiscountValue) {
        discount = voucher.maxDiscountValue;
      }
    }
    return Math.min(discount, amount); // Đảm bảo không giảm quá số tiền
  }
}