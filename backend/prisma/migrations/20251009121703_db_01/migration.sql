-- AlterTable
ALTER TABLE "Promotion" ALTER COLUMN "discountPercentage" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "avatar" TEXT;
