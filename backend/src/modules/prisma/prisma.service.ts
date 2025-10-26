import {
  Injectable,
  OnModuleInit,
  OnModuleDestroy,
  Logger,
} from '@nestjs/common';
import {
  PrismaClient,
  Prisma,
  LogisticsStatus,
  ShipperStatus,
} from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  private readonly logger = new Logger(PrismaService.name);

  constructor() {
    super({
      log: [
        { emit: 'event', level: 'query' },
        { emit: 'event', level: 'error' },
        { emit: 'event', level: 'warn' },
      ],
    });
  }

  async onModuleInit() {
    await this.$connect();
    this.logger.log('✅ Prisma connected');

    // 🧠 Event logging an toàn type
    (this as any).$on('query', (event: Prisma.QueryEvent) => {
      if ('query' in event) {
        this.logger.debug(`Query: ${event.query}`);
        this.logger.debug(`Params: ${event.params}`);
        this.logger.debug(`Duration: ${event.duration}ms`);
      }
    });

    (this as any).$on('error', (event: Prisma.LogEvent) =>
      this.logger.error(event.message),
    );
    (this as any).$on('warn', (event: Prisma.LogEvent) =>
      this.logger.warn(event.message),
    );

    // ✅ Soft Delete Middleware
    this.registerSoftDeleteMiddleware();
  }

  async onModuleDestroy() {
    await this.$disconnect();
    this.logger.log('🧹 Prisma disconnected');
  }

  private registerSoftDeleteMiddleware() {
    const self = this as unknown as PrismaClient;

    if (typeof (self as any).$use === 'function') {
      (self as any).$use(async (params: any, next: any) => {
        if (params.action === 'delete') {
          params.action = 'update';
          params.args['data'] = { active: false };
        }

        if (params.action === 'deleteMany') {
          params.action = 'updateMany';
          params.args['data'] = { ...(params.args.data || {}), active: false };
        }

        return next(params);
      });
      this.logger.log('🧩 Soft delete middleware enabled');
    } else {
      this.logger.warn(
        '⚠️ Prisma middleware ($use) is not available on this version.',
      );
    }
  }

  // 📦 Logistics Helper Methods
  async findAvailableShippers(
    logisticsPartnerId: string,
    pickupLocation: { latitude: number; longitude: number },
    deliveryRange: number = 5.0,
  ) {
    return this.shipper.findMany({
      where: {
        logisticsPartnerId,
        status: ShipperStatus.AVAILABLE,
        active: true,
      },
      orderBy: { rating: 'desc' },
    });
  }

  async updateShipperStatus(shipperId: string, status: ShipperStatus) {
    return this.shipper.update({
      where: { id: shipperId },
      data: { status },
    });
  }

  async updateOrderStatus(
    orderId: string,
    status: LogisticsStatus,
    data: Prisma.LogisticsOrderUpdateInput = {},
  ) {
    return this.logisticsOrder.update({
      where: { id: orderId },
      data: { status, ...data },
    });
  }

  async calculateDeliveryStats(shipperId: string) {
    const deliveredOrders = await this.logisticsOrder.count({
      where: { shipperId, status: LogisticsStatus.DELIVERED },
    });

    const avgRating = await this.logisticsOrder.aggregate({
      where: {
        shipperId,
        rating: { not: null },
      },
      _avg: { rating: true },
    });

    return {
      totalDeliveries: deliveredOrders,
      averageRating: avgRating._avg.rating ?? 0,
    };
  }
}
