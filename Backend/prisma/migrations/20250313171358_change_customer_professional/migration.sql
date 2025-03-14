/*
  Warnings:

  - The `resetOtpExpireAt` column on the `Customer` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `verifyOtpExpireAt` column on the `Customer` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `resetOtpExpireAt` column on the `Professional` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `verifyOtpExpireAt` column on the `Professional` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Customer" DROP COLUMN "resetOtpExpireAt",
ADD COLUMN     "resetOtpExpireAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "verifyOtpExpireAt",
ADD COLUMN     "verifyOtpExpireAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "Professional" DROP COLUMN "resetOtpExpireAt",
ADD COLUMN     "resetOtpExpireAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "verifyOtpExpireAt",
ADD COLUMN     "verifyOtpExpireAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
