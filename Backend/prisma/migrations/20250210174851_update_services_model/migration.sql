/*
  Warnings:

  - You are about to drop the column `expirence` on the `Services` table. All the data in the column will be lost.
  - Added the required column `expireince` to the `Services` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Services" DROP COLUMN "expirence",
ADD COLUMN     "expireince" TEXT NOT NULL;
