import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Import it up here
 interface Location {
   lat: string;
   lon: string;
   city: string;
   as: string;
   country: string;
   isp: string;
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
    return this.http.get<Location>('http://ip-api.com/json/208.80.152.201');
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
  
  getsmth() {
    return this.http.get('http://localhost:3000/posts');
  }

}