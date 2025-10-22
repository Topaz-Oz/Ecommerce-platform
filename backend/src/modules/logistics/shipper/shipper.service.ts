import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '@modules/prisma/prisma.service';
import { LogisticsStatus, ShipperStatus, Prisma } from '@prisma/client';
import * as bcrypt from 'bcrypt';
import { CreateShipperDto, UpdateShipperDto, UpdateLocationDto } from './shipper.dto';
import { calculateDistance, validateLocation } from '@common/utils';

@Injectable()
export class ShipperService {
  constructor(private prisma: PrismaService) {}

  async create(logisticsPartnerId: string, createShipperDto: CreateShipperDto) {
    const existingShipper = await this.prisma.shipper.findUnique({
      where: { email: createShipperDto.email },
    });

    if (existingShipper) {
      throw new ConflictException('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(createShipperDto.password, 10);

    return this.prisma.shipper.create({
      data: {
        ...createShipperDto,
        password: hashedPassword,
        logisticsPartnerId,
      },
    });
  }

  async update(id: string, updateShipperDto: UpdateShipperDto) {
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

  async findByEmail(email: string) {
    return this.prisma.shipper.findUnique({
      where: { email },
    });
  }

  async assignOrder(orderId: string, shipperId: string) {
    const [order, shipper] = await Promise.all([
      this.prisma.logisticsOrder.findUnique({ where: { id: orderId } }),
      this.findOne(shipperId),
    ]);

    if (!order) {
      throw new NotFoundException(`Order with id ${orderId} not found`);
    }

    //import { ShipperStatus } from '@prisma/client';

if (shipper.status !== ShipperStatus.AVAILABLE) {
  throw new ConflictException('Shipper is not available');
}


    return this.prisma.logisticsOrder.update({
      where: { id: orderId },
      data: {
        shipperId,
        status: 'PICKED_UP',
        pickupTime: new Date(),
      },
    });
  }

  async completeDelivery(orderId: string) {
    const order = await this.prisma.logisticsOrder.findUnique({
      where: { id: orderId },
    });

    if (!order) {
      throw new NotFoundException(`Order with id ${orderId} not found`);
    }

    return this.prisma.logisticsOrder.update({
      where: { id: orderId },
      data: {
        status: 'DELIVERED',
        deliveredTime: new Date(),
      },
    });
  }
}