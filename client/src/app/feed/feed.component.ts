import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getUser } from '../reducers/auth.selectors';
import { State } from '../reducers/auth.reducer';
@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css'],
})
export class FeedComponent implements OnInit {
  // user$: Observable<any>;
  constructor(private store: Store<State>) {}

  ngOnInit(): void {
    console.log(this.store.pipe(select(getUser)));
  }
}
