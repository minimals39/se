import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Import it up here
import { takeWhile } from 'rxjs/operators';
var url = "http://127.0.0.1:3000"
 interface Location {
   _id:string;
   Lat: number;
   Lng: number;
   EventName: string;
   /*lat: number;
   lng: number;
   name: string;*/
   Information: string;
   participant: number;
   date: Date;
   category: string;
   createrID: string;
 } 
 interface locaname{
  results: string;

 }
 
 interface userData{
  Name: String;
  Year: number;
  Department: String;
  Faculty: String;
 }
@Injectable({
  providedIn: 'root'
})
export class DataService {
  
  constructor(private http: HttpClient) { }
  getLocation(){
    return this.http.get<Location>(url+'/map/get');
  }

  getoneLocation(id){
    return this.http.get<Location>(url+'/map/getOne/'+id);
  }
  getUsers() {
    return this.http.get(url+'/users/getUsers');
  }
  postsmth(){ //test post
    this.http.post(url+'/posts', {
      title: 'foo',
      body: 'bar',
      userId: 1
    })
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log("Error occured");
        }
      );

  }
  postevent(event){
    this.http.post(url+'/map/posts', event)
      .subscribe(
        res => {
          console.log("res");
        },
        err => {

          console.log("Error occured",err);
        }
      );

  }

  delevent(event){
    console.log(event)
    this.http.post(url+'/map/deleteMap', event)
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log("Error occured");
        }
      );

  }
  editevent(event){
    console.log(event)
    this.http.post(url+'/map/mapUpdate', event)
      .subscribe(
        res => {
          console.log(res);
        },
        err => {
          console.log("Error occured");
        }
      );

  }
  
  participate(event){
    console.log("asdfgn ",event)

    return this.http.post(url+'/users/joinNewActivity',event)
    .subscribe(
      res =>{
        console.log(res)
      },err=>{
        console.log(err)
      }
    )
  }

  createUser(event){
    console.log("create user : ", event)
    localStorage.setItem('userID',event.userID)
    return this.http.post(url+'/users/login',event)
    .subscribe(
      err=>{
        console.log(err)
      }, 
      res=>{

        // console.log("res.jwtToken")
        // localStorage.setItem()
      })
  }
  postUser(event){
    this.http.post(url+'/users/updateUser', event)
      .subscribe(
        res => {
          console.log(event)
          console.log("res");
        },
        err => {

          console.log("Error occured",err);
        }
      );

  }
  getsmth() {
    return this.http.get(url+'/map/get');
  }

}