// src/analytics/analytics.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { OrderStatus, Prisma } from '@prisma/client';
import { AnalyticsQueryDto } from './dto/analytics-query.dto';

// Định nghĩa kiểu trả về của filter (cho nội bộ service)
type AccessFilter = {
  sellerId?: string;
  enterpriseId?: string;
};

@Injectable()
export class AnalyticsService {
  constructor(private prisma: PrismaService) {}

  /**
   * Helper tạo bộ lọc WHERE cho OrderItem (dùng nhiều lần)
   */
  private getOrderItemFilter(
    startDate: Date,
    endDate: Date,
    filter: AccessFilter,
  ): Prisma.OrderItemWhereInput {
    const where: Prisma.OrderItemWhereInput = {
      order: {
        status: OrderStatus.DELIVERED,
        createdAt: { gte: startDate, lte: endDate },
      },
    };

    if (filter.sellerId) {
      where.sellerId = filter.sellerId;
    } else if (filter.enterpriseId) {
      where.enterpriseId = filter.enterpriseId;
    }
    return where;
  }

  /**
   * Helper tạo bộ lọc WHERE cho Order (dùng nhiều lần)
   */
  private getOrderFilter(
    startDate: Date,
    endDate: Date,
    filter: AccessFilter,
  ): Prisma.OrderWhereInput {
    const where: Prisma.OrderWhereInput = {
      createdAt: { gte: startDate, lte: endDate },
    };

    // Chỉ lọc đơn thành công cho Doanh thu, Đơn hàng
    where.status = OrderStatus.DELIVERED;

    if (filter.sellerId) {
      where.orderItems = { some: { sellerId: filter.sellerId } };
    } else if (filter.enterpriseId) {
      where.orderItems = { some: { enterpriseId: filter.enterpriseId } };
    }
    return where;
  }

  // ==========================================
  // 1. KPI TỔNG QUAN
  // ==========================================
  async getOverviewStats(query: AnalyticsQueryDto, filter: AccessFilter) {
    const { startDate, endDate } = query;
    const isSellerOrEnterprise = !!(filter.sellerId || filter.enterpriseId);

    // Xây dựng các promise
    const totalRevenuePromise = this.getTotalRevenue(
      startDate,
      endDate,
      filter,
    );
    const totalOrdersPromise = this.prisma.order.count({
      where: this.getOrderFilter(startDate, endDate, filter),
    });
    const newCustomersPromise = isSellerOrEnterprise
      ? Promise.resolve(0) // Seller không cần xem số liệu này
      : this.prisma.user.count({
          where: {
            createdAt: { gte: startDate, lte: endDate },
            role: 'CUSTOMER',
          },
        });

    // Chạy song song
    const [totalRevenue, totalOrders, newCustomers] = await Promise.all([
      totalRevenuePromise,
      totalOrdersPromise,
      newCustomersPromise,
    ]);

    return { totalRevenue, totalOrders, newCustomers };
  }

  /**
   * Service con tính tổng doanh thu (GMV)
   * Admin: SUM(Order.subtotal)
   * Seller: SUM(OrderItem.price * OrderItem.quantity)
   */
  private async getTotalRevenue(
    startDate: Date,
    endDate: Date,
    filter: AccessFilter,
  ) {
    // Nếu là Admin xem toàn sàn (không filter)
    if (!filter.sellerId && !filter.enterpriseId) {
      const result = await this.prisma.order.aggregate({
        _sum: { subtotal: true },
        where: this.getOrderFilter(startDate, endDate, {}),
      });
      return result._sum.subtotal || 0;
    }

    // Nếu là Seller, Enterprise, hoặc Admin đang lọc
    // Bắt buộc dùng $queryRaw để tính SUM(price * quantity)
    const filterColumn = filter.sellerId ? 'sellerId' : 'enterpriseId';
    const filterId = filter.sellerId || filter.enterpriseId;

    const result: { revenue: number }[] = await this.prisma.$queryRaw`
      SELECT SUM(oi.price * oi.quantity) as revenue
      FROM "OrderItem" AS oi
      JOIN "Order" AS o ON oi."orderId" = o.id
      WHERE o.status = 'DELIVERED'
        AND o."createdAt" BETWEEN ${startDate} AND ${endDate}
        AND oi.${Prisma.raw(`"${filterColumn}"`)} = ${filterId};
    `;

    return Number(result[0]?.revenue) || 0;
  }

  // ==========================================
  // 2. BIỂU ĐỒ DOANH THU THEO THỜI GIAN
  // ==========================================
  async getSalesRevenueOverTime(query: AnalyticsQueryDto, filter: AccessFilter) {
    const { startDate, endDate, unit } = query;

    // Admin xem toàn sàn
    if (!filter.sellerId && !filter.enterpriseId) {
      const result: { date: Date; revenue: number }[] =
        await this.prisma.$queryRaw`
        SELECT 
          DATE_TRUNC(${unit}, "createdAt") as date, 
          SUM("subtotal") as revenue
        FROM "Order"
        WHERE "status" = 'DELIVERED'
          AND "createdAt" BETWEEN ${startDate} AND ${endDate}
        GROUP BY date
        ORDER BY date ASC;
      `;
      return result.map((r) => ({ ...r, revenue: Number(r.revenue) }));
    }

    // Seller, Enterprise, hoặc Admin đang lọc
    const filterColumn = filter.sellerId ? 'sellerId' : 'enterpriseId';
    const filterId = filter.sellerId || filter.enterpriseId;

    const result: { date: Date; revenue: number }[] =
      await this.prisma.$queryRaw`
      SELECT
        DATE_TRUNC(${unit}, o."createdAt") as date,
        SUM(oi.price * oi.quantity) as revenue
      FROM "OrderItem" AS oi
      JOIN "Order" AS o ON oi."orderId" = o.id
      WHERE o.status = 'DELIVERED'
        AND o."createdAt" BETWEEN ${startDate} AND ${endDate}
        AND oi.${Prisma.raw(`"${filterColumn}"`)} = ${filterId}
      GROUP BY date
      ORDER BY date ASC;
    `;
    return result.map((r) => ({ ...r, revenue: Number(r.revenue) }));
  }

  // ==========================================
  // 3. TOP SẢN PHẨM BÁN CHẠY
  // ==========================================
  async getTopSellingProducts(query: AnalyticsQueryDto, filter: AccessFilter) {
    const { startDate, endDate, limit } = query;

    // 1. Tính toán top
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

    if (topItems.length === 0) return [];

    // 2. Lấy thông tin
    const productIds = topItems.map((item) => item.productId);
    const products = await this.prisma.product.findMany({
      where: { id: { in: productIds } },
      select: { id: true, name: true, images: true },
    });

    // 3. Gộp kết quả
    return topItems.map((item) => {
      const product = products.find((p) => p.id === item.productId);
      return {
        productId: item.productId,
        name: product?.name || 'Unknown Product',
        image: product?.images[0] || null,
        totalSold: item._sum.quantity || 0,
      };
    });
  }

  // ==========================================
  // 4. PHÂN TÍCH TRẠNG THÁI ĐƠN HÀNG
  // ==========================================
  async getOrderStatusBreakdown(query: AnalyticsQueryDto, filter: AccessFilter) {
    const { startDate, endDate } = query;

    // Lấy filter cho Order, nhưng bỏ qua status 'DELIVERED'
    const whereFilter = this.getOrderFilter(startDate, endDate, filter);
    delete whereFilter.status; // Lấy tất cả status

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

  // ==========================================
  // 5. PHỄU HÀNH VI (ADMIN ONLY)
  // ==========================================
  async getUserBehaviorFunnel(query: AnalyticsQueryDto) {
    const { startDate, endDate } = query;

    // Dùng groupBy để đếm số user duy nhất (unique userId)
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
        status: OrderStatus.DELIVERED,
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
}