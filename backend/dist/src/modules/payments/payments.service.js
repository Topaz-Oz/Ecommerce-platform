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
exports.PaymentsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const client_1 = require("@prisma/client");
const crypto = require("crypto");
let PaymentsService = class PaymentsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    generateSignature(params) {
        const sortedParams = Object.keys(params)
            .sort()
            .reduce((acc, key) => {
            acc[key] = params[key];
            return acc;
        }, {});
        const signData = Object.entries(sortedParams)
            .map(([key, value]) => `${key}=${value}`)
            .join('&');
        return crypto
            .createHmac('sha256', process.env.VNPAY_HASH_SECRET)
            .update(signData)
            .digest('hex');
    }
    async create(dto) {
        const order = await this.prisma.order.findUnique({
            where: { id: dto.orderId },
            include: {
                payment: true,
            },
        });
        if (!order) {
            throw new common_1.NotFoundException('Order not found');
        }
        if (order.payment) {
            throw new common_1.BadRequestException('Payment already exists for this order');
        }
        const payment = await this.prisma.payment.create({
            data: {
                orderId: dto.orderId,
                method: dto.method,
                status: client_1.PaymentStatus.PENDING,
                amount: 123456,
            },
        });
        switch (dto.method) {
            case client_1.PaymentMethod.VNPAY:
                return this.createVNPayPayment(payment, order);
            case client_1.PaymentMethod.PAYPAL:
                return this.createPayPalPayment(payment, order);
            case client_1.PaymentMethod.COD:
                return this.createCODPayment(payment, order);
            default:
                throw new common_1.BadRequestException('Invalid payment method');
        }
    }
    async createVNPayPayment(payment, order) {
        const vnpParams = {
            vnp_Version: '2.1.0',
            vnp_Command: 'pay',
            vnp_TmnCode: process.env.VNPAY_TMN_CODE,
            vnp_Locale: 'vn',
            vnp_CurrCode: 'VND',
            vnp_TxnRef: payment.id,
            vnp_OrderInfo: `Payment for order ${order.id}`,
            vnp_Amount: Math.round(order.totalAmount * 100),
            vnp_ReturnUrl: `${process.env.FRONTEND_URL}/payment/vnpay-callback`,
            vnp_IpAddr: '127.0.0.1',
            vnp_CreateDate: new Date().toISOString().replace(/[-T:]/g, '').slice(0, 14),
        };
        vnpParams['vnp_SecureHash'] = this.generateSignature(vnpParams);
        const queryString = Object.entries(vnpParams)
            .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
            .join('&');
        return Object.assign(Object.assign({}, payment), { paymentUrl: `${process.env.VNPAY_URL}?${queryString}` });
    }
    async createPayPalPayment(payment, order) {
        return Object.assign(Object.assign({}, payment), { paymentUrl: 'PayPal payment URL will be implemented' });
    }
    async createCODPayment(payment, order) {
        await this.prisma.order.update({
            where: { id: order.id },
            data: { status: client_1.OrderStatus.PROCESSING },
        });
        return payment;
    }
    async handleVNPayCallback(params) {
        const receivedSecureHash = params['vnp_SecureHash'];
        delete params['vnp_SecureHash'];
        const calculatedSecureHash = this.generateSignature(params);
        if (calculatedSecureHash !== receivedSecureHash) {
            throw new common_1.BadRequestException('Invalid signature');
        }
        const paymentId = params.vnp_OrderInfo.split(' ')[3];
        const success = params.vnp_ResponseCode === '00';
        return this.updatePayment(paymentId, {
            status: success ? client_1.PaymentStatus.SUCCESS : client_1.PaymentStatus.FAILED,
            transactionId: params.vnp_TransactionNo,
        });
    }
    async handlePayPalCallback(params) {
        return {
            message: 'PayPal callback handling will be implemented',
        };
    }
    async findAll() {
        return this.prisma.payment.findMany({
            include: {
                order: {
                    include: {
                        orderItems: true,
                    },
                },
            },
        });
    }
    async findOne(id) {
        const payment = await this.prisma.payment.findUnique({
            where: { id },
            include: {
                order: {
                    include: {
                        orderItems: true,
                    },
                },
            },
        });
        if (!payment) {
            throw new common_1.NotFoundException(`Payment with ID ${id} not found`);
        }
        return payment;
    }
    async findByOrder(orderId) {
        const payment = await this.prisma.payment.findUnique({
            where: { orderId },
            include: {
                order: {
                    include: {
                        orderItems: true,
                    },
                },
            },
        });
        if (!payment) {
            throw new common_1.NotFoundException(`Payment for order ${orderId} not found`);
        }
        return payment;
    }
    async updatePayment(id, dto) {
        const payment = await this.prisma.payment.findUnique({
            where: { id },
            include: { order: true },
        });
        if (!payment) {
            throw new common_1.NotFoundException(`Payment with ID ${id} not found`);
        }
        await this.prisma.$transaction(async (prisma) => {
            await prisma.payment.update({
                where: { id },
                data: {
                    status: dto.status,
                    transactionId: dto.transactionId,
                },
            });
            if (dto.status === client_1.PaymentStatus.SUCCESS) {
                await prisma.order.update({
                    where: { id: payment.orderId },
                    data: { status: client_1.OrderStatus.PROCESSING },
                });
            }
            else if (dto.status === client_1.PaymentStatus.FAILED) {
                await prisma.order.update({
                    where: { id: payment.orderId },
                    data: { status: client_1.OrderStatus.CANCELLED },
                });
            }
        });
        return this.findOne(id);
    }
};
exports.PaymentsService = PaymentsService;
exports.PaymentsService = PaymentsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PaymentsService);
//# sourceMappingURL=payments.service.js.map