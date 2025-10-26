import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsOptional,
  IsBoolean,
  IsNumber,
  IsEnum,
  MinLength,
} from 'class-validator';
import { ShipperStatus } from '@prisma/client';

/**
 * 🚀 DTO MỚI: Dùng để tạo User (role: SHIPPER) và Shipper cùng lúc
 */
export class CreateShipperDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  password: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ description: 'URL ảnh avatar' })
  @IsOptional()
  @IsString()
  avatar?: string;

  @ApiPropertyOptional({ description: 'Phạm vi giao hàng (km)', default: 5.0 })
  @IsOptional()
  @IsNumber()
  deliveryRange?: number;
}

/**
 * 🚀 DTO MỚI: Chỉ cập nhật các trường thuộc model Shipper
 * (Việc cập nhật name, phone, avatar... nên thuộc về UserService)
 */
export class UpdateShipperDto {
  @ApiPropertyOptional({ description: 'Kích hoạt shipper?' })
  @IsOptional()
  @IsBoolean()
  active?: boolean;

  @ApiPropertyOptional({ enum: ShipperStatus, description: 'Trạng thái shipper' })
  @IsOptional()
  @IsEnum(ShipperStatus)
  status?: ShipperStatus;

  @ApiPropertyOptional({ description: 'Phạm vi giao hàng (km)' })
  @IsOptional()
  @IsNumber()
  deliveryRange?: number;
}

/**
 * DTO này vẫn chính xác
 */
export class UpdateLocationDto {
  @ApiProperty()
  @IsNumber()
  latitude: number;

  @ApiProperty()
  @IsNumber()
  longitude: number;
}

/**
 * DTO này vẫn chính xác
 */
export class AssignOrderDto {
  @ApiProperty()
  @IsString()
  orderId: string;

  @ApiProperty()
  @IsString()
  shipperId: string;
}