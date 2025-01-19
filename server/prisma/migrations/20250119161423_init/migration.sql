-- CreateTable
CREATE TABLE `USER` (
    `userID` INTEGER NOT NULL AUTO_INCREMENT,
    `username` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NOT NULL,
    `registrationDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `USER_email_key`(`email`),
    PRIMARY KEY (`userID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `taskSub` (
    `taskSubID` INTEGER NOT NULL AUTO_INCREMENT,
    `channelLink` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `createdDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` VARCHAR(191) NOT NULL,
    `completedCount` INTEGER NOT NULL,

    PRIMARY KEY (`taskSubID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `taskVideo` (
    `taskVideoID` INTEGER NOT NULL AUTO_INCREMENT,
    `videoLink` VARCHAR(191) NOT NULL,
    `description` VARCHAR(191) NOT NULL,
    `createdDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` VARCHAR(191) NOT NULL,
    `completedCount` INTEGER NOT NULL,

    PRIMARY KEY (`taskVideoID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `completedSub` (
    `completedSubID` INTEGER NOT NULL AUTO_INCREMENT,
    `userID` INTEGER NOT NULL,
    `taskSubID` INTEGER NOT NULL,
    `submissionDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `proofLink` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`completedSubID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `completedVideo` (
    `completedVideoID` INTEGER NOT NULL AUTO_INCREMENT,
    `userID` INTEGER NOT NULL,
    `taskVideoID` INTEGER NOT NULL,
    `submissionDate` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `proofLink` VARCHAR(191) NOT NULL,
    `status` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`completedVideoID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Admin` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Admin_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `completedSub` ADD CONSTRAINT `completedSub_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `USER`(`userID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `completedSub` ADD CONSTRAINT `completedSub_taskSubID_fkey` FOREIGN KEY (`taskSubID`) REFERENCES `taskSub`(`taskSubID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `completedVideo` ADD CONSTRAINT `completedVideo_userID_fkey` FOREIGN KEY (`userID`) REFERENCES `USER`(`userID`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `completedVideo` ADD CONSTRAINT `completedVideo_taskVideoID_fkey` FOREIGN KEY (`taskVideoID`) REFERENCES `taskVideo`(`taskVideoID`) ON DELETE CASCADE ON UPDATE CASCADE;
