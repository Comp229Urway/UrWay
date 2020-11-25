import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BasePageComponent } from 'src/app/partials/base-page/base-page.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormatWidth } from '@angular/common';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent extends BasePageComponent implements OnInit {

  surveyForm: FormGroup;

  constructor(route: ActivatedRoute, private formBuilder: FormBuilder) {
    super(route);
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
    };
  onSubmit()
  {
    console.log(this.surveyForm);
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
