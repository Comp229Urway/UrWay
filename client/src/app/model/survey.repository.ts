import { Injectable } from '@angular/core';
import { Survey } from './survey.model';
import { StaticDataSource} from './static.datasource';
import { RestDataSource } from './rest.datasource';


@Injectable()
export class SurveyRepository
{
  private surveys: Survey[] = [];
  private questionTypes: string[] = [];

  constructor(private dataSource: RestDataSource)
  {
    dataSource.getSurveys().subscribe(data => {
      this.surveys = data;
      this.questionTypes = data.map(s => s.questionType)
        .filter((t, index, array) => array.indexOf(t) === index).sort();
    });
  }

  getSurveys(questionType: string = null): Survey[]
  {
    return this.surveys
      .filter(s => questionType == null || questionType === s.questionType);
  }

  getSurvey(id: number): Survey
  {
    return this.surveys.find(s => s._id === id);
  }

  getSurveyTypes(): string[]
  {
    return this.questionTypes;
  }
}
