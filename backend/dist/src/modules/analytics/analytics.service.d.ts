import { PrismaService } from '../prisma/prisma.service';
import { AnalyticsQueryDto } from './dto/analytics-query.dto';
type AccessFilter = {
    sellerId?: string;
    enterpriseId?: string;
};
export declare class AnalyticsService {
    private prisma;
    constructor(prisma: PrismaService);
    private getOrderItemFilter;
    private getOrderFilter;
    getOverviewStats(query: AnalyticsQueryDto, filter: AccessFilter): Promise<{
        totalRevenue: number;
        totalOrders: number;
        newCustomers: number;
    }>;
    private getTotalRevenue;
    getSalesRevenueOverTime(query: AnalyticsQueryDto, filter: AccessFilter): Promise<{
        revenue: number;
        date: Date;
    }[]>;
    getTopSellingProducts(query: AnalyticsQueryDto, filter: AccessFilter): Promise<{
        productId: string;
        name: string;
        image: string;
        totalSold: number;
    }[]>;
    getOrderStatusBreakdown(query: AnalyticsQueryDto, filter: AccessFilter): Promise<{
        status: import(".prisma/client").$Enums.OrderStatus;
        count: number;
    }[]>;
    getUserBehaviorFunnel(query: AnalyticsQueryDto): Promise<{
        views: number;
        addToCart: number;
        purchases: number;
    }>;
}
export {};
