import { Component, OnInit, OnChanges } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { BasePageComponent } from 'src/app/partials/base-page/base-page.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormatWidth } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { SurveyModel } from '../../model/survey.model'
import { MatExpansionModule } from '@angular/material/expansion';
import { PassDataService } from 'src/app/Services/passData.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [PassDataService]
})
export class CreateComponent implements OnInit {

  surveyForm: FormGroup;
  /*formTemplete : {
    surveyTitle: string,
       surveyDescription: string,
       questionsDetail: [{
        questionType:string,
        question: string,
        choices: string[]
       }]
  };*/
  surveyToEdit: SurveyModel;
  editID: string;
  editSurveyTitle: string;
  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private http: HttpClient, private router: Router, private passData: PassDataService) {

   }
   ngOnInit(): void {
    this.surveyForm = this.formBuilder.group({
      'surveyTitle': new FormControl(null, Validators.required),
      'surveyDescription': new FormControl(null),
      'questionsDetail': this.formBuilder.array([
        this.formBuilder.group({
         'questionType': new FormControl(null, Validators.required),
          'question': new FormControl(null, Validators.required),
          'choices': this.formBuilder.array([])
        })
      ])
    });
    console.log(this.passData.getSurveyData());
      this.route.params.subscribe(
       (params: Params)=> {
         this.editID = params['id'];
         console.log("ID: ", this.editID);
       }
     );
     this.getEditData();
    };
     getEditData()
    {
      this.http.get<{message:string, survey: SurveyModel}>('http://localhost:4000/surveys/edit/' + this.editID).subscribe(getData => {
      this.surveyToEdit = getData.survey;
      console.log(getData.message);
      console.log("Survey Title:",this.surveyToEdit); });
    }

  onSubmit()
  {
    console.log("Submit");
    console.log(this.surveyForm.value);
    this.http.post<{message: string}>('http://localhost:4000/surveys/create-mcq', this.surveyForm.getRawValue()).subscribe((response) => {console.log(response.message)});
    this.router.navigate(['/surveys']);
    /*this.formTemplete = this.surveyForm.value;
    this.http.post('https://urway-survey.firebaseio.com/surveys.json', this.formTemplete).subscribe(response=>{console.log(response)});*/
  }

  onAddChoices(index: number)
  {
    (this.questionsDetailcontrols.at(index).get('choices') as FormArray).push(new FormControl(null, Validators.required));
  }
  onAddQuestion()
  {
    const control = new FormGroup({
      'questionType': new FormControl(null, Validators.required),
      'question': new FormControl(null, Validators.required),
      'choices': this.formBuilder.array([new FormControl(null, Validators.required)])
    });
    (this.surveyForm.get('questionsDetail') as FormArray).push(control);
  }
  get questionsDetailcontrols() {
    return (this.surveyForm.get('questionsDetail') as FormArray);
  }
  getChoicesControl(index: number)
  {
    return (this.questionsDetailcontrols.at(index).get('choices') as FormArray).controls;
  }
  hideChoices(index: number)
  {
    if(this.questionsDetailcontrols.at(index).get('questionType')?.value === 'mcq')
    {
      return false;
    }
    else
    {
      return true;
    }
  }
  onRemoveChoice(group: number, index: number)
  {
    (this.questionsDetailcontrols.at(group).get('choices') as FormArray).removeAt(index);
  }
  onRemoveQuestion(index: number)
  {
    this.questionsDetailcontrols.removeAt(index);
  }
  removeElements(index: number)
  {
    const length = (this.questionsDetailcontrols.at(index).get('choices') as FormArray).controls.length;
    for(let i=0; i < length; i++)
    {
      (this.questionsDetailcontrols.at(index).get('choices') as FormArray).removeAt(i);
    }
    if(this.questionsDetailcontrols.at(index).get('questionType')?.value ==='mcq')
    {
      for(let i=0; i < length; i++)
      {
        (this.questionsDetailcontrols.at(index).get('choices') as FormArray).removeAt(i);
      }
      (this.questionsDetailcontrols.at(index).get('choices') as FormArray).push(new FormControl(null, Validators.required));
      (this.questionsDetailcontrols.at(index).get('choices') as FormArray).push(new FormControl(null, Validators.required));
    }
    else if(this.questionsDetailcontrols.at(index).get('questionType')?.value ==='tof')
    {
      for(let i=0; i < length; i++)
      {
        (this.questionsDetailcontrols.at(index).get('choices') as FormArray).removeAt(i);
      }
      (this.questionsDetailcontrols.at(index).get('choices') as FormArray).push(new FormControl('True', Validators.required));
      (this.questionsDetailcontrols.at(index).get('choices') as FormArray).push(new FormControl('False', [Validators.required]));
      (this.questionsDetailcontrols.at(index).get('choices') as FormArray).disable();
    }
    else if(this.questionsDetailcontrols.at(index).get('questionType')?.value ==='saq')
    {
      for(let i=0; i < length; i++)
      {
        (this.questionsDetailcontrols.at(index).get('choices') as FormArray).removeAt(i);
      }
      (this.questionsDetailcontrols.at(index).get('choices') as FormArray).push(new FormControl('Answer Here', Validators.required));
      (this.questionsDetailcontrols.at(index).get('choices') as FormArray).disable();
    }
  }
}
