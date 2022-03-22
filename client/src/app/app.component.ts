import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from './services/data.service';
import { AuthService } from './reducers/services/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'client';
  user: any;
  token: any = null;
  constructor(
    private router: Router,
    private data: DataService,
    private auth: AuthService
  ) {}
  ngOnInit(): void {
    this.token = localStorage.getItem('token');
    if (this.token) {
      this.auth.getAuthUserData(this.token).subscribe((user) => {
        if (user[0].id) {
          this.data.setLoggedUser(user[0]);
          this.router.navigate(['/feed']);
        }
      });
    }
  }
}
