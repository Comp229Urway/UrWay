import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';

import { BasePageComponent } from 'src/app/partials/base-page/base-page.component';
import { PassDataService } from 'src/app/Services/passData.service';
import { SurveyModel } from '../../model/survey.model';

@Component({
  selector: 'app-surveys',
  templateUrl: './surveys.component.html',
  styleUrls: ['./surveys.component.css'],
  providers:[PassDataService]
})
export class SurveysComponent extends BasePageComponent implements OnInit {

  surveyCollection: SurveyModel[] = [];
  private updatedCollection = new Subject<SurveyModel[]>();
  constructor(route: ActivatedRoute, private http: HttpClient, private router: Router, private passData: PassDataService) {
    super(route); }
  ngOnInit(): void {
    this.onGetData();
  }
  onGetData()
  {
    this.http.get<{message:string, survey: SurveyModel[]}>('http://localhost:4000/surveys').subscribe(getData => {
      this.surveyCollection = getData.survey;
      console.log(getData.message);
      console.log(this.surveyCollection)});
  }
  onDeleteSurvey(id: string)
  {
    this.http.get<{message: string}>('http://localhost:4000/surveys/delete/' + id).subscribe((Response) => {
      const updatedSurvey = this.surveyCollection.filter(survey => survey._id !== id);
      this.surveyCollection = updatedSurvey;
      this.updatedCollection.next([...updatedSurvey]);
      console.log(Response.message);
     });
  }
onEdit(id: string)
{

  this.router.navigate(['/surveys/edit/' +id]);
}
}

