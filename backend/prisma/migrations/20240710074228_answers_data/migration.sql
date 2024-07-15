-- CreateTable
CREATE TABLE "UserAnswer" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "UserAnswer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionAndAnswer" (
    "id" SERIAL NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "userAnswerId" INTEGER,

    CONSTRAINT "QuestionAndAnswer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "UserAnswer" ADD CONSTRAINT "UserAnswer_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "QuestionAndAnswer" ADD CONSTRAINT "QuestionAndAnswer_userAnswerId_fkey" FOREIGN KEY ("userAnswerId") REFERENCES "UserAnswer"("id") ON DELETE SET NULL ON UPDATE CASCADE;
