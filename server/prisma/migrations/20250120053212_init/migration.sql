/*
  Warnings:

  - A unique constraint covering the columns `[userID]` on the table `taskSub` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userID` to the `taskSub` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userID` to the `taskVideo` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `tasksub` ADD COLUMN `userID` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `taskvideo` ADD COLUMN `userID` INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `taskSub_userID_key` ON `taskSub`(`userID`);

-- AddForeignKey
ALTER TABLE `taskSub` ADD CONSTRAINT `taskSub_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `USER`(`userID`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `taskVideo` ADD CONSTRAINT `taskVideo_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `USER`(`userID`) ON DELETE RESTRICT ON UPDATE CASCADE;
