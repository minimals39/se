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
      EventName: ['', Validators.required],
      Information: ['', Validators.required],
      participant: ['',Validators.required],
      date: ['',Validators.required],
    });

  }
    // google maps zoom level
    zoom: number = 17;
    result: any;
    // initial center position for the map
    lat: number = 13.7283785;
    lng: number = 100.77517;
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
      this.showlat = $event.coords.lat
      this.showlng = $event.coords.lng
      this.result = this.data.getLocationx()
      console.log(this.result[0])
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
      console.log(this.messageForm.controls.EventName.value);
      console.log(this.messageForm.controls.Information.value);
      console.log(this.messageForm.controls.participant.value);
      console.log(this.showlat);
      console.log(this.showlng);
      this.data.postevent({
        EventName: this.messageForm.controls.EventName.value,
        Information: this.messageForm.controls.Information.value,
        participant: this.messageForm.controls.participant.value,
        Lat: this.showlat,
        Lng: this.showlng,
        date: this.messageForm.controls.date.value
      })
  }
  
  
  
}
