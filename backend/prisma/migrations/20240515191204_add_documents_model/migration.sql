-- CreateTable
CREATE TABLE "Document" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "candidateId" INTEGER NOT NULL,

    CONSTRAINT "Document_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Document" ADD CONSTRAINT "Document_candidateId_fkey" FOREIGN KEY ("candidateId") REFERENCES "Candidate"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
