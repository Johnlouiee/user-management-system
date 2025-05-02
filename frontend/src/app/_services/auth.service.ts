import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiService } from './api.service';
import { Account } from '../_models/account';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private accountSubject: BehaviorSubject<Account | null>;
    public account: Observable<Account | null>;

    constructor(
        private router: Router,
        private apiService: ApiService
    ) {
        this.accountSubject = new BehaviorSubject<Account | null>(null);
        this.account = this.accountSubject.asObservable();
    }

    public get accountValue(): Account | null {
        return this.accountSubject.value;
    }

    // Login with email and password
    login(email: string, password: string): Observable<Account> {
        return this.apiService.post<Account>('accounts/authenticate', { email, password })
            .pipe(map(account => {
                this.accountSubject.next(account);
                this.startRefreshTokenTimer();
                return account;
            }));
    }

    // Register new account
    register(account: Account): Observable<any> {
        return this.apiService.post('accounts/register', account);
    }

    // Verify email
    verifyEmail(token: string): Observable<any> {
        return this.apiService.post('accounts/verify-email', { token });
    }

    // Resend verification email
    resendVerificationEmail(email: string): Observable<any> {
        return this.apiService.post('accounts/resend-verification-email', { email });
    }

    // Forgot password
    forgotPassword(email: string): Observable<any> {
        return this.apiService.post('accounts/forgot-password', { email });
    }

    // Validate reset token
    validateResetToken(token: string): Observable<any> {
        return this.apiService.post('accounts/validate-reset-token', { token });
    }

    // Reset password
    resetPassword(token: string, password: string, confirmPassword: string): Observable<any> {
        return this.apiService.post('accounts/reset-password', { token, password, confirmPassword });
    }

    // Logout
    logout(): void {
        this.apiService.post('accounts/revoke-token', {}).subscribe();
        this.stopRefreshTokenTimer();
        this.accountSubject.next(null);
        this.router.navigate(['/account/login']);
    }

    // Refresh token
    refreshToken(): Observable<Account> {
        return this.apiService.post<Account>('accounts/refresh-token', {})
            .pipe(map(account => {
                this.accountSubject.next(account);
                this.startRefreshTokenTimer();
                return account;
            }));
    }

    private refreshTokenTimeout: any;

    private startRefreshTokenTimer(): void {
        // parse json object from base64 encoded jwt token
        const jwtToken = JSON.parse(atob(this.accountValue!.jwtToken!.split('.')[1]));

        // set a timeout to refresh the token a minute before it expires
        const expires = new Date(jwtToken.exp * 1000);
        const timeout = expires.getTime() - Date.now() - (60 * 1000);
        this.refreshTokenTimeout = setTimeout(() => this.refreshToken().subscribe(), timeout);
    }

    private stopRefreshTokenTimer(): void {
        clearTimeout(this.refreshTokenTimeout);
    }
} 