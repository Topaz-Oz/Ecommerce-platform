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
        const existingShipper = await this.prisma.shipper.findUnique({
            where: { email: createShipperDto.email },
        });
        if (existingShipper) {
            throw new common_1.ConflictException('Email already exists');
        }
        const hashedPassword = await bcrypt.hash(createShipperDto.password, 10);
        return this.prisma.shipper.create({
            data: Object.assign(Object.assign({}, createShipperDto), { password: hashedPassword, logisticsPartnerId }),
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
        return this.prisma.shipper.findUnique({
            where: { email },
        });
    }
    async assignOrder(orderId, shipperId) {
        const [order, shipper] = await Promise.all([
            this.prisma.logisticsOrder.findUnique({ where: { id: orderId } }),
            this.findOne(shipperId),
        ]);
        if (!order) {
            throw new common_1.NotFoundException(`Order with id ${orderId} not found`);
        }
        if (shipper.status !== client_1.ShipperStatus.AVAILABLE) {
            throw new common_1.ConflictException('Shipper is not available');
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
    async completeDelivery(orderId) {
        const order = await this.prisma.logisticsOrder.findUnique({
            where: { id: orderId },
        });
        if (!order) {
            throw new common_1.NotFoundException(`Order with id ${orderId} not found`);
        }
        return this.prisma.logisticsOrder.update({
            where: { id: orderId },
            data: {
                status: 'DELIVERED',
                deliveredTime: new Date(),
            },
        });
    }
};
exports.ShipperService = ShipperService;
exports.ShipperService = ShipperService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ShipperService);
//# sourceMappingURL=shipper.service.js.map