import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';

import { BasePageComponent } from 'src/app/partials/base-page/base-page.component';
import { PassDataService } from 'src/app/Services/passData.service';
import { SurveyModel } from '../../model/survey.model';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-surveys',
  templateUrl: './surveys.component.html',
  styleUrls: ['./surveys.component.css'],
  providers:[PassDataService]
})
export class SurveysComponent extends BasePageComponent implements OnInit {

  buttonName: string[] = [];
  surveyCollection: SurveyModel[] = [];
  username: string;
  private updatedCollection = new Subject<SurveyModel[]>();
  constructor(route: ActivatedRoute, private http: HttpClient, private router: Router, private passData: PassDataService, private authService: AuthService) {
    super(route); }
  ngOnInit(): void {
    this.username = localStorage.getItem("username");
    this.onGetData();
  }
  onGetData()
  {console.log("Fetching All Data...");
    this.http.get<{message:string, survey: SurveyModel[]}>('http://localhost:4000/surveys/authenticated/' + this.username).subscribe(getData => {
      this.surveyCollection = getData.survey;
      console.log(getData.message);
      //console.log(this.surveyCollection)
      for(let i = 0; i < this.surveyCollection.length; i++)
      {
        if(this.surveyCollection[i].isActive)
        {
          this.buttonName.push("Deactivate");
        }
        else
        {
          this.buttonName.push("Activate");
        }
      }
    });
  }
  onDeleteSurvey(id: string)
  {
    if(confirm("Are you sure?"))
    {
    console.log("Deleting Survey...");

    this.http.get<{message: string}>('http://localhost:4000/surveys/delete/' + id).subscribe((Response) => {
      const updatedSurvey = this.surveyCollection.filter(survey => survey._id !== id);
      this.surveyCollection = updatedSurvey;

        this.updatedCollection.next([...updatedSurvey]);

      console.log(Response.message);
     });
    }
  }
  onEdit(id: string)
  {
    this.router.navigate(['/surveys/edit/' +id]);
  }
  onActivate(survey: SurveyModel, index: number)
  {
    let isActived = !survey.isActive;
    if(isActived)
    {
      this.buttonName[index]="Deactivate";
    }
    else
    {
      this.buttonName[index]="Activate";
    }
    this.http.post<{message: string}>('http://localhost:4000/surveys/edit/' + survey._id, {isActive: isActived}).subscribe((response) => {console.log(response.message)});
  }
}

