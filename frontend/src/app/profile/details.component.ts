import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AccountService } from '../_services/account.service';

@Component({ templateUrl: 'details.component.html' })
export class DetailsComponent {
    account = this.accountService.accountValue;
    
    constructor(
        private accountService: AccountService,
        private router: Router
    ) { 
        if (!this.account) {
            this.router.navigate(['/account/login']);
        }
    }
}
