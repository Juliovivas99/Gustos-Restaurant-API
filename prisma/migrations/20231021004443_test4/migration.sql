/*
  Warnings:

  - You are about to drop the column `tableId` on the `Reservation` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Reservation` DROP FOREIGN KEY `Reservation_tableId_fkey`;

-- AlterTable
ALTER TABLE `Reservation` DROP COLUMN `tableId`;

-- CreateTable
CREATE TABLE `ReservationTable` (
    `reservationId` INTEGER NOT NULL,
    `tableId` INTEGER NOT NULL,

    PRIMARY KEY (`reservationId`, `tableId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `ReservationTable` ADD CONSTRAINT `ReservationTable_reservationId_fkey` FOREIGN KEY (`reservationId`) REFERENCES `Reservation`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ReservationTable` ADD CONSTRAINT `ReservationTable_tableId_fkey` FOREIGN KEY (`tableId`) REFERENCES `RestaurantTable`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
