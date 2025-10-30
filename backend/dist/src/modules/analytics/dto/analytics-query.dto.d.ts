export declare class AnalyticsQueryDto {
    startDate: Date;
    endDate: Date;
    sellerId?: string;
    enterpriseId?: string;
    limit?: number;
    unit?: 'day' | 'week' | 'month';
}
