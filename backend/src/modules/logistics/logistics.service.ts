import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateLogisticsPartnerDto,
  UpdateLogisticsPartnerDto,
  CreateLogisticsOrderDto,
  UpdateLogisticsOrderDto,
  CalculateShippingDto,
} from './dto/logistics.dto';
import { LogisticsStatus, OrderStatus, ShipperStatus, Prisma } from '@prisma/client';
import { calculateDistance, generateTrackingCode } from '@common/utils';
import { ShipperService } from './shipper/shipper.service';

@Injectable()
export class LogisticsService {
  constructor(private prisma: PrismaService) {}

  // Logistics Partner Methods
  async createPartner(userId: string, dto: CreateLogisticsPartnerDto) {
    const existingPartner = await this.prisma.logisticsPartner.findUnique({
      where: { userId },
    });

    if (existingPartner) {
      throw new BadRequestException('User already has a logistics partner profile');
    }

    return this.prisma.logisticsPartner.create({
      data: {
        ...dto,
        userId,
      },
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

  async findAllPartners() {
    return this.prisma.logisticsPartner.findMany({
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
        orders: {
          select: {
            id: true,
            status: true,
            estimatedDelivery: true,
            order: {
              select: {
                id: true,
                totalAmount: true,
                status: true,
              },
            },
          },
        },
      },
    });
  }

  async findOnePartner(id: string) {
    const partner = await this.prisma.logisticsPartner.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
          },
        },
        orders: {
          select: {
            id: true,
            status: true,
            estimatedDelivery: true,
            order: {
              select: {
                id: true,
                totalAmount: true,
                status: true,
              },
            },
          },
        },
      },
    });

    if (!partner) {
      throw new NotFoundException(`Logistics partner with ID ${id} not found`);
    }

    return partner;
  }

  async updatePartner(id: string, dto: UpdateLogisticsPartnerDto) {
    const partner = await this.prisma.logisticsPartner.findUnique({
      where: { id },
    });

    if (!partner) {
      throw new NotFoundException(`Logistics partner with ID ${id} not found`);
    }

    return this.prisma.logisticsPartner.update({
      where: { id },
      data: dto,
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

  async deletePartner(id: string) {
    const partner = await this.prisma.logisticsPartner.findUnique({
      where: { id },
      include: { orders: true },
    });

    if (!partner) {
      throw new NotFoundException(`Logistics partner with ID ${id} not found`);
    }

    if (partner.orders.length > 0) {
      throw new BadRequestException('Cannot delete partner with existing orders');
    }

    await this.prisma.logisticsPartner.delete({
      where: { id },
    });

    return { message: 'Logistics partner deleted successfully' };
  }

  // Logistics Order Methods
  async createOrder(dto: CreateLogisticsOrderDto) {
    const order = await this.prisma.order.findUnique({
      where: { id: dto.orderId },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    const partner = await this.prisma.logisticsPartner.findUnique({
      where: { id: dto.logisticsPartnerId },
    });

    if (!partner) {
      throw new NotFoundException('Logistics partner not found');
    }

    // Generate tracking code
    const trackingCode = this.generateTrackingCode();

    const logisticsOrder = await this.prisma.logisticsOrder.create({
  data: {
    orderId: dto.orderId,
    logisticsPartnerId: dto.logisticsPartnerId,
    trackingCode,
    status: LogisticsStatus.CREATED,
    estimatedDelivery: dto.estimatedDelivery,
  } as Prisma.LogisticsOrderUncheckedCreateInput,
  include: {
    order: { include: { orderItems: true } },
    logisticsPartner: true,
  },
});

    // Update order status
    await this.prisma.order.update({
      where: { id: dto.orderId },
      data: { status: OrderStatus.SHIPPING },
    });

    return logisticsOrder;
  }

  async findAllOrders(partnerId?: string) {
    const where = partnerId ? { logisticsPartnerId: partnerId } : {};

    return this.prisma.logisticsOrder.findMany({
      where,
      include: {
        order: {
          include: {
            orderItems: true,
          },
        },
        logisticsPartner: true,
      },
    });
  }

  async findOneOrder(id: string) {
    const logisticsOrder = await this.prisma.logisticsOrder.findUnique({
      where: { id },
      include: {
        order: {
          include: {
            orderItems: true,
          },
        },
        logisticsPartner: true,
      },
    });

    if (!logisticsOrder) {
      throw new NotFoundException(`Logistics order with ID ${id} not found`);
    }

    return logisticsOrder;
  }

  async updateOrderStatus(id: string, dto: UpdateLogisticsOrderDto) {
    const logisticsOrder = await this.prisma.logisticsOrder.findUnique({
      where: { id },
      include: { order: true },
    });

    if (!logisticsOrder) {
      throw new NotFoundException(`Logistics order with ID ${id} not found`);
    }

    // Update logistics order and order status
    await this.prisma.$transaction(async (prisma) => {
      await prisma.logisticsOrder.update({
        where: { id },
        data: {
          status: dto.status,
          estimatedDelivery: dto.estimatedDelivery,
        },
      });

      // Update order status based on logistics status
      if (dto.status === LogisticsStatus.DELIVERED) {
        await prisma.order.update({
          where: { id: logisticsOrder.orderId },
          data: { status: OrderStatus.DELIVERED },
        });
      } else if (dto.status === LogisticsStatus.RETURNED) {
        await prisma.order.update({
          where: { id: logisticsOrder.orderId },
          data: { status: OrderStatus.CANCELLED },
        });
      }
    });

    return this.findOneOrder(id);
  }

  // Utility Methods
  private generateTrackingCode(): string {
    const prefix = 'TRK';
    const timestamp = Date.now().toString(36).toUpperCase();
    const random = Math.random().toString(36).substring(2, 5).toUpperCase();
    return `${prefix}${timestamp}${random}`;
  }

  async calculateShipping(dto: CalculateShippingDto) {
    // This is a simplified shipping cost calculation
    // In a real application, you would integrate with actual shipping providers
    const baseRate = 30000; // Base rate in VND
    const provinceMultiplier = 1.2; // Additional cost for inter-province shipping
    const expressMultiplier = 1.5; // Additional cost for express shipping

    let cost = baseRate;

    // Add weight-based cost
    cost += dto.weight * 10000;

    // Add province-based cost
    if (dto.fromProvince !== dto.toProvince) {
      cost *= provinceMultiplier;
    }

    // Add express shipping cost
    if (dto.express) {
      cost *= expressMultiplier;
    }

    return {
      cost: Math.round(cost),
      estimatedDays: dto.express ? 1 : 3,
    };
  }
}