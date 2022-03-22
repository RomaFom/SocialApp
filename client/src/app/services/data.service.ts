import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();

  private userSource = new BehaviorSubject(null);
  currentUser = this.userSource.asObservable();
  constructor() {}

  changeMessage(message: string) {
    this.messageSource.next(message);
  }

  setLoggedUser(user: any) {
    this.userSource.next(user);
  }
}
