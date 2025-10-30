import { AnalyticsService } from './analytics.service';
import { AnalyticsQueryDto } from './dto/analytics-query.dto';
export declare class AnalyticsController {
    private readonly analyticsService;
    constructor(analyticsService: AnalyticsService);
    private getAccessFilter;
    getOverview(req: any, query: AnalyticsQueryDto): Promise<{
        totalRevenue: number;
        totalOrders: number;
        newCustomers: number;
    }>;
    getSalesRevenueOverTime(req: any, query: AnalyticsQueryDto): Promise<{
        revenue: number;
        date: Date;
    }[]>;
    getTopSellingProducts(req: any, query: AnalyticsQueryDto): Promise<{
        productId: string;
        name: string;
        image: string;
        totalSold: number;
    }[]>;
    getOrderStatusBreakdown(req: any, query: AnalyticsQueryDto): Promise<{
        status: import(".prisma/client").$Enums.OrderStatus;
        count: number;
    }[]>;
    getUserBehaviorFunnel(query: AnalyticsQueryDto): Promise<{
        views: number;
        addToCart: number;
        purchases: number;
    }>;
}
