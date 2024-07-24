-- AlterTable
ALTER TABLE "Song" ADD COLUMN     "songMoodScores" JSONB NOT NULL DEFAULT '{}';

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "userMoodScores" JSONB NOT NULL DEFAULT '{}';
