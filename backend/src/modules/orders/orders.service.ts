import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto, UpdateOrderStatusDto } from './dto/orders.dto';
import { OrderStatus, Prisma } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  /**
   * 🚀 HÀM CREATE ĐÃ ĐƯỢC SỬA LẠI HOÀN TOÀN
   */
  async create(userId: string, dto: CreateOrderDto) {
    let subtotal = 0;
    const orderItemsData: Prisma.OrderItemCreateManyOrderInput[] = [];
    const variantIdsToUpdate: { id: string; quantity: number }[] = [];

    // 1. Validate items, kiểm tra kho, và tính subtotal
    for (const item of dto.items) {
      if (!item.variantId) {
        throw new BadRequestException('All items must have a variantId');
      }

      // 🚨 SỬA LỖI 1: Tìm ProductVariant (không phải Product)
      const variant = await this.prisma.productVariant.findUnique({
        where: { id: item.variantId },
        include: { product: true }, // 👈 Cần lấy product để biết sellerId
      });

      if (!variant) {
        throw new NotFoundException(`Product Variant ${item.variantId} not found`);
      }
      if (variant.stock < item.quantity) {
        throw new BadRequestException(`Not enough stock for ${variant.product.name}`);
      }

      // 💡 Dùng giá từ DB (variant.price) thay vì dto.price để bảo mật
      subtotal += variant.price * item.quantity;

      orderItemsData.push({
        productId: item.productId,
        variantId: item.variantId,
        quantity: item.quantity,
        price: variant.price, // 👈 Dùng giá từ DB
        // 💡 BẮT BUỘC: Thêm sellerId/enterpriseId cho OrderItem
        sellerId: variant.product.sellerId,
        enterpriseId: variant.product.enterpriseId,
      });

      // Thêm vào danh sách để trừ kho sau
      variantIdsToUpdate.push({ id: item.variantId, quantity: item.quantity });
    }

    // 2. 🚨 SỬA LỖI 2: Xử lý Voucher (Giả sử DTO gửi lên mảng voucherIds)
    const voucherIdsToConnect = (dto.voucherIds || []).map((id) => ({ id }));

    // 3. TODO: Gọi VoucherService để tính toán discount
    // (Hiện tại, ta tạm tính totalAmount = subtotal + shippingFee)
    const shippingFee = dto.shippingFee || 0;
    const totalAmount = subtotal + shippingFee; // (Chưa trừ discount)

    // 4. Dùng Transaction để tạo Order VÀ Trừ kho
    try {
      const order = await this.prisma.$transaction(async (tx) => {
        // 4a. Tạo Order
        const newOrder = await tx.order.create({
          data: {
            userId,
            subtotal,
            shippingFee,
            totalAmount,
            // 💡 Thêm các trường bắt buộc khác (tạm tính)
            shopDiscount: 0,
            platformDiscount: 0,
            freeshipDiscount: 0,
            totalDiscount: 0,
            status: OrderStatus.PENDING, // 👈 Dùng Enum

            // 🚨 SỬA LỖI 2: Dùng 'appliedVouchers' và 'connect'
            appliedVouchers: {
              connect: voucherIdsToConnect,
            },

            orderItems: {
              create: orderItemsData, // 👈 Dùng create thay vì createMany
            },
          },
          include: {
            orderItems: true,
            appliedVouchers: true,
          },
        });

        // 4b. Trừ kho (Cập nhật ProductVariant)
        for (const item of variantIdsToUpdate) {
          await tx.productVariant.update({
            where: { id: item.id },
            data: {
              stock: {
                decrement: item.quantity,
              },
            },
          });
        }
        
        // 4c. TODO: Cập nhật Voucher (usedCount, usedBudget)

        return newOrder;
      });

      return order;
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        // Lỗi P2025: Không tìm thấy bản ghi (ví dụ: variant)
        // Lỗi P2034: Transaction conflict (ví dụ: hết hàng)
        throw new BadRequestException(`Failed to create order: ${error.message}`);
      }
      throw error;
    }
  }

  async findAll(userId: string, role: string) {
    const where = role === 'ADMIN' ? {} : { userId };
    return this.prisma.order.findMany({
      where,
      include: { orderItems: true, appliedVouchers: true }, // 👈 Thêm appliedVouchers
    });
  }

  async findOne(id: string, userId: string, role: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: { orderItems: true, appliedVouchers: true }, // 👈 Thêm appliedVouchers
    });
    if (!order) throw new NotFoundException('Order not found');
    if (role !== 'ADMIN' && order.userId !== userId) {
      throw new ForbiddenException('Forbidden');
    }
    return order;
  }

  async updateStatus(
    id: string,
    dto: UpdateOrderStatusDto,
    userId: string,
    role: string,
  ) {
    const order = await this.findOne(id, userId, role); // 👈 Tái sử dụng findOne để kiểm tra
    return this.prisma.order.update({
      where: { id },
      data: { status: dto.status as OrderStatus },
    });
  }
}