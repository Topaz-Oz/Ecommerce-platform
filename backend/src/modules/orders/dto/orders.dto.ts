import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsArray,
  IsEnum,
  ValidateNested,
  Min,
  IsNotEmpty,
} from 'class-validator';
import { Type } from 'class-transformer';
import { OrderStatus, PaymentMethod } from '@prisma/client'; // 👈 Import Enums

/**
 * 🚀 DTO ĐÃ SỬA:
 * - Bỏ 'price' (Service sẽ tự lấy giá từ DB)
 * - 'variantId' là bắt buộc
 */
export class CreateOrderItemDto {
  @ApiProperty()
  @IsString()
  productId: string;

  @ApiProperty({ description: 'ID của ProductVariant' })
  @IsString()
  @IsNotEmpty() // 👈 Bắt buộc
  variantId: string;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  quantity: number;

  // ❌ Đã XÓA 'price'. Service sẽ tự lấy giá từ 'variant.price'.
}

/**
 * 🚀 DTO ĐÃ SỬA:
 * - 'voucherId' -> 'voucherIds' (mảng)
 * - Thêm 'shippingFee'
 * - 'paymentMethod' dùng Enum
 */
export class CreateOrderDto {
  @ApiProperty({ type: [CreateOrderItemDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateOrderItemDto)
  items: CreateOrderItemDto[];

  @ApiPropertyOptional({
    description: 'Mảng các ID voucher (Shop, Platform, Freeship)',
    example: ['voucher-id-1', 'voucher-id-2'],
  })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  voucherIds?: string[]; // 👈 Đã sửa

  @ApiProperty({ description: 'Phí vận chuyển gốc' })
  @IsNumber()
  @Min(0)
  shippingFee: number; // 👈 Đã thêm

  @ApiProperty()
  @IsString()
  addressId: string; // 👈 Giữ nguyên (Giả sử bạn có logic lấy address)

  @ApiProperty({ enum: PaymentMethod, example: PaymentMethod.COD })
  @IsEnum(PaymentMethod) // 👈 Dùng Enum
  paymentMethod: PaymentMethod;
}

/**
 * 🚀 DTO ĐÃ SỬA:
 * - Dùng OrderStatus enum
 */
export class UpdateOrderStatusDto {
  @ApiProperty({ enum: OrderStatus, example: OrderStatus.PROCESSING })
  @IsEnum(OrderStatus) // 👈 Dùng Enum từ Prisma
  status: OrderStatus;
}