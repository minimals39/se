import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
interface user {
name: string;
email: string;
type: number;
}
interface myData{
  success: boolean,
  message: string,

}
@Injectable({
  providedIn: 'root'
})
export class UserserviceService {
  private loggedInStatus = JSON.parse(localStorage.getItem('loggedIn') || 'false');
  constructor(private http: HttpClient) { }

  setLoggedIn(value: boolean,name: string){
  this.loggedInStatus = value;
  localStorage.setItem('loggedIn','true');
  localStorage.setItem('name', name);
  this.userlogin(name);
}
  get isLoggedIn(){
    return JSON.parse(localStorage.getItem('loggedIn') || this.loggedInStatus)
  }
  userlogin(name){
    this.http.post('http://localhost:3000/posts', name)
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log("Error occured");
        }
      );

  }

  logout(){
    this.loggedInStatus = false;
    localStorage.setItem('loggedIn','false');
    console.log(this.isLoggedIn);
  }
}
