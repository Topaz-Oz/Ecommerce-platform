import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength, IsOptional, IsEnum, Matches } from 'class-validator';
import { Role } from '@prisma/client';

export class LoginDto {
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @MinLength(6)
  password: string;
}

export class RegisterDto {
  [x: string]: any;
  @ApiProperty({ example: 'user@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @MinLength(6)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password is too weak - must contain uppercase, lowercase, and numbers',
  })
  password: string;

  @ApiProperty({ example: 'John Doe' })
  @IsString()
  name: string;

  @ApiProperty({ enum: Role, example: 'CUSTOMER' })
  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}

export class ChangePasswordDto {
  @ApiProperty()
  @IsString()
  oldPassword: string;

  @ApiProperty()
  @IsString()
  @MinLength(6)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password is too weak - must contain uppercase, lowercase, and numbers',
  })
  newPassword: string;
}

export class AuthResponse {
  @ApiProperty()
  access_token: string;

  @ApiProperty({
    example: {
      id: 'cuid',
      email: 'user@example.com',
      name: 'John Doe',
      role: 'CUSTOMER',
      seller: {
        id: 'cuid',
        brandName: 'My Store',
        verified: false,
        products: [],
      },
    },
  })
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
    seller?: any;
    logistics?: any;
  };
}