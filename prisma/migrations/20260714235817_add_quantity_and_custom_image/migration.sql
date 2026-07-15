-- AlterTable
ALTER TABLE "user_collection" ADD COLUMN     "customImage" TEXT,
ADD COLUMN     "quantity" INTEGER NOT NULL DEFAULT 1;
