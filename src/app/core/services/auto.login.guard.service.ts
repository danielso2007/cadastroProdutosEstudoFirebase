import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { tap, map, first } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AutoLoginGuardService implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.authService.authenticated()
      .pipe(
        first(),
        tap(is => (is) ? this.router.navigate(['/dashboard']) : null),
        map(is => !is)
      );
  }

}
