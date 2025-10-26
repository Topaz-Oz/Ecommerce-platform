// src/voucher/dto/cart-item.dto.ts
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CartItemDto {
  @ApiProperty({ description: 'ID của sản phẩm (Product)' })
  @IsString()
  @IsNotEmpty()
  productId: string;

  @ApiProperty({ description: 'ID của biến thể (ProductVariant)' })
  @IsString()
  @IsNotEmpty()
  variantId: string;

  @ApiProperty({ description: 'ID của người bán (Seller/Enterprise)' })
  @IsString()
  @IsNotEmpty()
  sellerId: string; // 👈 Rất quan trọng để tính Shop Voucher

  @ApiProperty({ description: 'Số lượng' })
  @IsInt()
  @Min(1)
  quantity: number;

  @ApiProperty({ description: 'Giá của 1 sản phẩm (tại thời điểm thêm vào giỏ)' })
  @IsNumber()
  @Min(0)
  price: number;
}