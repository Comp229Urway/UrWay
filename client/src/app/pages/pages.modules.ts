import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { HomeComponent } from './home/home.component';
import { SurveyComponent } from './survey/survey.component';


@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [AboutComponent,ContactComponent,HomeComponent,SurveyComponent],
  exports: [AboutComponent,ContactComponent,HomeComponent,SurveyComponent]
})
export class PagesModule {}
