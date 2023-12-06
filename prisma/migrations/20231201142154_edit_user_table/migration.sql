/*
  Warnings:

  - You are about to drop the column `user_destino_id` on the `messages` table. All the data in the column will be lost.
  - You are about to drop the column `surname` on the `users` table. All the data in the column will be lost.
  - Added the required column `email` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senha` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "messages" DROP CONSTRAINT "messages_user_destino_id_fkey";

-- AlterTable
ALTER TABLE "messages" DROP COLUMN "user_destino_id";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "surname",
ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "senha" TEXT NOT NULL;
