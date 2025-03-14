-- AlterTable
ALTER TABLE "Customer" ADD COLUMN     "resetOtpVerified" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Professional" ADD COLUMN     "resetOtpVerified" BOOLEAN NOT NULL DEFAULT false;
