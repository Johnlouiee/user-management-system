import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AccountService } from '../_services/account.service';

@Component({ 
    templateUrl: 'home.component.html',
    standalone: true,
    imports: [
        CommonModule
    ]
})
export class HomeComponent {
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
