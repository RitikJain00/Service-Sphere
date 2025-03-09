/*
  Warnings:

  - You are about to drop the column `discount` on the `UpcommingOrders` table. All the data in the column will be lost.
  - You are about to drop the column `grandTotal` on the `UpcommingOrders` table. All the data in the column will be lost.
  - You are about to drop the column `gst` on the `UpcommingOrders` table. All the data in the column will be lost.
  - You are about to drop the column `total` on the `UpcommingOrders` table. All the data in the column will be lost.
  - You are about to drop the `PastOrders` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_BookingServiceRelation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_OrderServicesRelation` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `customerId` to the `PastBookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serviceId` to the `PastBookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `customerId` to the `UpcommingBookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serviceId` to the `UpcommingBookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amount` to the `UpcommingOrders` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serviceId` to the `UpcommingOrders` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PastOrders" DROP CONSTRAINT "PastOrders_customerId_fkey";

-- DropForeignKey
ALTER TABLE "_BookingServiceRelation" DROP CONSTRAINT "_BookingServiceRelation_A_fkey";

-- DropForeignKey
ALTER TABLE "_BookingServiceRelation" DROP CONSTRAINT "_BookingServiceRelation_B_fkey";

-- DropForeignKey
ALTER TABLE "_OrderServicesRelation" DROP CONSTRAINT "_OrderServicesRelation_A_fkey";

-- DropForeignKey
ALTER TABLE "_OrderServicesRelation" DROP CONSTRAINT "_OrderServicesRelation_B_fkey";

-- AlterTable
ALTER TABLE "PastBookings" ADD COLUMN     "customerId" INTEGER NOT NULL,
ADD COLUMN     "serviceId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "UpcommingBookings" ADD COLUMN     "customerId" INTEGER NOT NULL,
ADD COLUMN     "serviceId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "UpcommingOrders" DROP COLUMN "discount",
DROP COLUMN "grandTotal",
DROP COLUMN "gst",
DROP COLUMN "total",
ADD COLUMN     "amount" INTEGER NOT NULL,
ADD COLUMN     "serviceId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "PastOrders";

-- DropTable
DROP TABLE "_BookingServiceRelation";

-- DropTable
DROP TABLE "_OrderServicesRelation";

-- CreateTable
CREATE TABLE "Orders" (
    "id" SERIAL NOT NULL,
    "total" INTEGER NOT NULL,
    "gst" INTEGER NOT NULL,
    "discount" INTEGER NOT NULL,
    "grandTotal" INTEGER NOT NULL,
    "payment" TEXT NOT NULL,
    "bookedDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "customerId" INTEGER NOT NULL,

    CONSTRAINT "Orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderService" (
    "id" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "serviceId" INTEGER NOT NULL,

    CONSTRAINT "OrderService_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UpcommingOrders" ADD CONSTRAINT "UpcommingOrders_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Orders" ADD CONSTRAINT "Orders_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderService" ADD CONSTRAINT "OrderService_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Orders"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderService" ADD CONSTRAINT "OrderService_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UpcommingBookings" ADD CONSTRAINT "UpcommingBookings_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UpcommingBookings" ADD CONSTRAINT "UpcommingBookings_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PastBookings" ADD CONSTRAINT "PastBookings_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Services"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PastBookings" ADD CONSTRAINT "PastBookings_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
