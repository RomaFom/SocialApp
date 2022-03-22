import { Injectable } from '@angular/core';

import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class FeedService {
  baseURL: string = 'http://localhost:5000/';
  constructor(private http: HttpClient) {}

  getPosts(token: string): Observable<any> {
    return this.http.get(this.baseURL + 'api/posts/', {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'x-auth-token': token,
      }),
    });
  }
  setPost(token: any, post: any): Observable<any> {
    console.log(post);
    return this.http.post(
      this.baseURL + 'api/posts/',
      { post: post },
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'x-auth-token': token,
        }),
      }
    );
  }
}
