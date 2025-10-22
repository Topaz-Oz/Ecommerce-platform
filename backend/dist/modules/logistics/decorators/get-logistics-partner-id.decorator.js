"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetLogisticsPartnerId = void 0;
const common_1 = require("@nestjs/common");
exports.GetLogisticsPartnerId = (0, common_1.createParamDecorator)(async (data, ctx) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    const logistics = await request.prisma.logisticsPartner.findUnique({
        where: { userId: user.id },
    });
    if (!logistics) {
        throw new Error('Logistics partner not found');
    }
    return logistics.id;
});
//# sourceMappingURL=get-logistics-partner-id.decorator.js.map