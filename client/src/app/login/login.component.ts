import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { increment } from '../actions/counter.actions';
import { login, setToken } from '../actions/auth.actions';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../reducers/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  count$: Observable<number>;
  constructor(
    private store: Store<{ count: number }>,
    private auth: AuthService,
    private router: Router
  ) {
    this.count$ = store.select('count');
  }

  ngOnInit(): void {}
  onChangeEmail(event: any) {
    this.email = event.target.value;
  }
  onChangePassword(event: any) {
    this.password = event.target.value;
  }
  getLoginFormData(data: any) {
    this.auth.authUser(data.email, data.password).subscribe((result) => {
      if (result.token) {
        localStorage.setItem('token', result.token);
        this.store.dispatch(setToken({ payload: result.token }));
        this.auth.getAuthUserData(result.token).subscribe((user) => {
          if (user[0].id) {
            this.router.navigate(['/feed']);
            this.store.dispatch(login({ payload: user[0] }));
          }
        });
      }
    });
    //this.store.dispatch(login({payload: {email: this.email, password: this.password}}));
  }

  increment() {
    this.store.dispatch(increment());
  }
}
