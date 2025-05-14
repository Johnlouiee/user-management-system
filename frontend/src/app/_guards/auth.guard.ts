import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { Role } from '../_models/role';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private accountService: AccountService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const account = this.accountService.accountValue;
    if (account) {
      // check if route is restricted by role
      if (route.data.roles && !route.data.roles.includes(account.role)) {
        // role not authorised so redirect to appropriate home page
        if (account.role === Role.Admin) {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/home']);
        }
        return false;
      }

      // authorised so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/account/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
} 