import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { MouseEvent as AGMMouseEvent } from '@agm/core';
interface marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss']
})
export class AboutusComponent implements OnInit {
  
  lat: string = '';
  lng: string = '';
  title: string = '';
  ename: string ='';
  info: string ='';
  condition: string = '';

  location: Object;
  constructor(private map: DataService) { }

  ngOnInit() {
    this.map.getLocation().subscribe(data => {
      console.log(data);
      this.lat = data.lat;
      this.lng = data.lon;
      this.title = data.city;
      this.ename = data.as;
      this.info = data.isp;
      this.condition = data.country;
    })
  }
  
  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
  }

}
