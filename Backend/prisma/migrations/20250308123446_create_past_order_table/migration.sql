/*
  Warnings:

  - You are about to drop the column `date` on the `PastBookings` table. All the data in the column will be lost.
  - Added the required column `completionDate` to the `PastBookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slotdate` to the `PastBookings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PastBookings" DROP COLUMN "date",
ADD COLUMN     "completionDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "slotdate" TIMESTAMP(3) NOT NULL;

-- CreateTable
CREATE TABLE "PastOrders" (
    "id" SERIAL NOT NULL,
    "slotDate" TIMESTAMP(3) NOT NULL,
    "completionDate" TIMESTAMP(3) NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "payment" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "customerId" INTEGER NOT NULL,
    "serviceId" INTEGER NOT NULL,
    "bookingId" INTEGER NOT NULL,

    CONSTRAINT "PastOrders_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PastOrders_bookingId_key" ON "PastOrders"("bookingId");

-- AddForeignKey
ALTER TABLE "PastOrders" ADD CONSTRAINT "PastOrders_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PastOrders" ADD CONSTRAINT "PastOrders_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PastOrders" ADD CONSTRAINT "PastOrders_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "UpcommingBookings"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
