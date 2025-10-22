/*
  Warnings:

  - Added the required column `deliveryAddress` to the `LogisticsOrder` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pickupAddress` to the `LogisticsOrder` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ShipperStatus" AS ENUM ('AVAILABLE', 'BUSY', 'OFFLINE');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "LogisticsStatus" ADD VALUE 'ASSIGNED';
ALTER TYPE "LogisticsStatus" ADD VALUE 'CANCELLED';

-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'SHIPPER';

-- AlterTable
ALTER TABLE "LogisticsOrder" ADD COLUMN     "cancelReason" TEXT,
ADD COLUMN     "customerSignature" TEXT,
ADD COLUMN     "deliveredTime" TIMESTAMP(3),
ADD COLUMN     "deliveryAddress" TEXT NOT NULL,
ADD COLUMN     "deliveryAttempts" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "deliveryLocation" JSONB,
ADD COLUMN     "distance" DOUBLE PRECISION,
ADD COLUMN     "estimatedTime" INTEGER,
ADD COLUMN     "feedback" TEXT,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "pickupAddress" TEXT NOT NULL,
ADD COLUMN     "pickupLocation" JSONB,
ADD COLUMN     "pickupTime" TIMESTAMP(3),
ADD COLUMN     "proofOfDelivery" TEXT[],
ADD COLUMN     "rating" INTEGER,
ADD COLUMN     "shipperId" TEXT;

-- AlterTable
ALTER TABLE "LogisticsPartner" ADD COLUMN     "verified" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "SellerProduct" (
    "id" TEXT NOT NULL,
    "sellerId" TEXT NOT NULL,
    "productId" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "stock" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "SellerProduct_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Shipper" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT,
    "avatar" TEXT,
    "logisticsPartnerId" TEXT NOT NULL,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "currentLocation" JSONB,
    "status" "ShipperStatus" NOT NULL DEFAULT 'AVAILABLE',
    "rating" DOUBLE PRECISION,
    "totalDeliveries" INTEGER NOT NULL DEFAULT 0,
    "totalRatings" INTEGER NOT NULL DEFAULT 0,
    "deliveryRange" DOUBLE PRECISION NOT NULL DEFAULT 5.0,
    "deliveryHistory" JSONB[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Shipper_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Shipper_email_key" ON "Shipper"("email");

-- AddForeignKey
ALTER TABLE "SellerProduct" ADD CONSTRAINT "SellerProduct_sellerId_fkey" FOREIGN KEY ("sellerId") REFERENCES "Seller"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SellerProduct" ADD CONSTRAINT "SellerProduct_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shipper" ADD CONSTRAINT "Shipper_logisticsPartnerId_fkey" FOREIGN KEY ("logisticsPartnerId") REFERENCES "LogisticsPartner"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LogisticsOrder" ADD CONSTRAINT "LogisticsOrder_shipperId_fkey" FOREIGN KEY ("shipperId") REFERENCES "Shipper"("id") ON DELETE SET NULL ON UPDATE CASCADE;
