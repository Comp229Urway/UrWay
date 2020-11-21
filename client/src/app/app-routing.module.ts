import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HomeComponent } from './pages/home/home.component';
import { SurveyComponent } from './pages/survey/survey.component';
import { SurveysListComponent } from './surveys-list/surveys-list.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent, data:{title:'Home'} },
  {path: 'about', component:AboutComponent, data:{title:'About'}  },
  {path: 'contact', component:ContactComponent, data:{title:'Contact'}  },
  { path: 'survey', component: SurveyComponent, data: { title: 'Surveys' } },
  { path: 'survey-list', component: SurveysListComponent, data: { title: 'Surveys List' } },
  {path:'', redirectTo: 'home', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
