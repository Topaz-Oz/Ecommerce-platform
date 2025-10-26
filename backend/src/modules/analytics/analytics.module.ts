// src/analytics/analytics.module.ts
import { Module } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';
import { AnalyticsController } from './analytics.controller';
import { PrismaModule } from '../prisma/prisma.module';
// import { AuthModule } from '../auth/auth.module'; // 👈 Import nếu cần Guards

@Module({
  imports: [
    PrismaModule,
    // AuthModule, // 👈 Đảm bảo bạn import AuthModule ở đây
  ],
  controllers: [AnalyticsController],
  providers: [AnalyticsService],
})
export class AnalyticsModule {}