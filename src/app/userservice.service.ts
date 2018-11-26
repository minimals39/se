import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
interface user {
name: string;
email: string;
type: number;


}
@Injectable({
  providedIn: 'root'
})
export class UserserviceService {
  userMethod: Observable<user>
  private userMethodsubject = new Subject<user>();
  constructor() { }
}
