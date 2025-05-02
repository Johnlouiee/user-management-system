import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';
import { Account } from '../_models/account';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    constructor(private apiService: ApiService) { }

    // Get all users
    getAll(): Observable<Account[]> {
        return this.apiService.get<Account[]>('accounts');
    }

    // Get user by id
    getById(id: string): Observable<Account> {
        return this.apiService.get<Account>(`accounts/${id}`);
    }

    // Create new user
    create(user: Account): Observable<Account> {
        return this.apiService.post<Account>('accounts', user);
    }

    // Update user
    update(id: string, user: Account): Observable<Account> {
        return this.apiService.put<Account>(`accounts/${id}`, user);
    }

    // Delete user
    delete(id: string): Observable<any> {
        return this.apiService.delete(`accounts/${id}`);
    }
} 