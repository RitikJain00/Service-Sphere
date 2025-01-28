-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Professional" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "Professional_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomerProfile" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "pincode" INTEGER NOT NULL,
    "country" TEXT NOT NULL,
    "cardNo" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "cvv" INTEGER NOT NULL,
    "cardName" TEXT NOT NULL,
    "customerId" INTEGER NOT NULL,

    CONSTRAINT "CustomerProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfessionalProfile" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "pincode" INTEGER NOT NULL,
    "country" TEXT NOT NULL,
    "professionalId" INTEGER NOT NULL,

    CONSTRAINT "ProfessionalProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UpcommingOrders" (
    "id" SERIAL NOT NULL,
    "total" INTEGER NOT NULL,
    "gst" INTEGER NOT NULL,
    "discount" INTEGER NOT NULL,
    "grandTotal" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "customerId" INTEGER NOT NULL,

    CONSTRAINT "UpcommingOrders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PastOrders" (
    "id" SERIAL NOT NULL,
    "total" INTEGER NOT NULL,
    "gst" INTEGER NOT NULL,
    "discount" INTEGER NOT NULL,
    "grandTotal" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "customerId" INTEGER NOT NULL,

    CONSTRAINT "PastOrders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UpcommingBookings" (
    "id" SERIAL NOT NULL,
    "Amount" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "professionalId" INTEGER NOT NULL,

    CONSTRAINT "UpcommingBookings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PastBookings" (
    "id" SERIAL NOT NULL,
    "Amount" INTEGER NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "professionalId" INTEGER NOT NULL,

    CONSTRAINT "PastBookings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Services" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "booking" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "time" TIMESTAMP(3) NOT NULL,
    "professionalId" INTEGER NOT NULL,

    CONSTRAINT "Services_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FavoritesRelation" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_FavoritesRelation_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_CartRelation" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CartRelation_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_OrderServicesRelation" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_OrderServicesRelation_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateTable
CREATE TABLE "_BookingServiceRelation" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_BookingServiceRelation_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_username_key" ON "Customer"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Professional_username_key" ON "Professional"("username");

-- CreateIndex
CREATE UNIQUE INDEX "CustomerProfile_customerId_key" ON "CustomerProfile"("customerId");

-- CreateIndex
CREATE UNIQUE INDEX "ProfessionalProfile_professionalId_key" ON "ProfessionalProfile"("professionalId");

-- CreateIndex
CREATE INDEX "_FavoritesRelation_B_index" ON "_FavoritesRelation"("B");

-- CreateIndex
CREATE INDEX "_CartRelation_B_index" ON "_CartRelation"("B");

-- CreateIndex
CREATE INDEX "_OrderServicesRelation_B_index" ON "_OrderServicesRelation"("B");

-- CreateIndex
CREATE INDEX "_BookingServiceRelation_B_index" ON "_BookingServiceRelation"("B");

-- AddForeignKey
ALTER TABLE "CustomerProfile" ADD CONSTRAINT "CustomerProfile_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProfessionalProfile" ADD CONSTRAINT "ProfessionalProfile_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "Professional"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UpcommingOrders" ADD CONSTRAINT "UpcommingOrders_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PastOrders" ADD CONSTRAINT "PastOrders_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UpcommingBookings" ADD CONSTRAINT "UpcommingBookings_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "Professional"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PastBookings" ADD CONSTRAINT "PastBookings_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "Professional"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Services" ADD CONSTRAINT "Services_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "Professional"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoritesRelation" ADD CONSTRAINT "_FavoritesRelation_A_fkey" FOREIGN KEY ("A") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FavoritesRelation" ADD CONSTRAINT "_FavoritesRelation_B_fkey" FOREIGN KEY ("B") REFERENCES "Services"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CartRelation" ADD CONSTRAINT "_CartRelation_A_fkey" FOREIGN KEY ("A") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CartRelation" ADD CONSTRAINT "_CartRelation_B_fkey" FOREIGN KEY ("B") REFERENCES "Services"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrderServicesRelation" ADD CONSTRAINT "_OrderServicesRelation_A_fkey" FOREIGN KEY ("A") REFERENCES "Services"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrderServicesRelation" ADD CONSTRAINT "_OrderServicesRelation_B_fkey" FOREIGN KEY ("B") REFERENCES "UpcommingOrders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookingServiceRelation" ADD CONSTRAINT "_BookingServiceRelation_A_fkey" FOREIGN KEY ("A") REFERENCES "Services"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BookingServiceRelation" ADD CONSTRAINT "_BookingServiceRelation_B_fkey" FOREIGN KEY ("B") REFERENCES "UpcommingBookings"("id") ON DELETE CASCADE ON UPDATE CASCADE;
