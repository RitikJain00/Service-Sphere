/*
  Warnings:

  - You are about to drop the `Wallet` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Wallet" DROP CONSTRAINT "Wallet_customerId_fkey";

-- DropTable
DROP TABLE "Wallet";

-- CreateTable
CREATE TABLE "customerWallet" (
    "id" SERIAL NOT NULL,
    "customerId" INTEGER NOT NULL,
    "Total" INTEGER NOT NULL DEFAULT 0,
    "Pending" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "customerWallet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "customerWallet_customerId_key" ON "customerWallet"("customerId");

-- AddForeignKey
ALTER TABLE "customerWallet" ADD CONSTRAINT "customerWallet_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
