import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsOptional, IsNumber } from 'class-validator';

export class CreateSellerDto {
  @ApiProperty()
  @IsString()
  storeName: string;

  @ApiProperty()
  @IsString()
  enterpriseId: string;
}

export class UpdateSellerDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  storeName?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  verified?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsNumber()
  rating?: number;
}