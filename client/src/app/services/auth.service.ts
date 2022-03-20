import { Injectable } from '@angular/core';
 
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError} from 'rxjs/operators';
 
 
@Injectable()
export class AuthService {
 
  baseURL: string = "http://localhost:5000/";
 
  constructor(private http: HttpClient) {
  }
 
  authUser(userName: string,password:string): Observable<any> {
    return this.http.post(this.baseURL + 'api/auth/', {name: userName, password: password});
  }
 
}