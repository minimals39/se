import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { MouseEvent as AGMMouseEvent } from '@agm/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  messageForm: FormGroup;
  submitted = false;
  success = false;


  constructor(private data: DataService,private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.messageForm = this.formBuilder.group({
      name: ['', Validators.required],
      message: ['', Validators.required]
    });

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
      if(this.markers = []){
      this.markers.push({
        lat: $event.coords.lat,
        lng: $event.coords.lng,
        draggable: true
      });}
      this.showlat = $event.coords.lat,
      this.showlng = $event.coords.lng
    }
  
    markerDragEnd(m: marker, $event: MouseEvent) {
      console.log('dragEnd', m, $event);
    }
  
    markers: marker[] = [

    ]
    onSubmit() {
      this.submitted = true;
  
      if (this.messageForm.invalid) {
          return;
      }
  
      this.success = true;
  }
  
  
  
}
