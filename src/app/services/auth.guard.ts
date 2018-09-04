import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanLoad, Route } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';


@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

  constructor(private authService: AuthService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.authService.isAuth()) {
      return true;
    } else {
      console.log('Trying to access page that required login. Redirecting to login page ' + route );
      this.router.navigate(['/login']);
    }
  }

  canLoad(route: Route) { //  actually returns  Observable<boolean>|Promise<boolean>|boolean {
    if (this.authService.isAuth()) {
      console.log('Loading module');
      return true;
    } else {
      console.log('Trying to access page that required login. Redirecting to login page ' + route );
      this.router.navigate(['/login']);
    }
  }

}
