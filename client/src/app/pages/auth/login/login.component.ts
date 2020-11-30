import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
loginForm = new FormGroup({
  username: new FormControl(null, Validators.required),
  password: new FormControl(null, Validators.required)
});

  constructor() { }

  ngOnInit(): void {
  }
  onLogin()
    {
      if(this.loginForm.valid)
      {
        console.log(this.loginForm);
      }
    }
}

