/*
  Warnings:

  - Added the required column `email_hash` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "email_hash" TEXT NOT NULL,
ALTER COLUMN "email" SET DATA TYPE TEXT,
ALTER COLUMN "password_hash" SET DATA TYPE TEXT;
