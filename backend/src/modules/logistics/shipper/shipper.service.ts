import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service'; // 👈 Sửa đường dẫn nếu cần
import { Role, ShipperStatus, Prisma, LogisticsStatus } from '@prisma/client'; // 👈 Thêm Role
import * as bcrypt from 'bcrypt';
import {
  CreateShipperDto,
  UpdateShipperDto,
  UpdateLocationDto,
} from './shipper.dto';
// import { calculateDistance, validateLocation } from '@common/utils'; // (Giữ lại nếu bạn có)

@Injectable()
export class ShipperService {
  constructor(private prisma: PrismaService) {}

  /**
   * 🚀 LOGIC ĐÃ SỬA:
   * Tạo một User (vai trò SHIPPER) và một Shipper (liên kết) cùng lúc.
   */
  async create(
    logisticsPartnerId: string,
    createShipperDto: CreateShipperDto,
  ) {
    // 1. Tách DTO: Lấy thông tin cho User và thông tin cho Shipper
    const {
      email,
      password,
      name,
      phone,
      avatar,
      deliveryRange, //
    } = createShipperDto;

    // 2. Kiểm tra email trên model User, KHÔNG phải Shipper
    const existingUser = await this.prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new ConflictException('Email already exists in User table');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Dùng transaction để đảm bảo tạo User và Shipper cùng lúc
    return this.prisma.$transaction(async (tx) => {
      // 3a. Tạo User
      const user = await tx.user.create({
        data: {
          email,
          password: hashedPassword,
          name,
          phone,
          avatar, // (Nếu có)
          role: Role.SHIPPER, // 👈 Gán vai trò
        },
      });

      // 3b. Tạo Shipper và liên kết với User vừa tạo
      const shipper = await tx.shipper.create({
        data: {
          userId: user.id, // 👈 Liên kết qua userId
          logisticsPartnerId,
          status: ShipperStatus.AVAILABLE,
          deliveryRange: deliveryRange || 5.0,
          // ❌ Xóa: ...createShipperDto, password
        },
      });

      return { ...shipper, user }; // Trả về shipper và thông tin user
    });
  }

  async update(id: string, updateShipperDto: UpdateShipperDto) {
    // ❗️ Lưu ý: updateShipperDto chỉ nên chứa các trường
    // của Shipper (status, deliveryRange, active),
    // KHÔNG chứa (email, name...).
    await this.findOne(id);
    return this.prisma.shipper.update({
      where: { id },
      data: updateShipperDto,
    });
  }

  async updateLocation(id: string, updateLocationDto: UpdateLocationDto) {
    await this.findOne(id);
    return this.prisma.shipper.update({
      where: { id },
      data: {
        currentLocation: { ...updateLocationDto },
      },
    });
  }

  async findAll(logisticsPartnerId: string) {
    return this.prisma.shipper.findMany({
      where: { logisticsPartnerId },
      include: {
        user: true, // 👈 Nên include user để lấy tên, email...
        assignedOrders: {
          include: {
            order: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    const shipper = await this.prisma.shipper.findUnique({
      where: { id },
      include: {
        user: true, // 👈 Nên include user
        assignedOrders: {
          include: {
            order: true,
          },
        },
      },
    });

    if (!shipper) {
      throw new NotFoundException(`Shipper with id ${id} not found`);
    }

    return shipper;
  }

  /**
   * 🚀 LOGIC ĐÃ SỬA:
   * Tìm Shipper bằng email của User liên quan.
   */
  async findByEmail(email: string) {
    return this.prisma.shipper.findFirst({
      where: {
        user: {
          // 👈 Lọc lồng vào model User
          email: email,
        },
      },
      include: {
        user: true,
      },
    });
  }

  async assignOrder(orderId: string, shipperId: string) {
    const [logisticsOrder, shipper] = await Promise.all([
      this.prisma.logisticsOrder.findUnique({ where: { id: orderId } }),
      this.findOne(shipperId), // 👈 Hàm findOne đã lấy status
    ]);

    if (!logisticsOrder) {
      throw new NotFoundException(`Order with id ${orderId} not found`);
    }

    if (shipper.status !== ShipperStatus.AVAILABLE) {
      throw new ConflictException('Shipper is not available');
    }

    // Cập nhật trạng thái Shipper và Order
    const updatedOrder = await this.prisma.logisticsOrder.update({
      where: { id: orderId },
      data: {
        shipperId,
        status: LogisticsStatus.PICKED_UP, // 👈 Dùng Enum
        pickupTime: new Date(),
      },
    });

    await this.prisma.shipper.update({
      where: { id: shipperId },
      data: { status: ShipperStatus.BUSY },
    });

    return updatedOrder;
  }

  async completeDelivery(orderId: string) {
    const order = await this.prisma.logisticsOrder.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      throw new NotFoundException(`Order with id ${orderId} not found`);
    }
    if (!order.shipperId) {
      throw new BadRequestException('Order has no shipper assigned');
    }

    // Cập nhật trạng thái Order và Shipper
    const updatedOrder = await this.prisma.logisticsOrder.update({
      where: { id: orderId },
      data: {
        status: LogisticsStatus.DELIVERED, // 👈 Dùng Enum
        deliveredTime: new Date(),
      },
    });

    // Set shipper về AVAILABLE
    await this.prisma.shipper.update({
      where: { id: order.shipperId },
      data: { status: ShipperStatus.AVAILABLE },
    });

    return updatedOrder;
  }
}