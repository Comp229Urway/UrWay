import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm = new FormGroup({
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
    dateCreated: new FormControl(new Date),
    contact: new FormControl(null, Validators.required)
  });
  registerErrorSubs: Subscription;
  registerMessageSubs: Subscription;
  /* isError = false;
  theMessage = ""; */
  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    /* this.registerErrorSubs = this.authService.getRegisterErrorListener().subscribe(error => {
      this.isError = error;
    });
    this.registerMessageSubs = this.authService.getRegisterMessageListener().subscribe(message => {
      this.theMessage = message;
    }); */
  }
  ngOnDestroy(): void {
    /* this.registerErrorSubs.unsubscribe();
    this.registerMessageSubs.unsubscribe(); */
  }
  onRegister()
  {
    if(this.registerForm.invalid)
    {
      return;
    }
    this.authService.createUser(this.registerForm.getRawValue());
  }
}
