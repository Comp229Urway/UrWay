import { HttpClient } from '@angular/common/http';
import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ParticipateModel } from 'src/app/model/participate.model';
import { QuestionAndAnswerModel } from 'src/app/model/questionAndAnswer.model';
import { SurveyModel } from 'src/app/model/survey.model';
import { DialogBoxComponent } from 'src/app/partials/dialog-box/dialog-box.component';
import { SurveysComponent } from '../surveys/surveys.component';

@Component({
  selector: 'app-participate',
  templateUrl: './participate.component.html',
  styleUrls: ['./participate.component.css']
})
export class ParticipateComponent implements OnInit {

  participateID: string = null;
  participateSurvey: SurveyModel = {};
  answer: string[] = [];
  toSend: ParticipateModel = {};

  qna: QuestionAndAnswerModel[] = [];
  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.participateID = params['id'];
      });
      this.getSurvey();
  }
  getSurvey()
  {
    this.http.get<{message:string, survey: SurveyModel, success: boolean}>('http://localhost:4000/surveys/active/' + this.participateID).subscribe(getData => {
      if(!getData.success)
      {
        this.dialog.open(DialogBoxComponent, {data:{title: "Error", message: getData.message, isNotify: true}});
        this.router.navigate(['/home']);
      }
      else
      {
        this.participateSurvey = getData.survey;
      }

      console.log(getData.message);
    });
  }

  onSubmit()
  {
    let isempty = false;
    for(let i = 0; i<this.answer.length; i++)
    {
      if(this.answer[i] == null)
      {
        isempty = true;
        //this.dialog.open(DialogBoxComponent, {data:{title: 'Incomplete', message: 'Please Answer all Questions.', isNotify: true}});
        break;
      }
    }if(this.participateSurvey.questionsDetail.length == this.answer.length && !isempty)
    {
      this.toSend.username = this.participateSurvey.username;
      this.toSend.dateCreated = new Date,
      this.toSend.surveyID = this.participateSurvey._id;
      this.toSend.surveyTitle = this.participateSurvey.surveyTitle;
      this.toSend.surveyDescription = this.participateSurvey.surveyDescription;
      for(let i=0; i < this.participateSurvey.questionsDetail.length; i++)
      {
        this.qna.push({question: this.participateSurvey.questionsDetail[i].question, answer: this.answer[i]});
      }
      this.toSend.questionAndAnswer = this.qna;
      //console.log(this.toSend);
      this.http.post<{message: string}>('http://localhost:4000/participate/post', this.toSend).subscribe((response) => {console.log(response.message)});
      this.router.navigate(['/home']);
    }
    else
    {
      this.dialog.open(DialogBoxComponent, {data:{title: 'Incomplete', message: 'Please Answer all Questions.', isNotify: true}});
    }
  }
}
