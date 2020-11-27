import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HomeComponent } from './pages/home/home.component';
import { SurveysComponent } from './pages/surveys/surveys.component';
import { CreateComponent } from './pages/create/create.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent, data: {title: 'Home'}},
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'surveys', component: SurveysComponent, data: {title: 'Surveys'}},
  {path: 'surveys/edit/:id', component: CreateComponent, data: {title: 'Edit'}},
  {path: 'surveys/create', component: CreateComponent, data: {title: 'Create'}},
  {path: 'about', component: AboutComponent, data: {title: 'About Us'}},
  {path: 'contact', component: ContactComponent, data: {title: 'Contact Us'}}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
