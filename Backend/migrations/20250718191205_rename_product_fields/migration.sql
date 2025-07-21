/*
  Warnings:

  - You are about to drop the column `descricao` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `imagem` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `nome` on the `product` table. All the data in the column will be lost.
  - You are about to drop the column `preco` on the `product` table. All the data in the column will be lost.
  - Added the required column `description` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `price` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `product` DROP COLUMN `descricao`,
    DROP COLUMN `imagem`,
    DROP COLUMN `nome`,
    DROP COLUMN `preco`,
    ADD COLUMN `description` VARCHAR(191) NOT NULL,
    ADD COLUMN `image` VARCHAR(191) NOT NULL,
    ADD COLUMN `name` VARCHAR(191) NOT NULL,
    ADD COLUMN `price` DOUBLE NOT NULL;
