import { Injectable } from '@angular/core';
import { Survey } from './survey.model';
import { StaticDataSource} from './static.datasource';

@Injectable()
export class SurveyRepository
{
  private surveys: Survey[] = [];
  private surveyID: number[] = [];
  private surveyTitle: string[] = [];
  private description: string[] = [];
  private questionType: string[] = [];
  private questions: [string][] = [];
  private answers: [[string]][] = [];

  constructor(private dataSource: StaticDataSource)
  {
    dataSource.getSurveys().subscribe(data => {
      this.surveys = data;
      this.surveyTitle = data.map(s => s.surveyTitle)
        .filter((a, index, array) => array.indexOf(a) === index).sort();
    });
  }

  getSurveys(surveyTitle: string = null) : Survey[] {
    return this.surveys
      .filter(s => surveyTitle == null || surveyTitle === s.surveyTitle);
  }

  getSurvey(surveyID: number): Survey
  {
    return this.surveys.find(s => s._id === surveyID);
  }

  getQuestionType(): string[]
  {
    return this.questionType;
  }
}
