/*
  Warnings:

  - Made the column `fixed` on table `Word` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Word" ADD COLUMN     "book" TEXT,
ALTER COLUMN "fixed" SET NOT NULL,
ALTER COLUMN "fixed" SET DEFAULT false;
