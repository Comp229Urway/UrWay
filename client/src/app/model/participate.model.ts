import { QuestionAndAnswerModel } from './questionAndAnswer.model';

export interface ParticipateModel
{
  _id?: string,
  dateCreated?: Date,
  username?: string,
  surveyID?: string,
  surveyTitle?: string,
  surveyDescription?: string,
  questionAndAnswer?: QuestionAndAnswerModel[]
}
