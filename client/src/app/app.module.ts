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
import { FormsModule } from '@angular/forms';
import { FeedComponent } from './feed/feed.component';
import { AuthGuardService } from './reducers/services/AuthGuard.service';
@NgModule({
  declarations: [AppComponent, LoginComponent, FeedComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    StoreModule.forRoot({ count: counterReducer, user: authReducer }),
    StoreDevtoolsModule.instrument({
      name: 'NgRx Demo App',
      logOnly: environment.production,
    }),
  ],
  providers: [AuthService, AuthGuardService],
  bootstrap: [AppComponent],
})
export class AppModule {}
