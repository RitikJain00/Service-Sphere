/*
  Warnings:

  - Added the required column `category` to the `Services` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `price` on the `Services` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Services" ADD COLUMN     "category" TEXT NOT NULL,
ALTER COLUMN "booking" DROP NOT NULL,
DROP COLUMN "price",
ADD COLUMN     "price" INTEGER NOT NULL,
ALTER COLUMN "rating" DROP NOT NULL;
