/*
  Warnings:

  - Added the required column `Email` to the `Restaurant` table without a default value. This is not possible if the table is not empty.
  - Added the required column `Password` to the `Restaurant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Restaurant" ADD COLUMN     "Email" TEXT NOT NULL,
ADD COLUMN     "Password" TEXT NOT NULL;
