/*
  Warnings:

  - You are about to drop the column `otp` on the `PasswordReset` table. All the data in the column will be lost.
  - You are about to drop the column `isVerified` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[token]` on the table `PasswordReset` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `token` to the `PasswordReset` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "PasswordReset" DROP CONSTRAINT "PasswordReset_userId_fkey";

-- DropIndex
DROP INDEX "PasswordReset_otp_idx";

-- AlterTable
ALTER TABLE "PasswordReset" DROP COLUMN "otp",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "token" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "isVerified",
ALTER COLUMN "name" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "PasswordReset_token_key" ON "PasswordReset"("token");

-- AddForeignKey
ALTER TABLE "PasswordReset" ADD CONSTRAINT "PasswordReset_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
