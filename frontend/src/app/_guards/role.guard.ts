import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AccountService } from '../_services/account.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
    constructor(
        private router: Router,
        private accountService: AccountService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.accountService.accountValue;
        if (user) {
            // check if route is restricted by role
            const { roles } = route.data;
            if (roles && !roles.includes(user.role)) {
                // role not authorised so redirect to home page
                this.router.navigate(['/']);
                return false;
            }

            // authorised so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/account/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
} 