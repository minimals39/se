import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Import it up here
 interface Location {
   lat: string;
   lon: string;
   city: string;
 }
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }
  getLocation(){
    return this.http.get<Location>('http://ip-api.com/json/208.80.152.201')
  }
  getUsers() {
    return this.http.get('https://reqres.in/api/users')
  }
  
}