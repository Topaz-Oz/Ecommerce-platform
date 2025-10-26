// src/analytics/dto/analytics-query.dto.ts
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDate,
  IsInt,
  IsOptional,
  IsString,
  Matches,
  Min,
} from 'class-validator';

export class AnalyticsQueryDto {
  @ApiProperty({
    description: 'Ngày bắt đầu (ISO 8601)',
    example: '2025-10-01T00:00:00Z',
  })
  @Type(() => Date) // Tự động chuyển string -> Date
  @IsDate()
  startDate: Date;

  @ApiProperty({
    description: 'Ngày kết thúc (ISO 8601)',
    example: '2025-10-31T23:59:59Z',
  })
  @Type(() => Date)
  @IsDate()
  endDate: Date;

  @ApiPropertyOptional({
    description: 'Lọc theo ID của Seller (Chỉ dành cho Admin)',
  })
  @IsString()
  @IsOptional()
  sellerId?: string;

  @ApiPropertyOptional({
    description: 'Lọc theo ID của Enterprise (Chỉ dành cho Admin)',
  })
  @IsString()
  @IsOptional()
  enterpriseId?: string;

  @ApiPropertyOptional({ description: 'Giới hạn (VD: top 5)', default: 5 })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  limit?: number = 5;

  @ApiPropertyOptional({
    description: 'Đơn vị thời gian (day, week, month)',
    example: 'day',
    default: 'day',
  })
  @IsString()
  @IsOptional()
  @Matches(/^(day|week|month)$/, { message: 'Unit must be day, week, or month' })
  unit?: 'day' | 'week' | 'month' = 'day';
}