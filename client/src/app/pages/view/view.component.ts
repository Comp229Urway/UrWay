import { HttpClient } from '@angular/common/http';
import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
  templateSurvey: SurveyModel;
  participants: ParticipateModel[];
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
    }
    console.log(response.message);
    console.log(response.participants);
  });
  }
}
