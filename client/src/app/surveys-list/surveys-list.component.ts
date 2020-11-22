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
  public selectedSurvey = null;

  constructor(private repository: SurveyRepository) { }

  get surveys(): Survey[]
  {
    return this.repository.getSurveys(this.selectedSurvey);
  }

  get surveyTypes(): string[]
  {
    return this.repository.getSurveyTypes();
  }

  changeSurveyType(newSurvey?: string): void
  {
    this.selectedSurvey = newSurvey;
  }
}
