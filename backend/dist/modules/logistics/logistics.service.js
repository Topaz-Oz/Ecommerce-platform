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
exports.LogisticsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let LogisticsService = class LogisticsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createPartner(userId, dto) {
        const existingPartner = await this.prisma.logisticsPartner.findUnique({
            where: { userId },
        });
        if (existingPartner) {
            throw new common_1.BadRequestException('User already has a logistics partner profile');
        }
        return this.prisma.logisticsPartner.create({
            data: Object.assign(Object.assign({}, dto), { userId }),
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
    async findOnePartner(id) {
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
            throw new common_1.NotFoundException(`Logistics partner with ID ${id} not found`);
        }
        return partner;
    }
    async updatePartner(id, dto) {
        const partner = await this.prisma.logisticsPartner.findUnique({
            where: { id },
        });
        if (!partner) {
            throw new common_1.NotFoundException(`Logistics partner with ID ${id} not found`);
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
    async deletePartner(id) {
        const partner = await this.prisma.logisticsPartner.findUnique({
            where: { id },
            include: { orders: true },
        });
        if (!partner) {
            throw new common_1.NotFoundException(`Logistics partner with ID ${id} not found`);
        }
        if (partner.orders.length > 0) {
            throw new common_1.BadRequestException('Cannot delete partner with existing orders');
        }
        await this.prisma.logisticsPartner.delete({
            where: { id },
        });
        return { message: 'Logistics partner deleted successfully' };
    }
    async createOrder(dto) {
        const order = await this.prisma.order.findUnique({
            where: { id: dto.orderId },
        });
        if (!order) {
            throw new common_1.NotFoundException('Order not found');
        }
        const partner = await this.prisma.logisticsPartner.findUnique({
            where: { id: dto.logisticsPartnerId },
        });
        if (!partner) {
            throw new common_1.NotFoundException('Logistics partner not found');
        }
        const trackingCode = this.generateTrackingCode();
        const logisticsOrder = await this.prisma.logisticsOrder.create({
            data: {
                orderId: dto.orderId,
                logisticsPartnerId: dto.logisticsPartnerId,
                trackingCode,
                status: client_1.LogisticsStatus.CREATED,
                estimatedDelivery: dto.estimatedDelivery,
            },
            include: {
                order: {
                    include: {
                        orderItems: true,
                    },
                },
                logisticsPartner: true,
            },
        });
        await this.prisma.order.update({
            where: { id: dto.orderId },
            data: { status: client_1.OrderStatus.SHIPPING },
        });
        return logisticsOrder;
    }
    async findAllOrders(partnerId) {
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
    async findOneOrder(id) {
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
            throw new common_1.NotFoundException(`Logistics order with ID ${id} not found`);
        }
        return logisticsOrder;
    }
    async updateOrderStatus(id, dto) {
        const logisticsOrder = await this.prisma.logisticsOrder.findUnique({
            where: { id },
            include: { order: true },
        });
        if (!logisticsOrder) {
            throw new common_1.NotFoundException(`Logistics order with ID ${id} not found`);
        }
        await this.prisma.$transaction(async (prisma) => {
            await prisma.logisticsOrder.update({
                where: { id },
                data: {
                    status: dto.status,
                    estimatedDelivery: dto.estimatedDelivery,
                },
            });
            if (dto.status === client_1.LogisticsStatus.DELIVERED) {
                await prisma.order.update({
                    where: { id: logisticsOrder.orderId },
                    data: { status: client_1.OrderStatus.DELIVERED },
                });
            }
            else if (dto.status === client_1.LogisticsStatus.RETURNED) {
                await prisma.order.update({
                    where: { id: logisticsOrder.orderId },
                    data: { status: client_1.OrderStatus.CANCELLED },
                });
            }
        });
        return this.findOneOrder(id);
    }
    generateTrackingCode() {
        const prefix = 'TRK';
        const timestamp = Date.now().toString(36).toUpperCase();
        const random = Math.random().toString(36).substring(2, 5).toUpperCase();
        return `${prefix}${timestamp}${random}`;
    }
    async calculateShipping(dto) {
        const baseRate = 30000;
        const provinceMultiplier = 1.2;
        const expressMultiplier = 1.5;
        let cost = baseRate;
        cost += dto.weight * 10000;
        if (dto.fromProvince !== dto.toProvince) {
            cost *= provinceMultiplier;
        }
        if (dto.express) {
            cost *= expressMultiplier;
        }
        return {
            cost: Math.round(cost),
            estimatedDays: dto.express ? 1 : 3,
        };
    }
};
exports.LogisticsService = LogisticsService;
exports.LogisticsService = LogisticsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LogisticsService);
//# sourceMappingURL=logistics.service.js.map