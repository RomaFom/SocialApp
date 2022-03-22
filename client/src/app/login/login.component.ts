import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthService } from '../reducers/services/auth.service';
import { Router } from '@angular/router';
import { DataService } from '../services/data.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  message: string = '';
  subscription!: Subscription;
  user: any;

  constructor(
    private auth: AuthService,
    private router: Router,
    private data: DataService
  ) {}

  ngOnInit(): void {
    this.subscription = this.data.currentMessage.subscribe(
      (message) => (this.message = message)
    );

    this.subscription = this.data.currentUser.subscribe(
      (user) => (this.user = user)
    );
    console.log('On init user', this.user);
  }

  getLoginFormData(data: any) {
    this.auth.authUser(data.email, data.password).subscribe((result) => {
      if (result.token) {
        localStorage.setItem('token', result.token);
        this.auth.getAuthUserData(result.token).subscribe((user) => {
          if (user[0].id) {
            this.data.setLoggedUser(user[0]);
            this.router.navigate(['/feed']);
          }
        });
      }
    });
  }
}
