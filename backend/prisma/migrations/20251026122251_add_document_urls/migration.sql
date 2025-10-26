-- AlterTable
ALTER TABLE "Enterprise" ADD COLUMN     "brandRegistrationUrl" TEXT,
ADD COLUMN     "businessLicenseUrl" TEXT,
ADD COLUMN     "logoUrl" TEXT,
ADD COLUMN     "taxDocumentUrl" TEXT;

-- AlterTable
ALTER TABLE "Seller" ADD COLUMN     "addressDocumentUrl" TEXT,
ADD COLUMN     "businessDocumentUrl" TEXT,
ADD COLUMN     "identityDocumentUrl" TEXT,
ADD COLUMN     "logoUrl" TEXT;

-- AlterTable
ALTER TABLE "_OrderToVoucher" ADD CONSTRAINT "_OrderToVoucher_AB_pkey" PRIMARY KEY ("A", "B");

-- DropIndex
DROP INDEX "public"."_OrderToVoucher_AB_unique";
