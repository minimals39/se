import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss']
})
export class AboutusComponent implements OnInit {
  
  lat: string = '';
  lng: string = '';
  title: string = '';

  location: Object;
  constructor(private map: DataService) { }

  ngOnInit() {
    this.map.getLocation().subscribe(data => {
      console.log(data);
      this.lat = data.lat;
      this.lng = data.lon;
      this.title = data.city;
    })
  }

}
