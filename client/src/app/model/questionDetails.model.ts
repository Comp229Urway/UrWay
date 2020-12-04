export class QuestionDetailsModel
{
  constructor(
    public qType?: string,
    public question?: string,
    public choices?: string[]){}
}
