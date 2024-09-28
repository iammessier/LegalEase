/*
  Warnings:

  - You are about to drop the column `createdAt` on the `PasswordReset` table. All the data in the column will be lost.
  - You are about to drop the column `token` on the `PasswordReset` table. All the data in the column will be lost.
  - Added the required column `otp` to the `PasswordReset` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "PasswordReset_token_key";

-- AlterTable
ALTER TABLE "PasswordReset" DROP COLUMN "createdAt",
DROP COLUMN "token",
ADD COLUMN     "otp" TEXT NOT NULL;
