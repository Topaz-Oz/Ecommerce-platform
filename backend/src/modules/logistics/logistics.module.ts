import { Module } from '@nestjs/common';
import { LogisticsService } from './logistics.service';
import { LogisticsController } from './logistics.controller';
import { ShipperModule } from './shipper/shipper.module';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule, ShipperModule],
  controllers: [LogisticsController],
  providers: [LogisticsService],
  exports: [LogisticsService, ShipperModule],
})
export class LogisticsModule {}