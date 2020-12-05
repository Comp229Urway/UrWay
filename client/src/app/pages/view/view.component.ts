import { HttpClient } from '@angular/common/http';
import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, ChildrenOutletContexts, Params, Router } from '@angular/router';
import { ParticipateModel } from 'src/app/model/participate.model';
import { SurveyModel } from 'src/app/model/survey.model';
import { DialogBoxComponent } from 'src/app/partials/dialog-box/dialog-box.component';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  idToFind: string;
  templateSurvey: SurveyModel = {questionsDetail: [{}]};
  participants: ParticipateModel[] = [];
  count : [number[]] = [[]];
  saqTemp: [string[]]= [[]];
  showData = false;
  constructor(private route: ActivatedRoute, private http: HttpClient, private dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params)=> {
        this.idToFind = params['id'];
      });
      this.getSurvey();
      this.getParticipants();
  }
  getSurvey()
  {
    this.http.get<{message:string, survey: SurveyModel, success: boolean}>('http://localhost:4000/surveys/edit/' + this.idToFind).subscribe(response => {
      if(response.success)
      {
        this.templateSurvey = response.survey;
      }
      else
      {
        this.dialog.open(DialogBoxComponent, {data: {title: "Error", message: response.message, isNotify: true}});
        this.router.navigate(['/surveys']);
      }
      console.log(response.message);
    });
  }
  getParticipants()
  {
    this.http.get<{message:string, participants: ParticipateModel[], success: boolean}>('http://localhost:4000/participate/participants/' + this.idToFind).subscribe(response => {
    if(response.message)
    {

      this.participants = response.participants;
      this.toNumber();
      this.getCount()
      console.log(this.templateSurvey);
      console.log(this.count);
      console.log("saqTemp: ", this.saqTemp);
      this.showData = true;
    }
    console.log(response.message);
  });
  }
  getActiveDate()
  {
    return this.toInputDate(this.templateSurvey.dateActiveStart)+" to "+ this.toInputDate(this.templateSurvey.dateActiveEnd)
  }
  toInputDate(date: any)
  {
    if(date)
    {
      return(date.toLocaleString().split("T")[0]);
    }
  }
  toNumber()
  {
    for(let i = 0; i < this.templateSurvey.questionsDetail.length; i++)
    {
      let choiceCount = [];
      let tempSaq = [];
      for(let j = 0; j < this.templateSurvey.questionsDetail[i].choices.length; j++)
      {
        choiceCount.push(0);
      }
      this.count.push(choiceCount);
      this.saqTemp.push(tempSaq);
    }
    this.count.splice(0, 1);
    this.saqTemp.splice(0, 1);
  }
  getCount()
  {
    for(let a=0; a < this.participants.length; a++) /* Loop through all participants */
    {
      for(let b=0; b < this.participants[a].questionAndAnswer.length; b++) /* Loop through all questions and answers of each participants and compare to survey */
      {
        let temp: string[] = [];
        if(this.templateSurvey.questionsDetail[b].questionType === "saq")
        {
          this.saqTemp[b].push(this.participants[a]._id + " Answered: " + this.participants[a].questionAndAnswer[b].answer);
        }
        else
        {
          for(let c=0; c < this.templateSurvey.questionsDetail[b].choices.length; c++)
          {
            if(this.templateSurvey.questionsDetail[b].choices[c] === this.participants[a].questionAndAnswer[b].answer)
            {
              this.count[b][c]++;
            }
          }
        }
      }
    }
  }
  toPercentage(data: number)
  {
    let conversion = (data/this.participants.length)* 100;
    return conversion.toFixed(2);
  }
}
