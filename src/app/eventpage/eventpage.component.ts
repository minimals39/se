import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { MouseEvent as AGMMouseEvent, MarkerManager } from '@agm/core';

interface marker {
  lat: number;
  lng: number;
  label?: string;
  information?: string;
  participant?: number;
  date?: Date;
  category?: string;
  draggable: boolean;

}

@Component({
  selector: 'app-eventpage',
  templateUrl: './eventpage.component.html',
  styleUrls: ['./eventpage.component.scss']
})
export class EventpageComponent implements OnInit {
  zoom: number = 17;
  // initial center position for the map
  lat: number = 13.7283785;
  lng: number = 100.77517;
  title: string = '';
  parti: number;
  info: string ='';
  condition: string = '';
  location: Object;
  date: Date;
  category: string = '';
  constructor(private map: DataService) {
   }

  ngOnInit() {
    this.map.getLocation().subscribe(data => {
      for(var _i = 1; _i <= Object.keys(data).length; _i++){
      this.map.getoneLocation(_i).subscribe(
        data =>{
      if(data.name){
      this.markers.push({
        lat: data.lat,
        lng: data.lng,
        label: data.name,
        information: data.Information,
        participant: data.participant,
        date: data.date,
        draggable: false,
        category: data.category
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
    this.info = this.markers[index].information
    this.parti = this.markers[index].participant
    this.date = this.markers[index].date
    this.category = this.markers[index].category
  }
  markers: marker[] = [

  ]
  cancel(){
    return

  }


}
