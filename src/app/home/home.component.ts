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
          document.getElementById("status").innerHTML = 'log in with kmitl email you idiot';
    this.signOut()    }
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://yourbackend.example.com/tokensignin');
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.onload = function() {
      console.log('Signed in as: ' + xhr.responseText);
    };
    xhr.send('idtoken=' + email);

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
    else{
      document.getElementById("status").innerHTML = 'not logged in';
    }

      }
  checkName(googleUser) {
    var auth2 = gapi.auth2.getAuthInstance();
    if (auth2.isSignedIn.get()) {
      var profile = auth2.currentUser.get().getBasicProfile();
      this.name = profile.getName();
        document.getElementById("status").innerHTML = 'Name: ' +this.name;
    
          }
    else{
      document.getElementById("status").innerHTML = 'not logged in';
    }
      }
  signOut() {  
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      document.getElementById("status").innerHTML = 'User signed out.';
    });
  }
  
}
