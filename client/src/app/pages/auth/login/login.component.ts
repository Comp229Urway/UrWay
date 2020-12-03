import { Component, Injectable, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { DialogBoxComponent } from 'src/app/partials/dialog-box/dialog-box.component';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
//@Injectable()
export class LoginComponent implements OnInit {
loginForm = new FormGroup({
  username: new FormControl(null, Validators.required),
  password: new FormControl(null, Validators.required)
});
showError = false;

  constructor(public authService: AuthService, private dialog: MatDialog) { }

  ngOnInit(): void {
    //this.dialog.open(DialogBoxComponent);
  }
  onLogin()
    {
      if(this.loginForm.valid){
        this.authService.login(this.loginForm.getRawValue());
      }
    }
}

