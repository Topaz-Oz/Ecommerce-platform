import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { DiscountType } from '@prisma/client'; // 👈 Import enum { PERCENTAGE, FIXED_AMOUNT }
import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsFloat,
  Min,
  IsOptional,
  IsDateString,
  IsInt,
  IsBoolean,
} from 'class-validator';

export class CreateVoucherDto {
  @ApiProperty({ example: 'SALE1111', description: 'Mã voucher duy nhất' })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({ example: 'Giảm 10% đơn từ 300K' }) // 👈 TRƯỜNG BỊ THIẾU
  @IsString()
  @IsNotEmpty()
  title: string; // 👈 Thuộc tính 'title' bắt buộc

  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty({ enum: DiscountType, example: DiscountType.PERCENTAGE }) // 👈 Khớp schema
  @IsEnum(DiscountType)
  discountType: DiscountType;

  @ApiProperty({ description: 'Giá trị (VND hoặc %)', example: 10 })
  @IsFloat()
  @Min(0)
  discountValue: number;

  @ApiPropertyOptional({
    description: 'Giảm tối đa (cho PERCENTAGE)',
    example: 50000,
  })
  @IsFloat()
  @Min(0)
  @IsOptional()
  maxDiscountValue?: number;

  @ApiPropertyOptional({ description: 'Đơn tối thiểu', example: 300000 })
  @IsFloat()
  @Min(0)
  @IsOptional()
  minOrderValue?: number;

  @ApiProperty({
    description: 'Ngày bắt đầu (ISO 8601)',
    example: '2025-11-10T17:00:00Z',
  })
  @IsDateString()
  startDate: string;

  @ApiProperty({
    description: 'Ngày kết thúc (ISO 8601)',
    example: '2025-11-12T16:59:59Z',
  })
  @IsDateString()
  endDate: string;

  @ApiPropertyOptional({ description: 'Tổng lượt sử dụng', example: 1000 })
  @IsInt()
  @Min(1)
  @IsOptional()
  usageLimit?: number;

  @ApiPropertyOptional({ description: 'Kích hoạt?', default: true })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}