export class Survey
{
  constructor(
    public _id?: number,
    public username?: string,
    public surveyID?: number,
    public surveyTitle?: string,
    public description?: string,
    public questionType?: string,
    public questions?: [string],
    public answers?: [[string]]
  ) { }

  public toString(): string
  {
    return `
    Survey
    -------------------------------
    Title               : ${this.surveyTitle}
    Username            : ${this.username}
    Description         : ${this.description}
    Type of Survey      : ${this.questionType}
    -------------------------------
    `;
  }
 }

