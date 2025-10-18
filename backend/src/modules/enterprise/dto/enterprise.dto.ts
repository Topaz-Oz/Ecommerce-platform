import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateEnterpriseDto {
  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  avatar?: string;

  @ApiProperty()
  @IsString()
  companyName: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  taxCode?: string;
}

export class UpdateEnterpriseDto {
  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  avatar?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  companyName?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  taxCode?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  verified?: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  officialBrand?: boolean;
}