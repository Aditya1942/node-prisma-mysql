/*
  Warnings:

  - You are about to drop the column `postId` on the `User` table. All the data in the column will be lost.
  - Added the required column `userId` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `User` DROP FOREIGN KEY `User_postId_fkey`;

-- AlterTable
ALTER TABLE `Post` ADD COLUMN `userId` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `User` DROP COLUMN `postId`;

-- CreateIndex
CREATE INDEX `Post_userId_idx` ON `Post`(`userId`);

-- AddForeignKey
ALTER TABLE `Post` ADD CONSTRAINT `Post_userId_fkey` FOREIGN KEY (`userId`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
