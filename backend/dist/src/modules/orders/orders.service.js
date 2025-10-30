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
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let OrdersService = class OrdersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, dto) {
        let subtotal = 0;
        const orderItemsData = [];
        const variantIdsToUpdate = [];
        for (const item of dto.items) {
            if (!item.variantId) {
                throw new common_1.BadRequestException('All items must have a variantId');
            }
            const variant = await this.prisma.productVariant.findUnique({
                where: { id: item.variantId },
                include: { product: true },
            });
            if (!variant) {
                throw new common_1.NotFoundException(`Product Variant ${item.variantId} not found`);
            }
            if (variant.stock < item.quantity) {
                throw new common_1.BadRequestException(`Not enough stock for ${variant.product.name}`);
            }
            subtotal += variant.price * item.quantity;
            orderItemsData.push({
                productId: item.productId,
                variantId: item.variantId,
                quantity: item.quantity,
                price: variant.price,
                sellerId: variant.product.sellerId,
                enterpriseId: variant.product.enterpriseId,
            });
            variantIdsToUpdate.push({ id: item.variantId, quantity: item.quantity });
        }
        const voucherIdsToConnect = (dto.voucherIds || []).map((id) => ({ id }));
        const shippingFee = dto.shippingFee || 0;
        const totalAmount = subtotal + shippingFee;
        try {
            const order = await this.prisma.$transaction(async (tx) => {
                const newOrder = await tx.order.create({
                    data: {
                        userId,
                        subtotal,
                        shippingFee,
                        totalAmount,
                        shopDiscount: 0,
                        platformDiscount: 0,
                        freeshipDiscount: 0,
                        totalDiscount: 0,
                        status: client_1.OrderStatus.PENDING,
                        appliedVouchers: {
                            connect: voucherIdsToConnect,
                        },
                        orderItems: {
                            create: orderItemsData,
                        },
                    },
                    include: {
                        orderItems: true,
                        appliedVouchers: true,
                    },
                });
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
                return newOrder;
            });
            return order;
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                throw new common_1.BadRequestException(`Failed to create order: ${error.message}`);
            }
            throw error;
        }
    }
    async findAll(userId, role) {
        const where = role === 'ADMIN' ? {} : { userId };
        return this.prisma.order.findMany({
            where,
            include: { orderItems: true, appliedVouchers: true },
        });
    }
    async findOne(id, userId, role) {
        const order = await this.prisma.order.findUnique({
            where: { id },
            include: { orderItems: true, appliedVouchers: true },
        });
        if (!order)
            throw new common_1.NotFoundException('Order not found');
        if (role !== 'ADMIN' && order.userId !== userId) {
            throw new common_1.ForbiddenException('Forbidden');
        }
        return order;
    }
    async updateStatus(id, dto, userId, role) {
        const order = await this.findOne(id, userId, role);
        return this.prisma.order.update({
            where: { id },
            data: { status: dto.status },
        });
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map