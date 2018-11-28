import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Import it up here
 interface Location {
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
  getLocationx(){
    return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=AIzaSyAAntspVH3_QQJpWK1Y2Xe0uQ2_jKpkL9g');
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
          console.log(res);
        },
        err => {
          console.log("Error occured");
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
  
  
  getsmth() {
    return this.http.get('http://localhost:3000/map/get');
  }

}