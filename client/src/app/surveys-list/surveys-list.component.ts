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
  public selectedSurveyType = null;
  public SurveysPerPage = 4;
  public selectedPage = 1;

  constructor(private repository: SurveyRepository) { }

  get surveys(): Survey[]
  {
    const pageIndex = (this.selectedPage - 1) * this.SurveysPerPage;
    return this.repository.getSurveys(this.selectedSurveyType)
    .slice(pageIndex, pageIndex + this.SurveysPerPage);
  }

  get surveyTypes(): string[]
  {
    return this.repository.getSurveyTypes();
  }

  changeSurveyType(newSurvey?: string): void
  {
    this.selectedSurveyType = newSurvey;
  }

  changePage(newPage: number): void
  {
    this.selectedPage = newPage;
  }

  changePageSize(newSize: number): void
  {
    this.SurveysPerPage = Number(newSize);
    this.changePage(1);
  }

  get pageNumbers(): number
  {
    return Math.ceil(this.repository
      .getSurveys(this.selectedSurveyType).length / this.SurveysPerPage);
  }
}
