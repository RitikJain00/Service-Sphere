/*
  Warnings:

  - You are about to drop the column `price` on the `Cart` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "price",
ADD COLUMN     "total" INTEGER NOT NULL DEFAULT 0;
