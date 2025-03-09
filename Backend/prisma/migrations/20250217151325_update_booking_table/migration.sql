/*
  Warnings:

  - You are about to drop the column `Amount` on the `UpcommingBookings` table. All the data in the column will be lost.
  - Added the required column `amount` to the `UpcommingBookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payment` to the `UpcommingBookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payment` to the `UpcommingOrders` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "UpcommingBookings" DROP COLUMN "Amount",
ADD COLUMN     "amount" INTEGER NOT NULL,
ADD COLUMN     "payment" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "UpcommingOrders" ADD COLUMN     "payment" TEXT NOT NULL;
