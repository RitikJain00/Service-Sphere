/*
  Warnings:

  - Added the required column `company` to the `Services` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expirence` to the `Services` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Services` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rating` to the `Services` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Services" ADD COLUMN     "company" TEXT NOT NULL,
ADD COLUMN     "expirence" TEXT NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL,
ADD COLUMN     "rating" DOUBLE PRECISION NOT NULL;
