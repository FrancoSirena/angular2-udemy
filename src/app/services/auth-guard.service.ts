import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.isLoggedIn()) {
       return true;
    }
    this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});

    return false;
  }

  constructor(private authService: AuthService, private router: Router) { }

}
