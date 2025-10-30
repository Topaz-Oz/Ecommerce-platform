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
exports.AnalyticsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
let AnalyticsService = class AnalyticsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    getOrderItemFilter(startDate, endDate, filter) {
        const where = {
            order: {
                status: client_1.OrderStatus.DELIVERED,
                createdAt: { gte: startDate, lte: endDate },
            },
        };
        if (filter.sellerId) {
            where.sellerId = filter.sellerId;
        }
        else if (filter.enterpriseId) {
            where.enterpriseId = filter.enterpriseId;
        }
        return where;
    }
    getOrderFilter(startDate, endDate, filter) {
        const where = {
            createdAt: { gte: startDate, lte: endDate },
        };
        where.status = client_1.OrderStatus.DELIVERED;
        if (filter.sellerId) {
            where.orderItems = { some: { sellerId: filter.sellerId } };
        }
        else if (filter.enterpriseId) {
            where.orderItems = { some: { enterpriseId: filter.enterpriseId } };
        }
        return where;
    }
    async getOverviewStats(query, filter) {
        const { startDate, endDate } = query;
        const isSellerOrEnterprise = !!(filter.sellerId || filter.enterpriseId);
        const totalRevenuePromise = this.getTotalRevenue(startDate, endDate, filter);
        const totalOrdersPromise = this.prisma.order.count({
            where: this.getOrderFilter(startDate, endDate, filter),
        });
        const newCustomersPromise = isSellerOrEnterprise
            ? Promise.resolve(0)
            : this.prisma.user.count({
                where: {
                    createdAt: { gte: startDate, lte: endDate },
                    role: 'CUSTOMER',
                },
            });
        const [totalRevenue, totalOrders, newCustomers] = await Promise.all([
            totalRevenuePromise,
            totalOrdersPromise,
            newCustomersPromise,
        ]);
        return { totalRevenue, totalOrders, newCustomers };
    }
    async getTotalRevenue(startDate, endDate, filter) {
        var _a;
        if (!filter.sellerId && !filter.enterpriseId) {
            const result = await this.prisma.order.aggregate({
                _sum: { subtotal: true },
                where: this.getOrderFilter(startDate, endDate, {}),
            });
            return result._sum.subtotal || 0;
        }
        const filterColumn = filter.sellerId ? 'sellerId' : 'enterpriseId';
        const filterId = filter.sellerId || filter.enterpriseId;
        const result = await this.prisma.$queryRaw `
      SELECT SUM(oi.price * oi.quantity) as revenue
      FROM "OrderItem" AS oi
      JOIN "Order" AS o ON oi."orderId" = o.id
      WHERE o.status = 'DELIVERED'
        AND o."createdAt" BETWEEN ${startDate} AND ${endDate}
        AND oi.${client_1.Prisma.raw(`"${filterColumn}"`)} = ${filterId};
    `;
        return Number((_a = result[0]) === null || _a === void 0 ? void 0 : _a.revenue) || 0;
    }
    async getSalesRevenueOverTime(query, filter) {
        const { startDate, endDate, unit } = query;
        if (!filter.sellerId && !filter.enterpriseId) {
            const result = await this.prisma.$queryRaw `
        SELECT 
          DATE_TRUNC(${unit}, "createdAt") as date, 
          SUM("subtotal") as revenue
        FROM "Order"
        WHERE "status" = 'DELIVERED'
          AND "createdAt" BETWEEN ${startDate} AND ${endDate}
        GROUP BY date
        ORDER BY date ASC;
      `;
            return result.map((r) => (Object.assign(Object.assign({}, r), { revenue: Number(r.revenue) })));
        }
        const filterColumn = filter.sellerId ? 'sellerId' : 'enterpriseId';
        const filterId = filter.sellerId || filter.enterpriseId;
        const result = await this.prisma.$queryRaw `
      SELECT
        DATE_TRUNC(${unit}, o."createdAt") as date,
        SUM(oi.price * oi.quantity) as revenue
      FROM "OrderItem" AS oi
      JOIN "Order" AS o ON oi."orderId" = o.id
      WHERE o.status = 'DELIVERED'
        AND o."createdAt" BETWEEN ${startDate} AND ${endDate}
        AND oi.${client_1.Prisma.raw(`"${filterColumn}"`)} = ${filterId}
      GROUP BY date
      ORDER BY date ASC;
    `;
        return result.map((r) => (Object.assign(Object.assign({}, r), { revenue: Number(r.revenue) })));
    }
    async getTopSellingProducts(query, filter) {
        const { startDate, endDate, limit } = query;
        const topItems = await this.prisma.orderItem.groupBy({
            by: ['productId'],
            _sum: {
                quantity: true,
            },
            where: this.getOrderItemFilter(startDate, endDate, filter),
            orderBy: {
                _sum: {
                    quantity: 'desc',
                },
            },
            take: limit,
        });
        if (topItems.length === 0)
            return [];
        const productIds = topItems.map((item) => item.productId);
        const products = await this.prisma.product.findMany({
            where: { id: { in: productIds } },
            select: { id: true, name: true, images: true },
        });
        return topItems.map((item) => {
            const product = products.find((p) => p.id === item.productId);
            return {
                productId: item.productId,
                name: (product === null || product === void 0 ? void 0 : product.name) || 'Unknown Product',
                image: (product === null || product === void 0 ? void 0 : product.images[0]) || null,
                totalSold: item._sum.quantity || 0,
            };
        });
    }
    async getOrderStatusBreakdown(query, filter) {
        const { startDate, endDate } = query;
        const whereFilter = this.getOrderFilter(startDate, endDate, filter);
        delete whereFilter.status;
        const result = await this.prisma.order.groupBy({
            by: ['status'],
            _count: {
                _all: true,
            },
            where: whereFilter,
        });
        return result.map((r) => ({
            status: r.status,
            count: r._count._all,
        }));
    }
    async getUserBehaviorFunnel(query) {
        const { startDate, endDate } = query;
        const viewsPromise = this.prisma.userBehavior.groupBy({
            by: ['userId'],
            where: {
                type: 'VIEW',
                createdAt: { gte: startDate, lte: endDate },
            },
        });
        const cartsPromise = this.prisma.userBehavior.groupBy({
            by: ['userId'],
            where: {
                type: 'ADD_TO_CART',
                createdAt: { gte: startDate, lte: endDate },
            },
        });
        const purchasesPromise = this.prisma.order.groupBy({
            by: ['userId'],
            where: {
                status: client_1.OrderStatus.DELIVERED,
                createdAt: { gte: startDate, lte: endDate },
            },
        });
        const [views, carts, purchases] = await Promise.all([
            viewsPromise,
            cartsPromise,
            purchasesPromise,
        ]);
        return {
            views: views.length,
            addToCart: carts.length,
            purchases: purchases.length,
        };
    }
};
exports.AnalyticsService = AnalyticsService;
exports.AnalyticsService = AnalyticsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AnalyticsService);
//# sourceMappingURL=analytics.service.js.map