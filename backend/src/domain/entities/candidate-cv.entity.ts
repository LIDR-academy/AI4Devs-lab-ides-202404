export class CandidateCV {
  constructor(
    public readonly fileName: string,
    public readonly filePath: string,
    public readonly candidateId?: number,
    public readonly id?: number,
  ) {}
}
