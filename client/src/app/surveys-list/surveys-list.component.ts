import { Component } from '@angular/core';
import { Survey } from '../model/survey.model';
import { SurveyRepository } from './../model/survey.repository';

@Component({
  selector: 'app-surveys-list',
  templateUrl: './surveys-list.component.html',
  styleUrls: ['./surveys-list.component.css']
})
export class SurveysListComponent
{
  public selectedSurveys = null;

  constructor(private repository: SurveyRepository) { }

  get survey(): Survey[]
  {
    return this.repository.getSurveys(this.selectedSurveys);
  }

  get surveyType(): string[]
  {
    return this.repository.getSurveyType();
  }

  changeSurvey(newSurvey?: string): void
  {
    this.selectedSurveys = newSurvey;
  }
}
