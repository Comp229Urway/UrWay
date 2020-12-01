import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { SurveyModel } from '../../model/survey.model';
import { BasePageComponent } from '../../partials/base-page/base-page.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends BasePageComponent implements OnInit {
  title= "Home";
  activeSurveys: SurveyModel[] = [];
  constructor(route: ActivatedRoute, private http: HttpClient) {
    super(route);
  }

  ngOnInit(): void {
    this.onGetData();
  }

  onGetData()
  {console.log("Fetching Active Surveys...");
    this.http.get<{message:string, survey: SurveyModel[]}>('http://localhost:4000/surveys/active/').subscribe(getData => {
      this.activeSurveys = getData.survey;
      console.log(getData.message);
    });
  }
}
