import { Injectable, NotFoundException, BadRequestException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateOrderDto, UpdateOrderStatusDto } from './dto/orders.dto';
import { OrderStatus } from '@prisma/client';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

  async create(userId: string, dto: CreateOrderDto) {
    // Validate items and calculate total
    let totalAmount = 0;
    const orderItems = [];
    for (const item of dto.items) {
      const product = await this.prisma.product.findUnique({ where: { id: item.productId } });
      if (!product) throw new NotFoundException('Product not found');
      if (product.stock < item.quantity) throw new BadRequestException('Not enough stock');
      totalAmount += item.price * item.quantity;
      orderItems.push({
        productId: item.productId,
        variantId: item.variantId,
        quantity: item.quantity,
        price: item.price,
      });
    }
    // TODO: handle voucher, payment, logistics
    const order = await this.prisma.order.create({
      data: {
        userId,
        totalAmount,
        status: 'PENDING',
        voucherId: dto.voucherId,
        orderItems: { create: orderItems },
      },
      include: {
        orderItems: true,
      },
    });
    return order;
  }

  async findAll(userId: string, role: string) {
    if (role === 'ADMIN') {
      return this.prisma.order.findMany({ include: { orderItems: true } });
    }
    return this.prisma.order.findMany({ where: { userId }, include: { orderItems: true } });
  }

  async findOne(id: string, userId: string, role: string) {
    const order = await this.prisma.order.findUnique({ where: { id }, include: { orderItems: true } });
    if (!order) throw new NotFoundException('Order not found');
    if (role !== 'ADMIN' && order.userId !== userId) throw new ForbiddenException('Forbidden');
    return order;
  }
  async updateStatus(id: string, dto: UpdateOrderStatusDto, userId: string, role: string) {
    const order = await this.prisma.order.findUnique({ where: { id } });
    if (!order) throw new NotFoundException('Order not found');
    if (role !== 'ADMIN' && order.userId !== userId) throw new ForbiddenException('Forbidden');
    return this.prisma.order.update({ where: { id }, data: { status: dto.status as OrderStatus } });
  }
  }