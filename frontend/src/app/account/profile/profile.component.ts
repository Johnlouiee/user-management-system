import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { AuthService } from '@app/_services';
import { Account } from '@app/_models';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    form!: FormGroup;
    account!: Account;
    loading = false;
    submitted = false;
    error = '';

    constructor(
        private formBuilder: FormBuilder,
        private authService: AuthService
    ) { }

    ngOnInit() {
        this.account = this.authService.accountValue!;
        
        this.form = this.formBuilder.group({
            title: [this.account.title, Validators.required],
            firstName: [this.account.firstName, Validators.required],
            lastName: [this.account.lastName, Validators.required],
            email: [this.account.email, [Validators.required, Validators.email]],
            password: ['', [Validators.minLength(6)]],
            confirmPassword: ['']
        }, {
            validator: this.mustMatch('password', 'confirmPassword')
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.form.controls; }

    mustMatch(controlName: string, matchingControlName: string) {
        return (formGroup: FormGroup) => {
            const control = formGroup.controls[controlName];
            const matchingControl = formGroup.controls[matchingControlName];

            if (matchingControl.errors && !matchingControl.errors.mustMatch) {
                return;
            }

            if (control.value !== matchingControl.value) {
                matchingControl.setErrors({ mustMatch: true });
            } else {
                matchingControl.setErrors(null);
            }
        }
    }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.form.invalid) {
            return;
        }

        this.loading = true;
        this.authService.update(this.account.id, this.form.value)
            .pipe(first())
            .subscribe({
                next: () => {
                    this.loading = false;
                    // Handle success
                },
                error: error => {
                    this.error = error;
                    this.loading = false;
                }
            });
    }
} 