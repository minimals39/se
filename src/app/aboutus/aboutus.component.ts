import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { MouseEvent as AGMMouseEvent, MarkerManager } from '@agm/core';

interface marker {
  lat: number;
  lng: number;
  label?: string;
  information?: string;
  draggable: boolean;
}

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss']
})
export class AboutusComponent implements OnInit {
  zoom: number = 17;
  // initial center position for the map
  lat: number = 13.7283785;
  lng: number = 100.77517;
  title: string = '';
  ename: string ='';
  info: string ='';
  condition: string = '';
  location: Object;
  constructor(private map: DataService) {
   }

  ngOnInit() {
    this.map.getLocation().subscribe(data => {
      for(var _i = 1; _i <= Object.keys(data).length; _i++){
      this.map.getoneLocation(_i).subscribe(
        data =>{
      if(data.EventName){
      this.markers.push({
        lat: data.Lat,
        lng: data.Lng,
        label: data.EventName,
        information: data.Information,
        draggable: false
      })
      }
}
      )      }}
      ) 
      }


    
  markerDragEnd(m: marker, $event: MouseEvent) {
    console.log('dragEnd', m, $event);
  }
  clickedMarker(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`)
    this.title = label
    this.ename = this.markers[index].information
  }
  markers: marker[] = [

  ]

}
