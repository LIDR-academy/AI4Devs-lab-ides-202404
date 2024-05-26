-- DropForeignKey
ALTER TABLE "Candidate" DROP CONSTRAINT "Candidate_id_fkey";

-- AddForeignKey
ALTER TABLE "CandidateCV" ADD CONSTRAINT "CandidateCV_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
