import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SurveyListModule } from './surveys-list/surveys-list.module';

import { HeaderComponent } from './partials/header/header.component';
import { FooterComponent } from './partials/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { SurveyComponent } from './pages/survey/survey.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { BasePageComponent } from './partials/base-page/base-page.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    SurveyComponent,
    AboutComponent,
    ContactComponent,
    BasePageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SurveyListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
