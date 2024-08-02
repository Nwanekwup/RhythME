-- AlterTable
ALTER TABLE "Song" ADD COLUMN     "spotifyUrl" TEXT;

-- CreateTable
CREATE TABLE "RecommendedSong" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "songId" INTEGER NOT NULL,

    CONSTRAINT "RecommendedSong_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RecommendedSong" ADD CONSTRAINT "RecommendedSong_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecommendedSong" ADD CONSTRAINT "RecommendedSong_songId_fkey" FOREIGN KEY ("songId") REFERENCES "Song"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
