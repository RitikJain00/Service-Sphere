/*
  Warnings:

  - Added the required column `payment` to the `PastBookings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `PastBookings` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PastBookings" ADD COLUMN     "payment" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL;
