import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Import it up here
import { takeWhile } from 'rxjs/operators';
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
  name: string;
  department: string;
  group: Object;
 }
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  getLocation(){
    return this.http.get<Location>('http://localhost:3000/map/get');
  }

  getoneLocation(id){
    return this.http.get<Location>('http://localhost:3000/map/getOne/'+id);
  }
  getUsers() {
    return this.http.get('http://localhost:3000/users/getUsers/');
  }
  postsmth(){ //test post
    this.http.post('http://localhost:3000/posts', {
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
    this.http.post('http://localhost:3000/map/posts', event)
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
    this.http.post('http://localhost:3000/map/deleteMap', event)
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

    return this.http.post('http://localhost:3000/users/joinNewActivity',event)
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
    return this.http.post('http://localhost:3000/users/login',event)
    .subscribe(
      err=>{
        console.log(err)
      }, 
      res=>{

        // console.log("res.jwtToken")
        // localStorage.setItem()
      })
  }
  getsmth() {
    return this.http.get('http://localhost:3000/map/get');
  }

}