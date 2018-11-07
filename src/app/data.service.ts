import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Import it up here
 interface Location {
   Lat: number;
   Lng: number;
   EventName: string;
   Information: string;
   participant: number;
   date: Date;
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
    return this.http.get<Location>('http://localhost:3000/posts');
  }
  getoneLocation(id){
    return this.http.get<Location>('http://localhost:3000/posts/'+id);
  }
  getUsers() {
    return this.http.get('https://reqres.in/api/users');
  }
  postsmth(){
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
    this.http.post('http://localhost:3000/posts', event)
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
    return this.http.get('http://localhost:3000/posts');
  }

}