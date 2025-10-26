// src/voucher/dto/apply-voucher.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Min,
  ValidateNested,
} from 'class-validator';
import { CartItemDto } from './cart-item.dto';

export class ApplyVoucherDto {
  @ApiProperty({ type: [CartItemDto], description: 'Danh sách sản phẩm trong giỏ' })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CartItemDto)
  items: CartItemDto[];

  @ApiProperty({ description: 'Phí vận chuyển gốc (chưa giảm)' })
  @IsNumber()
  @Min(0)
  shippingFee: number;

  @ApiPropertyOptional({ description: 'ID của Shop Voucher' })
  @IsString()
  @IsOptional()
  shopVoucherId?: string;

  @ApiPropertyOptional({ description: 'ID của Platform Voucher' })
  @IsString()
  @IsOptional()
  platformVoucherId?: string;

  @ApiPropertyOptional({ description: 'ID của FreeShip Voucher' })
  @IsString()
  @IsOptional()
  freeShipVoucherId?: string;
}