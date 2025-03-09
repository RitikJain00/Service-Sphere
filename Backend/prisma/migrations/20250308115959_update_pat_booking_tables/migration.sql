/*
  Warnings:

  - A unique constraint covering the columns `[bookingId]` on the table `UpcommingOrders` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `bookingId` to the `UpcommingOrders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UpcommingOrders" ADD COLUMN     "bookingId" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "UpcommingOrders_bookingId_key" ON "UpcommingOrders"("bookingId");

-- AddForeignKey
ALTER TABLE "UpcommingOrders" ADD CONSTRAINT "UpcommingOrders_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "UpcommingBookings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
