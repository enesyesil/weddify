/*
  Warnings:

  - You are about to drop the `Product` table. If the table is not empty, all the data it contains will be lost.

*/
-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "footerText" TEXT,
ADD COLUMN     "headerText" TEXT,
ADD COLUMN     "message" TEXT;

-- DropTable
DROP TABLE "Product";
