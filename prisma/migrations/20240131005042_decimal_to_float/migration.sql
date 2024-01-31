/*
  Warnings:

  - You are about to alter the column `maxWeight` on the `Exercise` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `repetitionMax` on the `Exercise` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `lastWeight` on the `Exercise` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `weight` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.
  - You are about to alter the column `height` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `DoublePrecision`.

*/
-- AlterTable
ALTER TABLE "Exercise" ALTER COLUMN "maxWeight" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "repetitionMax" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "lastWeight" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "weight" SET DATA TYPE DOUBLE PRECISION,
ALTER COLUMN "height" SET DATA TYPE DOUBLE PRECISION;
