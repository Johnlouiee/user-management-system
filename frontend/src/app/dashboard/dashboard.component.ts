import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AccountService } from '../_services/account.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    standalone: true,
    imports: [CommonModule, RouterModule]
})
export class DashboardComponent implements OnInit {
    user: any;

    constructor(private accountService: AccountService) {
        this.user = this.accountService.accountValue;
    }

    ngOnInit() {
        console.log('Dashboard initialized for user:', this.user);
    }
} 