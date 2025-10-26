import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePaymentDto, UpdatePaymentDto, VNPayCallbackDto, PayPalCallbackDto } from './dto/payments.dto';
import { PaymentMethod, PaymentStatus, OrderStatus } from '@prisma/client';
import * as crypto from 'crypto';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}

  private generateSignature(params: any): string {
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

  async create(dto: CreatePaymentDto) {
    const order = await this.prisma.order.findUnique({
      where: { id: dto.orderId },
      include: {
        payment: true,
      },
    });

    if (!order) {
      throw new NotFoundException('Order not found');
    }

    if (order.payment) {
      throw new BadRequestException('Payment already exists for this order');
    }

    const payment = await this.prisma.payment.create({
      data: {
        orderId: dto.orderId,
        method: dto.method,
        status: PaymentStatus.PENDING,
        amount: 123456,
      },
    });

    switch (dto.method) {
      case PaymentMethod.VNPAY:
        return this.createVNPayPayment(payment, order);
      case PaymentMethod.PAYPAL:
        return this.createPayPalPayment(payment, order);
      case PaymentMethod.COD:
        return this.createCODPayment(payment, order);
      default:
        throw new BadRequestException('Invalid payment method');
    }
  }

  private async createVNPayPayment(payment: any, order: any) {
    const vnpParams = {
      vnp_Version: '2.1.0',
      vnp_Command: 'pay',
      vnp_TmnCode: process.env.VNPAY_TMN_CODE,
      vnp_Locale: 'vn',
      vnp_CurrCode: 'VND',
      vnp_TxnRef: payment.id,
      vnp_OrderInfo: `Payment for order ${order.id}`,
      vnp_Amount: Math.round(order.totalAmount * 100), // Convert to VND with no decimal
      vnp_ReturnUrl: `${process.env.FRONTEND_URL}/payment/vnpay-callback`,
      vnp_IpAddr: '127.0.0.1', // Should be replaced with actual IP in production
      vnp_CreateDate: new Date().toISOString().replace(/[-T:]/g, '').slice(0, 14),
    };

    // Generate signature
    vnpParams['vnp_SecureHash'] = this.generateSignature(vnpParams);

    // Generate payment URL
    const queryString = Object.entries(vnpParams)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join('&');

    return {
      ...payment,
      paymentUrl: `${process.env.VNPAY_URL}?${queryString}`,
    };
  }

  private async createPayPalPayment(payment: any, order: any) {
    // TODO: Implement PayPal payment creation
    // This would involve using the PayPal SDK to create a payment
    // and return the approval URL
    return {
      ...payment,
      paymentUrl: 'PayPal payment URL will be implemented',
    };
  }

  private async createCODPayment(payment: any, order: any) {
    // For COD, we just mark the payment as pending and update the order status
    await this.prisma.order.update({
      where: { id: order.id },
      data: { status: OrderStatus.PROCESSING },
    });

    return payment;
  }

  async handleVNPayCallback(params: VNPayCallbackDto) {
    // Verify the callback parameters
    const receivedSecureHash = params['vnp_SecureHash'];
    delete params['vnp_SecureHash'];

    const calculatedSecureHash = this.generateSignature(params);
    if (calculatedSecureHash !== receivedSecureHash) {
      throw new BadRequestException('Invalid signature');
    }

    const paymentId = params.vnp_OrderInfo.split(' ')[3]; // Extract payment ID
    const success = params.vnp_ResponseCode === '00';

    return this.updatePayment(paymentId, {
      status: success ? PaymentStatus.SUCCESS : PaymentStatus.FAILED,
      transactionId: params.vnp_TransactionNo,
    });
  }

  async handlePayPalCallback(params: PayPalCallbackDto) {
    // TODO: Implement PayPal callback handling
    // This would involve verifying the payment with PayPal
    // and updating the payment status accordingly
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

  async findOne(id: string) {
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
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }

    return payment;
  }

  async findByOrder(orderId: string) {
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
      throw new NotFoundException(`Payment for order ${orderId} not found`);
    }

    return payment;
  }

  async updatePayment(id: string, dto: UpdatePaymentDto) {
    const payment = await this.prisma.payment.findUnique({
      where: { id },
      include: { order: true },
    });

    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }

    // Update payment and order status
    await this.prisma.$transaction(async (prisma) => {
      await prisma.payment.update({
        where: { id },
        data: {
          status: dto.status,
          transactionId: dto.transactionId,
        },
      });

      // Update order status based on payment status
      if (dto.status === PaymentStatus.SUCCESS) {
        await prisma.order.update({
          where: { id: payment.orderId },
          data: { status: OrderStatus.PROCESSING },
        });
      } else if (dto.status === PaymentStatus.FAILED) {
        await prisma.order.update({
          where: { id: payment.orderId },
          data: { status: OrderStatus.CANCELLED },
        });
      }
    });

    return this.findOne(id);
  }
}