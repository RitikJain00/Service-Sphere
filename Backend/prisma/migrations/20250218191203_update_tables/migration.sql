/*
  Warnings:

  - You are about to drop the column `Amount` on the `PastBookings` table. All the data in the column will be lost.
  - Added the required column `amount` to the `PastBookings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Orders" ALTER COLUMN "gst" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "discount" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "grandTotal" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "PastBookings" DROP COLUMN "Amount",
ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL;

-- AlterTable
ALTER TABLE "UpcommingBookings" ALTER COLUMN "amount" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "UpcommingOrders" ALTER COLUMN "amount" SET DATA TYPE DOUBLE PRECISION;
