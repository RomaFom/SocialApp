import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { increment} from '../actions/counter.actions';
import {login} from '../actions/auth.actions';
import { HttpClient } from '@angular/common/http';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email = ""
  password = ""
  count$: Observable<number>
  constructor(private store: Store<{ count: number }>, private auth: AuthService) {
    this.count$ = store.select('count');
   }

  ngOnInit(): void {  }
  onChangeEmail(event: any){
    this.email = event.target.value
  }
  onChangePassword(event: any){
    this.password = event.target.value
  }
  onClick(){
    this.auth.authUser(this.email, this.password).subscribe(
     {
       next: (data) => {
         console.log(data)
       },
       error: (err) => {
         console.log("error",err)
       }
     }
    )
    //this.store.dispatch(login({payload: {email: this.email, password: this.password}}));
  }
  increment() {
    this.store.dispatch(increment());
  }

}
