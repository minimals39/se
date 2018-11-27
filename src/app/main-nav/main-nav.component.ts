import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserserviceService } from '../userservice.service';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss'],
})
export class MainNavComponent {
    isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches)
    );

  constructor(private breakpointObserver: BreakpointObserver, private auth: UserserviceService) {}
      ngOnInit(): void {
        var auth2 = gapi.auth2.getAuthInstance();
        //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
        //Add 'implements OnInit' to the class.
        if(!auth2){
          this.auth.logout();

        }
      
      }
  signOut() {  
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      document.getElementById("status").innerHTML = 'User signed out.';
    });
    this.auth.logout();
    location.reload();
  }
  isLoggedIn(){
    return JSON.parse(localStorage.getItem('loggedIn'))
  }



}
