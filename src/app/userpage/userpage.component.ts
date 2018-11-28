import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { FormsModule } from '@angular/forms'
import { DataService } from '../data.service';

@Component({
  selector: 'app-userpage',
  templateUrl: './userpage.component.html',
  styleUrls: ['./userpage.component.scss']
})
export class UserpageComponent implements OnInit {
  username: string;
  year: number;
  department: string;
  faculty: string;
  group: string;
  messageForm: FormGroup;
  submitted = false;
  success = false;
  setedit = false;
  constructor(private data: DataService,private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.username = this.getName();
    this.messageForm = this.formBuilder.group({
      Name: [{value: "", disabled: true},Validators.required],
      Year: [{value: "",disabled: true},[Validators.required,Validators.max(4)]],
      Department: [{value: "",disabled: true},Validators.required],
      Faculty: [{value: "",disabled: true},Validators.required],
      Group: [{value: "",disabled: true},Validators.required]
    });
  }
  getName(){
    //get name 
    var auth2 = gapi.auth2.getAuthInstance();
    var profile = auth2.currentUser.get().getBasicProfile();
    return profile.getGivenName()
  }
  edit(){
    //enable editing
    this.setedit = true;
    this.messageForm.controls.Name.enable();
    this.messageForm.controls.Year.enable();
    this.messageForm.controls.Department.enable();
    this.messageForm.controls.Faculty.enable();
    this.messageForm.controls.Group.enable();

  }
  disedit() {
      //enable editing
      this.messageForm.controls.Name.disable();
      this.messageForm.controls.Year.disable();
      this.messageForm.controls.Department.disable();
      this.messageForm.controls.Faculty.disable();
      this.messageForm.controls.Group.disable();

  }

  onSubmit() {

    this.submitted = true;

    if (this.messageForm.invalid) {
        return;
    }

    this.success = true;
    //do the edit code here
    console.log(this.messageForm.controls.Name.value);
    console.log(this.messageForm.controls.Year.value);
    console.log(this.messageForm.controls.Faculty.value);
    this.data.postevent({
      Name: this.messageForm.controls.Name.value,
      Year: this.messageForm.controls.Year.value,
      Department: this.messageForm.controls.Department.value,
      Faculty: this.messageForm.controls.Faculty.value,
      Group: this.messageForm.controls.Group.value
    })
}


}
