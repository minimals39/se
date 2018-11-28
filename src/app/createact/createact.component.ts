import { Component, OnInit, NgModule } from '@angular/core';
import { DataService } from '../data.service';
import { MouseEvent as AGMMouseEvent } from '@agm/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { FormsModule } from '@angular/forms'
import { Observable, Subject } from 'rxjs';
import {map, startWith} from 'rxjs/operators';

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
  options: string[] = ['เทคโนโลยี', 'ครอบครัว', 'สุขภาพ','กีฬา','การเรียนรู้','การเรียนรู้','ถ่ายภาพ','อาหาร','ภาษาและวัฒนธรรม','ดนตรี'];
  filteredOptions: Observable<string[]>;


  constructor(private data: DataService,private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.messageForm = this.formBuilder.group({
      EventName: ['', Validators.required],
      Information: ['', Validators.required],
      participant: ['',[Validators.required,Validators.min(1)]],
      date: ['',Validators.required],
      category: ['',Validators.required]
    });
    this.filteredOptions = this.messageForm.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().indexOf(filterValue) === 0);
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
      
      console.log(this.data.getLocationx())
    }
  
    markerDragEnd(m: marker, $event: MouseEvent) {
      console.log('dragEnd', m, $event);
    }
  
    markers: marker[] = [

    ]
    onSubmit() {
      this.submitted = true;
      var auth2 = gapi.auth2.getAuthInstance();
      var profile = auth2.currentUser.get().getBasicProfile();
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
        date: this.messageForm.controls.date.value,
        category: this.messageForm.controls.category.value,
        createrID: profile.getId()
      })
  }
  
  
  
}
