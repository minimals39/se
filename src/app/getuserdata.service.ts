import { Injectable } from '@angular/core';
import { Subject,Observable }    from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GetuserdataService {
  getName$: Observable<any>;
  private myMethodSubject = new Subject<any>();

  constructor() {
    this.getName$ = this.myMethodSubject.asObservable();
   }
   myMethod(data) {
    console.log(data); // I have data! Let's return it so subscribers can use it!
    // we can do stuff with data if we want
    this.myMethodSubject.next(data);
}

}
