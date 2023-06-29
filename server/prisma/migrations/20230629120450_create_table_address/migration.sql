/*
  Warnings:

  - You are about to drop the column `birthDate` on the `patient` table. All the data in the column will be lost.
  - Added the required column `birth_date` to the `patient` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "patient" DROP COLUMN "birthDate",
ADD COLUMN     "birth_date" DATE NOT NULL;

-- CreateTable
CREATE TABLE "address" (
    "zip_code" VARCHAR(8) NOT NULL,
    "state" VARCHAR(100) NOT NULL,
    "city" VARCHAR(100) NOT NULL,
    "district" VARCHAR(100) NOT NULL,
    "public_area" VARCHAR(255) NOT NULL,
    "complement" VARCHAR(255),
    "patient_id" UUID NOT NULL,

    CONSTRAINT "address_pkey" PRIMARY KEY ("patient_id")
);

-- AddForeignKey
ALTER TABLE "address" ADD CONSTRAINT "address_patient_id_fkey" FOREIGN KEY ("patient_id") REFERENCES "patient"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
