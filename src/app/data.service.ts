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
 interface marker {
   lat: number;
   lng: number;
   label?: string;
   draggable: boolean;
 }
 declare var google: any;
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
  getGeoLocation(lat: number, lng: number) {
    if (navigator.geolocation) {
        let geocoder = new google.maps.Geocoder();
        let latlng = new google.maps.LatLng(lat, lng);
        let request = { latLng: latlng };
    
        geocoder.geocode(request, (results, status) => {
          if (status == google.maps.GeocoderStatus.OK) {
            let result = results[0];
            let rsltAdrComponent = result.address_components;
            let resultLength = rsltAdrComponent.length;
            if (result != null) {
              this.marker.buildingNum = rsltAdrComponent[resultLength-8].short_name;
              this.marker.streetName = rsltAdrComponent[resultLength-7].short_name;
            } else {
              alert("No address available!");
            }
          }
        });
    }
    }
    
  getsmth() {
    return this.http.get('http://localhost:3000/posts');
  }

}