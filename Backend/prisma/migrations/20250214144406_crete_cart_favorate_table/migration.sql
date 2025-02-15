/*
  Warnings:

  - You are about to drop the `_CartRelation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_FavoritesRelation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CartRelation" DROP CONSTRAINT "_CartRelation_A_fkey";

-- DropForeignKey
ALTER TABLE "_CartRelation" DROP CONSTRAINT "_CartRelation_B_fkey";

-- DropForeignKey
ALTER TABLE "_FavoritesRelation" DROP CONSTRAINT "_FavoritesRelation_A_fkey";

-- DropForeignKey
ALTER TABLE "_FavoritesRelation" DROP CONSTRAINT "_FavoritesRelation_B_fkey";

-- DropTable
DROP TABLE "_CartRelation";

-- DropTable
DROP TABLE "_FavoritesRelation";

-- CreateTable
CREATE TABLE "Cart" (
    "id" SERIAL NOT NULL,
    "customerId" INTEGER NOT NULL,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Favorite" (
    "id" SERIAL NOT NULL,
    "customerId" INTEGER NOT NULL,

    CONSTRAINT "Favorite_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CartServicesRelation" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CartServicesRelation_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_FavoriteServicesRelation" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_FavoriteServicesRelation_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cart_customerId_key" ON "Cart"("customerId");

-- CreateIndex
CREATE UNIQUE INDEX "Favorite_customerId_key" ON "Favorite"("customerId");

-- CreateIndex
CREATE INDEX "_CartServicesRelation_B_index" ON "_CartServicesRelation"("B");

-- CreateIndex
CREATE INDEX "_FavoriteServicesRelation_B_index" ON "_FavoriteServicesRelation"("B");

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CartServicesRelation" ADD CONSTRAINT "_CartServicesRelation_A_fkey" FOREIGN KEY ("A") REFERENCES "Cart"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CartServicesRelation" ADD CONSTRAINT "_CartServicesRelation_B_fkey" FOREIGN KEY ("B") REFERENCES "Services"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoriteServicesRelation" ADD CONSTRAINT "_FavoriteServicesRelation_A_fkey" FOREIGN KEY ("A") REFERENCES "Favorite"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoriteServicesRelation" ADD CONSTRAINT "_FavoriteServicesRelation_B_fkey" FOREIGN KEY ("B") REFERENCES "Services"("id") ON DELETE CASCADE ON UPDATE CASCADE;
