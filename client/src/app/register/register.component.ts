import { Component, OnInit,ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../reducers/services/auth.service';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
import {Subject} from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import {NgbAlert} from '@ng-bootstrap/ng-bootstrap';


@Component({selector: 'ngbd-alert-selfclosing', templateUrl: './alert.html'})
export class NgbdAlertSelfclosing implements OnInit {
  private _success = new Subject<string>();

  staticAlertClosed = false;
  successMessage = '';

  @ViewChild('staticAlert', {static: false}) staticAlert!: NgbAlert;
  @ViewChild('selfClosingAlert', {static: false}) selfClosingAlert!: NgbAlert;

  ngOnInit(): void {
    setTimeout(() => this.staticAlert.close(), 20000);

    this._success.subscribe(message => this.successMessage = message);
    this._success.pipe(debounceTime(5000)).subscribe(() => {
      if (this.selfClosingAlert) {
        this.selfClosingAlert.close();
      }
    });
  }

  public changeSuccessMessage(msg:any) { this._success.next(`${msg}`); }
}

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email = '';
  password = '';
  message: string = '';
  subscription!: Subscription;
  user: any;
  @ViewChild(NgbdAlertSelfclosing) child:any;
  constructor(
    private auth: AuthService,
    private router: Router,
    private data: DataService,
  ) { }

  ngOnInit(): void {
    this.subscription = this.data.currentMessage.subscribe(
      (message) => (this.message = message)
    );

    this.subscription = this.data.currentUser.subscribe(
      (user) => (this.user = user)
    );
  }
  getRegisterFormData(data: any) {
    console.log(data)
    if(data.password.length<5){
      this.child.changeSuccessMessage('Password must contain at least 5 characters');
    }
    if(data.password!=data.password2){
      this.child.changeSuccessMessage('Please put same password in both fields');
    }
    else{
         this.auth.registerUser(data).subscribe((res) => {
          if (res.token) {
            localStorage.setItem('token', res.token);
            this.auth.getAuthUserData(res.token).subscribe((user) => {
            if (user[0].id) {
            this.data.setLoggedUser(user[0]);
            this.router.navigate(['/feed']);
          }
        });
          }
        });
    }
    

  }

}
