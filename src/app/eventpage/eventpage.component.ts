import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { MouseEvent as AGMMouseEvent, MarkerManager } from '@agm/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { FormsModule } from '@angular/forms'

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
  messageForm: FormGroup;
  submitted = false;
  success = false;
  setedit = false;

  zoom: number = 17;
  // initial center position for the map
  lat: number = 13.7283785;
  lng: number = 100.77517;
  title: string = '';
  parti: number;
  info: string = '';
  condition: string = '';
  location: Object;
  date: Date;
  category: string = '';
  constructor(private map: DataService, private formBuilder: FormBuilder,private data: DataService) {
  }

  ngOnInit() {
    this.map.getLocation().subscribe(data => {
      for (var _i = 1; _i <= Object.keys(data).length; _i++) {
        this.map.getoneLocation(_i).subscribe(
          data => {
            if (data.name) {
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
        )
      }
    }
    )
    this.messageForm = this.formBuilder.group({
      EventName: ['', Validators.required],
      Information: ['', Validators.required],
      participant: ['', Validators.required],
      date: ['', Validators.required],
      category: ['', Validators.required]
    });
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
  onSubmit() {
    this.submitted = true;

    if (this.messageForm.invalid) {
        return;
    }

    this.success = true;
    console.log(this.messageForm.controls.EventName.value);
    console.log(this.messageForm.controls.Information.value);
    console.log(this.messageForm.controls.participant.value);
    //edit edit down here 
    this.data.postevent({
      EventName: this.messageForm.controls.EventName.value,
      Information: this.messageForm.controls.Information.value,
      participant: this.messageForm.controls.participant.value,
      date: this.messageForm.controls.date.value,
      category: this.messageForm.controls.category.value
    })
}

  edit() {
     this.setedit = true;
  }
  cancel() {
    // do something

  }


}
