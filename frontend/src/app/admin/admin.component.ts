import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AccountService } from '../_services/account.service';

@Component({
    selector: 'app-admin',
    standalone: true,
    imports: [CommonModule, RouterModule],
    template: `
        <div class="p-4">
            <div class="container">
                <h1>Admin Dashboard</h1>
                <div class="row mt-4">
                    <div class="col-md-4">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">User Management</h5>
                                <p class="card-text">Manage user accounts, roles, and permissions.</p>
                                <a routerLink="/admin/accounts" class="btn btn-primary">Manage Users</a>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-4">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">System Overview</h5>
                                <p class="card-text">View system statistics and activity logs.</p>
                                <a routerLink="/admin/overview" class="btn btn-primary">View Overview</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `,
    styles: [`
        .card {
            margin-bottom: 20px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .card:hover {
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            transition: box-shadow 0.3s ease;
        }
    `]
})
export class AdminComponent {
    constructor(private accountService: AccountService) {}
} 