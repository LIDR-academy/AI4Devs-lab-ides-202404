/*
  Warnings:

  - You are about to drop the column `cv` on the `Candidate` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[cvId]` on the table `Candidate` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Candidate" DROP COLUMN "cv",
ADD COLUMN     "cvId" INTEGER;

-- CreateTable
CREATE TABLE "CandidateCV" (
    "id" SERIAL NOT NULL,
    "candidateId" INTEGER NOT NULL,
    "fileName" TEXT NOT NULL,
    "filePath" TEXT NOT NULL,

    CONSTRAINT "CandidateCV_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "CandidateCV_candidateId_key" ON "CandidateCV"("candidateId");

-- CreateIndex
CREATE UNIQUE INDEX "Candidate_cvId_key" ON "Candidate"("cvId");

-- AddForeignKey
ALTER TABLE "CandidateCV" ADD CONSTRAINT "CandidateCV_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
