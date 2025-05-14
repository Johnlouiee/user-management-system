import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterModule } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { first } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

import { AccountService } from '../../_services/account.service';
import { AlertService } from '../../_services/alert.service';
import { MustMatch } from '../../_helpers/must-match.validator';

@Component({ 
    templateUrl: 'register.component.html',
    standalone: true,
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule
    ]
})
export class RegisterComponent implements OnInit {
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
            title: ['', Validators.required],
            firstName: ['', Validators.required],
            lastName: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ['', Validators.required],
            acceptTerms: [false, Validators.requiredTrue]
        }, {
            validator: MustMatch('password', 'confirmPassword')
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    onSubmit() {
        this.submitted = true;
        this.successMessage = '';
        this.errorMessage = '';
        console.log('Form submitted:', this.form.value);

        // reset alerts on submit
        this.alertService.clear();

        // stop here if form is invalid
        if (this.form.invalid) {
            console.log('Form is invalid:', this.form.errors);
            this.errorMessage = 'Please fill in all required fields correctly.';
            return;
        }

        this.loading = true;
        console.log('Sending registration request...');
        
        this.accountService.register(this.form.value)
            .pipe(first())
            .subscribe({
                next: (response) => {
                    console.log('Registration successful:', response);
                    this.successMessage = 'Registration successful! Your account has been created and saved to the database.';
                    this.alertService.success('Registration successful! You can now login.', { keepAfterRouteChange: true });
                    
                    // Clear form
                    this.form.reset();
                    this.submitted = false;
                    
                    // Redirect to login after 3 seconds
                    setTimeout(() => {
                        this.router.navigate(['/account/login'], { relativeTo: this.route });
                    }, 3000);
                },
                error: error => {
                    console.error('Registration error:', error);
                    this.loading = false;
                    if (error.error && error.error.message) {
                        this.errorMessage = error.error.message;
                    } else if (error.message) {
                        this.errorMessage = error.message;
                    } else {
                        this.errorMessage = 'Registration failed. Please try again.';
                    }
                    this.alertService.error(this.errorMessage);
                }
            });
    }
} 