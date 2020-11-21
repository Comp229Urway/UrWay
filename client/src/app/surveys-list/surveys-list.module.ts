import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { SurveyModule } from '../model/model.module';
import { SurveysListComponent } from '../surveys-list/surveys-list.component';

@NgModule({
  imports: [SurveyModule, BrowserModule, FormsModule],
  declarations: [SurveysListComponent],
  exports: [SurveysListComponent]
})
export class SurveyListModule {}
