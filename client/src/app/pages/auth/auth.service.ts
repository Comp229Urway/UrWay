import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({providedIn:"root"})
export class AuthService {

  constructor(private http: HttpClient) {}
  createUser(registerForm: any){
    this.http.post('http://localhost:4000/users/register', registerForm).subscribe((response) => {
      console.log(response)
    });
  }
  login(loginForm: any){
    this.http.post('http://localhost:4000/users/login', loginForm).subscribe();
  }
}
