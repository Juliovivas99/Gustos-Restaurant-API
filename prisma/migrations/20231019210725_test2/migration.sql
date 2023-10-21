/*
  Warnings:

  - Added the required column `duration` to the `Reservation` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isAvailable` to the `RestaurantTable` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Reservation` ADD COLUMN `duration` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `RestaurantTable` ADD COLUMN `isAvailable` BOOLEAN NOT NULL;
