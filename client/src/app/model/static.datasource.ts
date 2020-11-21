import { Injectable } from '@angular/core';
import { Survey } from './survey.model';
import { Observable, from } from 'rxjs';

@Injectable()
export class StaticDataSource
{
  private surveys: Survey[] =
    [
      new Survey(1, 'Test1', 1, 'Survey 1', 'Description1', 'ToF', ['Does it work?'], [['Yes']]),
      new Survey(2, 'Test2', 2, 'Survey 2', 'Description2', 'ToF', ['Does it work?'], [['No']]),
      new Survey(3, 'Test3', 3, 'Survey 3', 'Description3', 'ToF', ['Does it work?'], [['Yes']]),
      new Survey(4, 'Test4', 4, 'Survey 4', 'Description4', 'ToF', ['Does it work?'], [['No']]),
      new Survey(5, 'Test5', 5, 'Survey 5', 'Description5', 'ToF', ['Does it work?'], [['Yes']]),
      new Survey(6, 'Test6', 6, 'Survey 6', 'Description6', 'ToF', ['Does it work?'], [['No']]),
      new Survey(7, 'Test7', 7, 'Survey 7', 'Description7', 'ToF', ['Does it work?'], [['Yes']]),
      new Survey(8, 'Test8', 8, 'Survey 8', 'Description8', 'ToF', ['Does it work?'], [['No']]),
      new Survey(9, 'Test9', 9, 'Survey 9', 'Description9', 'ToF', ['Does it work?'], [['Yes']]),
      new Survey(10, 'Test10', 10, 'Survey 10', 'Description10', 'ToF', ['Does it work?'], [['No']]),
    ];

  getSurveys(): Observable<Survey[]>
  {
    return from([this.surveys]);
  }
}
