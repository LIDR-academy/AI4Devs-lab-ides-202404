/*
  Warnings:

  - You are about to drop the column `cvId` on the `Candidate` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Candidate_cvId_key";

-- AlterTable
ALTER TABLE "Candidate" DROP COLUMN "cvId";
