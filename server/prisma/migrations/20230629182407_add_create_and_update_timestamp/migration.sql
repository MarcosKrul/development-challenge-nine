/*
  Warnings:

  - Added the required column `createdAt` to the `patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `patient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "patient" ADD COLUMN     "createdAt" TIMESTAMP NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP NOT NULL;
