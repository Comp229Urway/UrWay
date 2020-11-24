import { Injectable } from '@angular/core';
import { Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SurveysListComponent } from '../surveys-list/surveys-list.component';


@Injectable()
export class SurveyFirstGuards
{
  private firstNavigation = true;

  constructor(private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean
  {
    if (this.firstNavigation)
    {
      this.firstNavigation = false;
      if (route.component !== SurveysListComponent)
      {
        this.router.navigateByUrl('/surveys-list');
        return false;
      }
    }
    return true;
  }
 }
