-- AlterTable
ALTER TABLE "OrderService" ALTER COLUMN "date" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "PastBookings" ALTER COLUMN "completionDate" SET DATA TYPE TEXT,
ALTER COLUMN "slotdate" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "PastOrders" ALTER COLUMN "slotDate" SET DATA TYPE TEXT,
ALTER COLUMN "completionDate" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Services" ALTER COLUMN "time" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "UpcommingBookings" ALTER COLUMN "date" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "UpcommingOrders" ALTER COLUMN "date" SET DATA TYPE TEXT;
