import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsEnum } from 'class-validator';
import { PaymentMethod, PaymentStatus } from '@prisma/client';

export class CreatePaymentDto {
  @ApiProperty()
  @IsString()
  orderId: string;

  @ApiProperty({ enum: PaymentMethod })
  @IsEnum(PaymentMethod)
  method: PaymentMethod;
}

export class UpdatePaymentDto {
  @ApiProperty({ enum: PaymentStatus })
  @IsEnum(PaymentStatus)
  status: PaymentStatus;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  transactionId?: string;
}

export class VNPayCallbackDto {
  @ApiProperty()
  @IsString()
  vnp_TransactionNo: string;

  @ApiProperty()
  @IsString()
  vnp_ResponseCode: string;

  @ApiProperty()
  @IsString()
  vnp_Amount: string;

  @ApiProperty()
  @IsString()
  vnp_OrderInfo: string;
}

export class PayPalCallbackDto {
  @ApiProperty()
  @IsString()
  paymentId: string;

  @ApiProperty()
  @IsString()
  PayerID: string;

  @ApiProperty()
  @IsString()
  token: string;
}