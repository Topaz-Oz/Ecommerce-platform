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
exports.ShipperService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const client_1 = require("@prisma/client");
const bcrypt = require("bcrypt");
let ShipperService = class ShipperService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(logisticsPartnerId, createShipperDto) {
        const { email, password, name, phone, avatar, deliveryRange, } = createShipperDto;
        const existingUser = await this.prisma.user.findUnique({
            where: { email },
        });
        if (existingUser) {
            throw new common_1.ConflictException('Email already exists in User table');
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        return this.prisma.$transaction(async (tx) => {
            const user = await tx.user.create({
                data: {
                    email,
                    password: hashedPassword,
                    name,
                    phone,
                    avatar,
                    role: client_1.Role.SHIPPER,
                },
            });
            const shipper = await tx.shipper.create({
                data: {
                    userId: user.id,
                    logisticsPartnerId,
                    status: client_1.ShipperStatus.AVAILABLE,
                    deliveryRange: deliveryRange || 5.0,
                },
            });
            return Object.assign(Object.assign({}, shipper), { user });
        });
    }
    async update(id, updateShipperDto) {
        await this.findOne(id);
        return this.prisma.shipper.update({
            where: { id },
            data: updateShipperDto,
        });
    }
    async updateLocation(id, updateLocationDto) {
        await this.findOne(id);
        return this.prisma.shipper.update({
            where: { id },
            data: {
                currentLocation: Object.assign({}, updateLocationDto),
            },
        });
    }
    async findAll(logisticsPartnerId) {
        return this.prisma.shipper.findMany({
            where: { logisticsPartnerId },
            include: {
                user: true,
                assignedOrders: {
                    include: {
                        order: true,
                    },
                },
            },
        });
    }
    async findOne(id) {
        const shipper = await this.prisma.shipper.findUnique({
            where: { id },
            include: {
                user: true,
                assignedOrders: {
                    include: {
                        order: true,
                    },
                },
            },
        });
        if (!shipper) {
            throw new common_1.NotFoundException(`Shipper with id ${id} not found`);
        }
        return shipper;
    }
    async findByEmail(email) {
        return this.prisma.shipper.findFirst({
            where: {
                user: {
                    email: email,
                },
            },
            include: {
                user: true,
            },
        });
    }
    async assignOrder(orderId, shipperId) {
        const [logisticsOrder, shipper] = await Promise.all([
            this.prisma.logisticsOrder.findUnique({ where: { id: orderId } }),
            this.findOne(shipperId),
        ]);
        if (!logisticsOrder) {
            throw new common_1.NotFoundException(`Order with id ${orderId} not found`);
        }
        if (shipper.status !== client_1.ShipperStatus.AVAILABLE) {
            throw new common_1.ConflictException('Shipper is not available');
        }
        const updatedOrder = await this.prisma.logisticsOrder.update({
            where: { id: orderId },
            data: {
                shipperId,
                status: client_1.LogisticsStatus.PICKED_UP,
                pickupTime: new Date(),
            },
        });
        await this.prisma.shipper.update({
            where: { id: shipperId },
            data: { status: client_1.ShipperStatus.BUSY },
        });
        return updatedOrder;
    }
    async completeDelivery(orderId) {
        const order = await this.prisma.logisticsOrder.findUnique({
            where: { id: orderId },
        });
        if (!order) {
            throw new common_1.NotFoundException(`Order with id ${orderId} not found`);
        }
        if (!order.shipperId) {
            throw new common_1.BadRequestException('Order has no shipper assigned');
        }
        const updatedOrder = await this.prisma.logisticsOrder.update({
            where: { id: orderId },
            data: {
                status: client_1.LogisticsStatus.DELIVERED,
                deliveredTime: new Date(),
            },
        });
        await this.prisma.shipper.update({
            where: { id: order.shipperId },
            data: { status: client_1.ShipperStatus.AVAILABLE },
        });
        return updatedOrder;
    }
};
exports.ShipperService = ShipperService;
exports.ShipperService = ShipperService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ShipperService);
//# sourceMappingURL=shipper.service.js.map