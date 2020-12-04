
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { data } from 'jquery';
import { Subject, Subscription } from 'rxjs';
import { DialogBoxComponent } from 'src/app/partials/dialog-box/dialog-box.component';

@Injectable({providedIn:"root"})
export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private authStatusListener = new Subject<boolean>();
  private registerErrorListener = new Subject<boolean>();
  private registerMessageListener = new Subject<string>();

  constructor(private http: HttpClient, private router: Router, private dialog: MatDialog) {}

  getRegisterErrorListener(){
    return this.registerErrorListener;
  }
  getRegisterMessageListener(){
    return this.registerMessageListener;
  }

  createUser(registerForm: any){
    this.http.post<{message: string, success: boolean}>('http://localhost:4000/users/register', registerForm).subscribe((response) => {
      if(response.success)
      {
        this.router.navigate(['/login']);
      }
      else if(!response.success)
      {
        console.log(this.dialog.open(DialogBoxComponent, {data: {title: null,message: response.message}}));
        console.log(response.message);
        /* this.registerErrorListener.next(false);
        this.registerMessageListener.next(response.message); */
      }
    });
  }
  login(loginForm: any){
    this.http.post<{message: string, token: string, username: string, success: boolean}>('http://localhost:4000/users/login', loginForm).subscribe(response => {
      this.token = response.token;
      console.log(response.message);
      this.isAuthenticated = true;
      if(response.success)
      {
        this.saveAuthData(this.token, response.username);

        this.authStatusListener.next(true);
        this.router.navigate(['/surveys']);
      }
      else if(!response.success)
      {
        this.dialog.open(DialogBoxComponent, {data: {title: null,message: response.message}});
      }
    });
  }
  getisAuthenticated()
  {
    return this.isAuthenticated;
  }
  getToken()
  {
    return this.token;
  }
  getAuthStatusListener()
  {
    return this.authStatusListener.asObservable();
  }
  logout()
  {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    this.clearAuthData();
  }
  saveAuthData(token: string, username: string)
  {
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    localStorage.setItem("isAuthenticated", "true");
  }
  clearAuthData()
  {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("isAuthenticated");
  }
  getAuthdata()
  {
    const token = localStorage.getItem("token");
    const username = localStorage.getItem("username");
    if(!token || !username)
    {
      return {
        token: null,
        username: null,
        isAuthenticated: false
      };
    }
    return {
      token: token,
      username: username,
      isAuthenticated: true
    };
  }
}
