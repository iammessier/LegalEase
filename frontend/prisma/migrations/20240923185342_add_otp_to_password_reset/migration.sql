/*
  Warnings:

  - You are about to drop the column `verificationCode` on the `User` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "PasswordReset" DROP CONSTRAINT "PasswordReset_userId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "verificationCode";

-- CreateIndex
CREATE INDEX "PasswordReset_otp_idx" ON "PasswordReset"("otp");

-- AddForeignKey
ALTER TABLE "PasswordReset" ADD CONSTRAINT "PasswordReset_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
