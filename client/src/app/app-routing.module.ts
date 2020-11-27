import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HomeComponent } from './pages/home/home.component';
import { SurveyComponent } from './pages/survey/survey.component';
import { SurveysListComponent } from './surveys-list/surveys-list.component';
import { SurveyFirstGuards } from './guards/SurveyFirst.guard';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  { path: 'home', component: HomeComponent, data: { title: 'Home' } },
  {path: 'login', data: {title: 'Login'}, redirectTo: '/admin/auth', pathMatch: 'full'},

  {path: 'about', component:AboutComponent, data:{title:'About'}  },
  {path: 'contact', component:ContactComponent, data:{title:'Contact'}  },
  { path: 'survey', component: SurveyComponent, data: { title: 'Surveys' } },
  { path: 'survey-list', component: SurveysListComponent, data: { title: 'Surveys List' }, canActivate: [SurveyFirstGuards] },

   {path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)},
  {path:'', redirectTo: 'home', pathMatch: 'full'},
  {path:'**', redirectTo: 'home'},
];

@NgModule({
  imports: [FormsModule,RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [SurveyFirstGuards]
})
export class AppRoutingModule { }
