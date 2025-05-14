import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { first } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

import { AccountService } from '../_services/account.service';
import { AlertService } from '../_services/alert.service';

@Component({
    templateUrl: 'login.component.html',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule
    ]
})
export class LoginComponent implements OnInit {
    form!: UntypedFormGroup;
    loading = false;
    submitted = false;
    successMessage: string = '';
    errorMessage: string = '';

    constructor(
        private formBuilder: UntypedFormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private accountService: AccountService,
        private alertService: AlertService
    ) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            email: ['', [Validators.required, Validators.email]],
            password: ['', Validators.required]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;
        this.successMessage = '';
        this.errorMessage = '';
        
        // reset alerts on submit
        this.alertService.clear();
        
        // stop here if form is invalid
        if (this.form.invalid) {
            console.log('Form is invalid:', this.form.errors);
            this.errorMessage = 'Please fill in all required fields correctly.';
            return;
        }
        
        this.loading = true;
        console.log('Attempting login with email:', this.f.email.value);
        
        this.accountService.login(this.f.email.value, this.f.password.value)
            .pipe(first())
            .subscribe({
                next: (response) => {
                    console.log('Login successful. Response:', response);
                    this.successMessage = 'Login successful!';
                    window.location.href = 'http://localhost:4200/home';
                },
                error: error => {
                    console.error('Login error details:', {
                        error: error,
                        errorMessage: error.message,
                        errorResponse: error.error
                    });
                    this.loading = false;
                    if (error.error && error.error.message) {
                        this.errorMessage = error.error.message;
                    } else if (error.message) {
                        this.errorMessage = error.message;
                    } else {
                        this.errorMessage = 'Login failed. Please check your credentials.';
                    }
                    this.alertService.error(this.errorMessage);
                }
            });
    }
}
