export interface SurveyModel
{
  _id?: string,
  surveyTitle?: string,
  surveyDescription?: string,
  questionsDetail?: [{
  questionType?:string,
  question?: string,
  choices?: string[]
       }]
}
