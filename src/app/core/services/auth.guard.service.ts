import { Injectable } from '@angular/core';
import { CanActivateChild, CanActivate, CanLoad, Router, ActivatedRouteSnapshot, RouterStateSnapshot, Route } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AuthGuardService implements CanActivate, CanActivateChild, CanLoad {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.checkAuthState(state.url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.canActivate(route, state);
  }

  canLoad(route: Route): Observable<boolean> {
    return this.checkAuthState(window.location.pathname).pipe(take(1));
  }

  private checkAuthState(url: string): Observable<boolean> {
    return this.authService.authenticated()
    .pipe(
      tap(is => {
        if (!is) {
          this.authService.redirectUrl = url;
          this.router.navigate(['/login']);
        }
      })
    );
  }
}
