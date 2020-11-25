import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { BasePageComponent } from 'src/app/partials/base-page/base-page.component';
import { QuestionDetailsModel} from '../../model/questionDetails.model';
import { SurveyModel } from '../../model/survey.model';

@Component({
  selector: 'app-surveys',
  templateUrl: './surveys.component.html',
  styleUrls: ['./surveys.component.css']
})
export class SurveysComponent extends BasePageComponent implements OnInit {
  surveyTitle: string = "";
  surveyDescription: string = "";
  date: Date = new Date;
  completeSurvey: SurveyModel = {};
  question: string="";
  questionType: string = "";
  choice: string = "";
  choices: string[] = [];
  questionDetails: QuestionDetailsModel[] = [];
  constructor(route: ActivatedRoute) {
    super(route); }
  ngOnInit(): void {
    this.questionType = "Multiple Choice";
  }

  onAddChoice()
  {
    this.choices.push(this.choice);
    this.choice="";
  }
  onDeleteChoice(index: number)
  {
    this.choices.splice(index,1);
  }
  onNextQuestion()
  {
    if(this.questionType === "True or False")
    {
      this.choices.push("true");
      this.choices.push("false");
    }
    else
    {
      this.choices = this.choices;
    }
    this.questionDetails.push(new QuestionDetailsModel(this.questionType, this.question, this.choices));
    this.questionType="Multiple Choice";
    this.choices=[];
    this.question="";
    console.log(this.date);
  }
  onCreate()
  {
    this.completeSurvey.dateCreated = new Date;
    this.completeSurvey.questionDetails = this.questionDetails;
    this.completeSurvey.surveyTitle = this.surveyTitle;
    this.completeSurvey.surveyDescription = this.surveyDescription;
    console.log(this.completeSurvey);
  }
}
