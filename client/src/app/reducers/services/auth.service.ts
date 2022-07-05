import { Injectable } from '@angular/core';

import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseURL: string = 'http://localhost:5000/';

  constructor(private http: HttpClient) {}

  authUser(email: string, password: string): Observable<any> {
    return this.http.post(this.baseURL + 'api/auth/', {
      email: email,
      password: password,
    });
  }
  getAuthUserData(token: string): Observable<any> {
    return this.http.get(this.baseURL + 'api/auth/', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-auth-token': token,
      }),
    });
  }
  registerUser(data:any): Observable<any> {
    return this.http.post(this.baseURL + 'api/users/',
    {name:data.name,
    email:data.email,
    password:data.password}
    )
  }
}
