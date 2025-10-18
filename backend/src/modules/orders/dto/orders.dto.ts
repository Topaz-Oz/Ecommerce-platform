import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsArray, IsEnum } from 'class-validator';

export class CreateOrderItemDto {
  @ApiProperty()
  @IsString()
  productId: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  variantId?: string;

  @ApiProperty()
  @IsNumber()
  quantity: number;

  @ApiProperty()
  @IsNumber()
  price: number;
}

export class CreateOrderDto {
  @ApiProperty({ type: [CreateOrderItemDto] })
  @IsArray()
  items: CreateOrderItemDto[];

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  voucherId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  addressId?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  paymentMethod?: string;
}

export class UpdateOrderStatusDto {
  @ApiProperty({ enum: ['PENDING', 'PROCESSING', 'SHIPPING', 'DELIVERED', 'CANCELLED'] })
  @IsEnum(['PENDING', 'PROCESSING', 'SHIPPING', 'DELIVERED', 'CANCELLED'])
  status: string;
}