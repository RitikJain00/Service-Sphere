-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "wallet" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProfessionalWallet" (
    "id" SERIAL NOT NULL,
    "Total" INTEGER NOT NULL DEFAULT 0,
    "Pending" INTEGER NOT NULL DEFAULT 0,
    "professionalId" INTEGER NOT NULL,

    CONSTRAINT "ProfessionalWallet_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Admin_username_key" ON "Admin"("username");

-- CreateIndex
CREATE UNIQUE INDEX "ProfessionalWallet_professionalId_key" ON "ProfessionalWallet"("professionalId");

-- AddForeignKey
ALTER TABLE "ProfessionalWallet" ADD CONSTRAINT "ProfessionalWallet_professionalId_fkey" FOREIGN KEY ("professionalId") REFERENCES "Professional"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
