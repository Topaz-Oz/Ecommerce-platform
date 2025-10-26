/*
  Warnings:

  - The values [PERCENT,AMOUNT] on the enum `DiscountType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `shippingId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `voucherId` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `basePrice` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `stock` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `avatar` on the `Shipper` table. All the data in the column will be lost.
  - You are about to drop the column `email` on the `Shipper` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Shipper` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Shipper` table. All the data in the column will be lost.
  - You are about to drop the column `phone` on the `Shipper` table. All the data in the column will be lost.
  - You are about to drop the `SellerProduct` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[paymentId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[sku]` on the table `ProductVariant` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[userId]` on the table `Shipper` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `shippingFee` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `subtotal` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalDiscount` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amount` to the `Payment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Shipper` table without a default value. This is not possible if the table is not empty.
  - Added the required column `scope` to the `Voucher` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `Voucher` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "VoucherScope" AS ENUM ('SHOP', 'PLATFORM', 'FREESHIP');

-- AlterEnum
BEGIN;
CREATE TYPE "DiscountType_new" AS ENUM ('PERCENTAGE', 'FIXED_AMOUNT');
ALTER TABLE "Voucher" ALTER COLUMN "discountType" TYPE "DiscountType_new" USING ("discountType"::text::"DiscountType_new");
ALTER TYPE "DiscountType" RENAME TO "DiscountType_old";
ALTER TYPE "DiscountType_new" RENAME TO "DiscountType";
DROP TYPE "DiscountType_old";
COMMIT;

-- DropForeignKey
ALTER TABLE "Order" DROP CONSTRAINT "Order_voucherId_fkey";

-- DropForeignKey
ALTER TABLE "ProductVariant" DROP CONSTRAINT "ProductVariant_productId_fkey";

-- DropForeignKey
ALTER TABLE "SellerProduct" DROP CONSTRAINT "SellerProduct_productId_fkey";

-- DropForeignKey
ALTER TABLE "SellerProduct" DROP CONSTRAINT "SellerProduct_sellerId_fkey";

-- DropIndex
DROP INDEX "Shipper_email_key";

-- AlterTable
ALTER TABLE "LogisticsOrder" ADD COLUMN     "enterpriseId" TEXT,
ADD COLUMN     "sellerId" TEXT;

-- AlterTable
ALTER TABLE "Order" DROP COLUMN "shippingId",
DROP COLUMN "voucherId",
ADD COLUMN     "freeshipDiscount" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "platformDiscount" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "shippingFee" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "shopDiscount" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "subtotal" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "totalDiscount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "enterpriseId" TEXT,
ADD COLUMN     "sellerId" TEXT;

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "basePrice",
DROP COLUMN "stock";

-- AlterTable
ALTER TABLE "ProductVariant" ADD COLUMN     "sku" TEXT;

-- AlterTable
ALTER TABLE "Shipper" DROP COLUMN "avatar",
DROP COLUMN "email",
DROP COLUMN "name",
DROP COLUMN "password",
DROP COLUMN "phone",
ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "role" SET DEFAULT 'CUSTOMER';

-- AlterTable
ALTER TABLE "Voucher" ADD COLUMN     "description" TEXT,
ADD COLUMN     "enterpriseId" TEXT,
ADD COLUMN     "isActive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "maxDiscountValue" DOUBLE PRECISION,
ADD COLUMN     "scope" "VoucherScope" NOT NULL,
ADD COLUMN     "sellerId" TEXT,
ADD COLUMN     "title" TEXT NOT NULL;

-- DropTable
DROP TABLE "SellerProduct";

-- CreateTable
CREATE TABLE "VoucherDistribution" (
    "id" TEXT NOT NULL,
    "voucherId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "claimedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "used" BOOLEAN NOT NULL DEFAULT false,
    "orderId" TEXT,

    CONSTRAINT "VoucherDistribution_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "VoucherBudget" (
    "id" TEXT NOT NULL,
    "voucherId" TEXT NOT NULL,
    "totalBudget" DOUBLE PRECISION NOT NULL,
    "usedBudget" DOUBLE PRECISION NOT NULL DEFAULT 0,

    CONSTRAINT "VoucherBudget_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_OrderToVoucher" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "VoucherDistribution_voucherId_userId_key" ON "VoucherDistribution"("voucherId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "VoucherBudget_voucherId_key" ON "VoucherBudget"("voucherId");

-- CreateIndex
CREATE UNIQUE INDEX "_OrderToVoucher_AB_unique" ON "_OrderToVoucher"("A", "B");

-- CreateIndex
CREATE INDEX "_OrderToVoucher_B_index" ON "_OrderToVoucher"("B");

-- CreateIndex
CREATE UNIQUE INDEX "Order_paymentId_key" ON "Order"("paymentId");

-- CreateIndex
CREATE UNIQUE INDEX "ProductVariant_sku_key" ON "ProductVariant"("sku");

-- CreateIndex
CREATE UNIQUE INDEX "Shipper_userId_key" ON "Shipper"("userId");

-- AddForeignKey
ALTER TABLE "ProductVariant" ADD CONSTRAINT "ProductVariant_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Voucher" ADD CONSTRAINT "Voucher_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "Seller"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Voucher" ADD CONSTRAINT "Voucher_enterpriseId_fkey" FOREIGN KEY ("enterpriseId") REFERENCES "Enterprise"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VoucherDistribution" ADD CONSTRAINT "VoucherDistribution_voucherId_fkey" FOREIGN KEY ("voucherId") REFERENCES "Voucher"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VoucherDistribution" ADD CONSTRAINT "VoucherDistribution_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "VoucherBudget" ADD CONSTRAINT "VoucherBudget_voucherId_fkey" FOREIGN KEY ("voucherId") REFERENCES "Voucher"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shipper" ADD CONSTRAINT "Shipper_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrderToVoucher" ADD CONSTRAINT "_OrderToVoucher_A_fkey" FOREIGN KEY ("A") REFERENCES "Order"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrderToVoucher" ADD CONSTRAINT "_OrderToVoucher_B_fkey" FOREIGN KEY ("B") REFERENCES "Voucher"("id") ON DELETE CASCADE ON UPDATE CASCADE;
