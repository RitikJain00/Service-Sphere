/*
  Warnings:

  - You are about to drop the column `bookingId` on the `PastOrders` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "PastOrders" DROP CONSTRAINT "PastOrders_bookingId_fkey";

-- DropIndex
DROP INDEX "PastOrders_bookingId_key";

-- AlterTable
ALTER TABLE "PastOrders" DROP COLUMN "bookingId";
