import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsEnum, IsOptional, ValidateIf } from 'class-validator';
import { Role } from '@prisma/client';

export class RegisterDto {
  @ApiProperty()
  @IsEmail()
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

  @ApiProperty({ enum: Role, required: false })
  @IsOptional()
  @IsEnum(Role)
  role?: Role;

  @ApiProperty({ required: false })
  @ValidateIf(o => o.role === Role.SELLER)
  @IsString()
  storeName?: string;

  @ApiProperty({ required: false })
  @ValidateIf(o => o.role === Role.ENTERPRISE)
  @IsString()
  companyName?: string;

  @ApiProperty({ required: false })
  @ValidateIf(o => o.role === Role.ENTERPRISE)
  @IsString()
  taxCode?: string;
}

export class LoginDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;
}

export class VerifyEmailDto {
  @ApiProperty()
  @IsString()
  token: string;
}

export class ResendVerificationDto {
  @ApiProperty()
  @IsEmail()
  email: string;
}