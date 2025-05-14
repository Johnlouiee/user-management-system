import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AccountService } from '../_services/account.service';

@Component({
    selector: 'app-layout',
    templateUrl: './layout.component.html',
    standalone: true,
    imports: [CommonModule, RouterModule]
})
export class LayoutComponent {
    constructor(public accountService: AccountService) { }

    logout() {
        this.accountService.logout();
    }
} 