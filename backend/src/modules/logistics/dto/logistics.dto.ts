import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsOptional, IsEnum, IsDate, IsBoolean } from 'class-validator';
import { LogisticsStatus } from '@prisma/client';
import { Type } from 'class-transformer';

export class CreateLogisticsPartnerDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  apiEndpoint?: string;

  @ApiProperty()
  @IsNumber()
  baseRate: number;
}

export class UpdateLogisticsPartnerDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  apiEndpoint?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  baseRate?: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  rating?: number;
}

export class CreateLogisticsOrderDto {
  @ApiProperty()
  @IsString()
  orderId: string;

  @ApiProperty()
  @IsString()
  logisticsPartnerId: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  estimatedDelivery?: Date;
}

export class UpdateLogisticsOrderDto {
  @ApiProperty({ enum: LogisticsStatus })
  @IsEnum(LogisticsStatus)
  status: LogisticsStatus;

  @ApiProperty({ required: false })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  estimatedDelivery?: Date;
}

export class CalculateShippingDto {
  @ApiProperty()
  @IsString()
  fromProvince: string;

  @ApiProperty()
  @IsString()
  toProvince: string;

  @ApiProperty()
  @IsNumber()
  weight: number;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  express?: boolean;
}