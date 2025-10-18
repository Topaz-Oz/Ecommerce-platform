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
let OrdersService = class OrdersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(userId, dto) {
        let totalAmount = 0;
        const orderItems = [];
        for (const item of dto.items) {
            const product = await this.prisma.product.findUnique({ where: { id: item.productId } });
            if (!product)
                throw new common_1.NotFoundException('Product not found');
            if (product.stock < item.quantity)
                throw new common_1.BadRequestException('Not enough stock');
            totalAmount += item.price * item.quantity;
            orderItems.push({
                productId: item.productId,
                variantId: item.variantId,
                quantity: item.quantity,
                price: item.price,
            });
        }
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
    async findAll(userId, role) {
        if (role === 'ADMIN') {
            return this.prisma.order.findMany({ include: { orderItems: true } });
        }
        return this.prisma.order.findMany({ where: { userId }, include: { orderItems: true } });
    }
    async findOne(id, userId, role) {
        const order = await this.prisma.order.findUnique({ where: { id }, include: { orderItems: true } });
        if (!order)
            throw new common_1.NotFoundException('Order not found');
        if (role !== 'ADMIN' && order.userId !== userId)
            throw new common_1.ForbiddenException('Forbidden');
        return order;
    }
    async updateStatus(id, dto, userId, role) {
        const order = await this.prisma.order.findUnique({ where: { id } });
        if (!order)
            throw new common_1.NotFoundException('Order not found');
        if (role !== 'ADMIN' && order.userId !== userId)
            throw new common_1.ForbiddenException('Forbidden');
        return this.prisma.order.update({ where: { id }, data: { status: dto.status } });
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map