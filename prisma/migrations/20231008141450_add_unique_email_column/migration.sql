/*
  Warnings:

  - A unique constraint covering the columns `[Email]` on the table `Restaurant` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[Email]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `Email` to the `Restaurant` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Restaurant" ADD COLUMN     "Email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Restaurant_Email_key" ON "Restaurant"("Email");

-- CreateIndex
CREATE UNIQUE INDEX "User_Email_key" ON "User"("Email");
