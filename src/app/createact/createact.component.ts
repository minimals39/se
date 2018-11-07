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
  selector: 'app-createact',
  templateUrl: './createact.component.html',
  styleUrls: ['./createact.component.scss']
})

export class CreateactComponent implements OnInit {

  constructor(private data: DataService) { }

  ngOnInit() {
  }
    // google maps zoom level
    zoom: number = 8;

    // initial center position for the map
    lat: number = 51.673858;
    lng: number = 7.815982;
    showlat: number;
    showlng: number;

    clickedMarker(label: string, index: number) {
      console.log(`clicked the marker: ${label || index}`)
    }
  
    mapClicked($event: AGMMouseEvent) {
      this.markers.push({
        lat: $event.coords.lat,
        lng: $event.coords.lng,
        draggable: false
      });
      this.showlat = $event.coords.lat,
      this.showlng = $event.coords.lng
    }
  
    markerDragEnd(m: marker, $event: MouseEvent) {
      console.log('dragEnd', m, $event);
    }
  
    markers: marker[] = [
        {
            lat: 51.673858,
            lng: 7.815982,
            label: 'A',
            draggable: true
        },
        {
            lat: 51.373858,
            lng: 7.215982,
            label: 'B',
            draggable: false
        },
        {
            lat: 51.723858,
            lng: 7.895982,
            label: 'C',
            draggable: true
        }
    ]
  
}
