import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  auth2: any;
  name: any;


  constructor(private data: DataService) { }

  ngOnInit() {
    const _self = this;
    window['onSignIn'] = function (user) {
      _self.onSignIn(user);
    };

  }

 
  onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    var email = profile.getEmail();
    if( email.indexOf('kmitl.ac.th') <= 0){
    console.log('log in with kmitl email you idiot')
    this.signOut()    }
  }

  checkInfo(googleUser) {
    var auth2 = gapi.auth2.getAuthInstance();
    if (auth2.isSignedIn.get()) {
      var profile = auth2.currentUser.get().getBasicProfile();
      this.name = profile.getName();
      console.log('ID: ' + profile.getId());
      console.log('Full Name: ' + profile.getName());
      console.log('Given Name: ' + profile.getGivenName());
      console.log('Family Name: ' + profile.getFamilyName());
      console.log('Image URL: ' + profile.getImageUrl());
      console.log('Email: ' + profile.getEmail());
    }
      }
  checkName(googleUser) {
    var auth2 = gapi.auth2.getAuthInstance();
    if (auth2.isSignedIn.get()) {
      var profile = auth2.currentUser.get().getBasicProfile();
      this.name = profile.getName();
      console.log('Name: ' + this.name);
    }
    else{
      console.log('not logged in');
    }
      }
  signOut() {  
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }
}
