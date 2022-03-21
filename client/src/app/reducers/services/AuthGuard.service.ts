import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | UrlTree {
    //check some condition
    if (!localStorage.getItem('token')) {
      console.log('You are not allowed to view this page');
      this.router.navigate(['/login']);
      //return false to cancel the navigation
      return false;
    }
    return true;
  }
}
