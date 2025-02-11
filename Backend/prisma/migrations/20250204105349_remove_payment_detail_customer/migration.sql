/*
  Warnings:

  - You are about to drop the column `cardName` on the `CustomerProfile` table. All the data in the column will be lost.
  - You are about to drop the column `cardNo` on the `CustomerProfile` table. All the data in the column will be lost.
  - You are about to drop the column `cvv` on the `CustomerProfile` table. All the data in the column will be lost.
  - You are about to drop the column `date` on the `CustomerProfile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "CustomerProfile" DROP COLUMN "cardName",
DROP COLUMN "cardNo",
DROP COLUMN "cvv",
DROP COLUMN "date";
