import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { MouseEvent as AGMMouseEvent, MarkerManager } from '@agm/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
declare const google: any;

interface marker {
  lat: number;
  lng: number;
  label?: string;
  information?: string;
  participant?: number;
  date?: Date;
  category?: string;
  draggable: boolean;
  visible?: boolean;

}

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.scss']
})
export class AboutusComponent implements OnInit {
  zoom: number = 17;
  // initial center position for the map
  loc: string = "";
  messageForm: FormGroup;
  submitted = false;
  success = false;
  options: string[] = ['เทคโนโลยี', 'ครอบครัว', 'สุขภาพ', 'กีฬา', 'การเรียนรู้', 'การเรียนรู้', 'ถ่ายภาพ', 'อาหาร', 'ภาษาและวัฒนธรรม', 'ดนตรี'];
  filteredOptions: Observable<string[]>;
  lat: number = 13.7283785;
  lng: number = 100.77517;
  title: string = '';
  parti: number;
  info: string = '';
  condition: string = '';
  location: Object;
  date: Date;
  category: string = '';
  constructor(private map: DataService, private formBuilder: FormBuilder, private data: DataService) {
  }

  ngOnInit() {

    /*this.map.getLocation().subscribe(data => {
      for (var _i = 1; _i <= Object.keys(data).length; _i++) {
        this.map.getoneLocation(_i).subscribe(
          data => {
            if (data.EventName) {
              this.markers.push({
                lat: data.Lat,
                lng: data.Lng,
                title: data.EventName,
                information: data.Information,
                participant: data.participant,
                date: data.date,
                draggable: false,
                category: data.category,
                visible: true,
              })
            }
          }
        )
      }
    }
    )*/
    console.log(this.markers.values.toString()
    );
    
    this.map.getLocation().subscribe(data => {
      for (var _i = 0; _i < Object.keys(data).length; _i++) {
        this.map.getoneLocation(data[_i]._id).subscribe(
          data => {
            if (data.EventName) {
              this.markers.push({
                lat: data.Lat,
                lng: data.Lng,
                label: data.EventName,
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
      category: ''
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
  filter() {
    console.log(this.messageForm.controls.category.value);
    var checker = this.messageForm.controls.category.value;
    if (checker != "") {
      for (var _i = 0; _i <= Object.keys(this.markers).length; _i++) {
        this.markers[_i].visible = false;
        if(this.markers[_i].category && this.markers[_i].category.includes(checker)){
        console.log(this.markers[_i].category);
        this.markers[_i].visible = true;
        }

      }
    }else{
      for (var _i = 0; _i <= Object.keys(this.markers).length; _i++) {
        this.markers[_i].visible = true;
 
      }


    }

  }
  participate() {
    // do something

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
    this.getGeoLocation(this.markers[index].lat, this.markers[index].lng)
  }
  markers: marker[] = [

  ]
  getGeoLocation(lat: number, lng: number) {
    if (navigator.geolocation) {
        let geocoder = new google.maps.Geocoder();
        let latlng = new google.maps.LatLng(lat, lng);
        let request = { latLng: latlng };
        geocoder.geocode(request, (results, status) => {
          if (status == google.maps.GeocoderStatus.OK) {
            let result = results[0];
            if (result != null) {
              this.loc = result.formatted_address;
            } else {
              alert("No address available!");
            }
          }
        });
    }
    }
}
