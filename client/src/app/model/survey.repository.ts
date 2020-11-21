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
      this.questionType = data.map(s => s.questionType)
        .filter((t, index, array) => array.indexOf(t) === index).sort();
    });
  }

  getSurveys(questionType: string = null) : Survey[] {
    return this.surveys
      .filter(s => questionType == null || questionType === s.questionType);
  }

  getSurvey(surveyID: number): Survey
  {
    return this.surveys.find(s => s._id === surveyID);
  }

  getSurveyType(): string[]
  {
    return this.questionType;
  }
}
