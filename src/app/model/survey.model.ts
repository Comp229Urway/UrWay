import { QuestionDetailsModel } from './questionDetails.model';
export class SurveyModel
{
  constructor(
    public surveyID?: string,
    public surveyTitle?: string,
    public questionDetails?: QuestionDetailsModel[],
    public dateCreated?: Date,
    public surveyDescription?: string
    ){}
}
