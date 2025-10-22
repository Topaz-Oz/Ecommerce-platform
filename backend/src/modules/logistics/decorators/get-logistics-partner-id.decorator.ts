import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const GetLogisticsPartnerId = createParamDecorator(
  async (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    const logistics = await request.prisma.logisticsPartner.findUnique({
      where: { userId: user.id },
    });

    if (!logistics) {
      throw new Error('Logistics partner not found');
    }

    return logistics.id;
  },
);