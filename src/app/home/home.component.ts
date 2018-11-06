import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  auth2: any;
  name: any;
  users: object;
  constructor(private data: DataService) { }

  ngOnInit() {
    this.getUsers();
  }

 
  onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    var email = profile.getEmail();
    if( email.indexOf('kmitl.ac.th') <= 0){
          document.getElementById("status").innerHTML = 'log in with kmitl email you idiot';
    this.signOut()    }
    console.log('Signed in as: ' + profile.getName());

  }
  getUsers(){
    this.data.getUsers().subscribe(data => {
      this.users = data
      console.log(this.users);
    }
  );
  }
  getName(){
    var auth2 = gapi.auth2.getAuthInstance();
    var profile = auth2.currentUser.get().getBasicProfile();
    this.getUsers();

    return profile.getGivenName()
  }
  checkInfo(googleUser) {
    var auth2 = gapi.auth2.getAuthInstance();
    if (auth2.isSignedIn.get()) {
      var profile = auth2.currentUser.get().getBasicProfile();
      this.name = profile.getName();
      document.getElementById("status").innerHTML = 'ID: ' + profile.getId()+
      '<br>Full Name: ' + profile.getName()+'<br>Given Name: ' + profile.getGivenName()+
      '<br>Family Name: ' + profile.getFamilyName()+    '<br>Image URL: ' + profile.getImageUrl()+'<br>Email: ' + profile.getEmail();
      console.log('Signed in as: ' );

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
