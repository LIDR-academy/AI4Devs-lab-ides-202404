-- Add dummy CandidateCV records for existing Candidates
INSERT INTO
    "CandidateCV" (
        "candidateId",
        "fileName",
        "filePath"
    )
SELECT "id", 'dummy_cv.pdf', '/path/to/dummy_cv.pdf'
FROM "Candidate";