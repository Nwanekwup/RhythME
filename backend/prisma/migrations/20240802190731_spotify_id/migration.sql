/*
  Warnings:

  - You are about to drop the column `spotifyUrl` on the `Song` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Song" DROP COLUMN "spotifyUrl",
ADD COLUMN     "spotifyId" TEXT;
