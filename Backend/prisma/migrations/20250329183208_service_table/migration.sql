/*
  Warnings:

  - The `booking` column on the `Services` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Services" DROP COLUMN "booking",
ADD COLUMN     "booking" INTEGER NOT NULL DEFAULT 0;
