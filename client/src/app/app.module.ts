import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { counterReducer } from './reducers/counter.reducer';
import { authReducer } from './reducers/auth.reducer';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment.prod';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './reducers/services/auth.service';
import { FeedService } from './reducers/services/feed.service';
import { FormsModule } from '@angular/forms';
import { FeedComponent } from './feed/feed.component';
import { NgbdModalComponent } from './components/modal/modal.component';
import { NgbdModalContent } from './components/modal/modal.component';
import { AuthGuardService } from './reducers/services/AuthGuard.service';
import { userReducer } from './reducers/user.reducer';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    FeedComponent,
    NgbdModalComponent,
    NgbdModalContent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    StoreModule.forRoot({
      count: counterReducer,
      user: authReducer,
      test: userReducer,
    }),
    StoreDevtoolsModule.instrument({
      name: 'NgRx Demo App',
      logOnly: environment.production,
    }),
    NgbModule,
  ],
  providers: [AuthService, AuthGuardService, FeedService],
  bootstrap: [AppComponent],
})
export class AppModule {}
