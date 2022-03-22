import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { FeedService } from '../reducers/services/feed.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class FeedComponent implements OnInit {
  message: string = '';
  subscription!: Subscription;
  user: any;
  postList: any;
  testArr = [1, 2, 3, 4, 5];
  baseURL: string = 'http://localhost:5000/';
  token: any;
  constructor(
    private data: DataService,
    private router: Router,
    private http: HttpClient,
    private feed: FeedService
  ) {}

  ngOnInit() {
    this.subscription = this.data.currentMessage.subscribe(
      (message) => (this.message = message)
    );
    this.subscription = this.data.currentUser.subscribe(
      (user) => (this.user = user)
    );
    if (!this.user) {
      this.router.navigate(['/']);
    }
    this.token = localStorage.getItem('token');
    this.feed.getPosts(this.token).subscribe((posts) => {
      this.postList = posts.Posts;
    });
    console.log(this.postList);
    console.log('User', this.user);
  }
  deletePost(data: any) {
    console.log('Post data', data.id);
    console.log('Token', this.token);
    this.feed.deletePost(this.token, data.id).subscribe((res) => {
      console.log(res);
      if (res.msg == 'Post deleted') {
        let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
      }
    });
  }
}
