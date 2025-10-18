import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsBoolean, IsEnum, IsDateString, IsArray } from 'class-validator';
import { DiscountType } from '@prisma/client';

export class CreateVoucherDto {
  @ApiProperty()
  @IsString()
  code: string;

  @ApiProperty({ enum: DiscountType })
  @IsEnum(DiscountType)
  discountType: DiscountType;

  @ApiProperty()
  @IsNumber()
  discountValue: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  minOrderValue?: number;

  @ApiProperty()
  @IsDateString()
  startDate: string;

  @ApiProperty()
  @IsDateString()
  endDate: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  usageLimit?: number;
}

export class UpdateVoucherDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  usageLimit?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  endDate?: string;
}

export class CreateFlashSaleDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsDateString()
  startDate: string;

  @ApiProperty()
  @IsDateString()
  endDate: string;

  @ApiProperty()
  @IsArray()
  products: FlashSaleProductDto[];
}

export class FlashSaleProductDto {
  @ApiProperty()
  @IsString()
  productId: string;

  @ApiProperty()
  @IsNumber()
  discountPercentage: number;

  @ApiProperty()
  @IsNumber()
  quantity: number;
}

export class CreateCampaignDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsDateString()
  startDate: string;

  @ApiProperty()
  @IsDateString()
  endDate: string;

  @ApiProperty()
  @IsArray()
  categoryIds: string[];

  @ApiProperty()
  @IsNumber()
  discountPercentage: number;
}

export class SystemStatsDto {
  @ApiProperty()
  @IsDateString()
  startDate: string;

  @ApiProperty()
  @IsDateString()
  endDate: string;
}