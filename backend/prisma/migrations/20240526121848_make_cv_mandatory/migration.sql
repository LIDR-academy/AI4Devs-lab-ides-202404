-- DropForeignKey
ALTER TABLE "CandidateCV"
DROP CONSTRAINT "CandidateCV_candidateId_fkey";

-- AddForeignKey
ALTER TABLE "Candidate"
ADD CONSTRAINT "Candidate_id_fkey" FOREIGN KEY ("id") REFERENCES "CandidateCV" ("candidateId") ON DELETE RESTRICT ON UPDATE CASCADE;