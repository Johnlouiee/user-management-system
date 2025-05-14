import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common'; // For ngClass, ngIf
import { ReactiveFormsModule } from '@angular/forms'; // For formGroup, formControlName
import { RouterModule } from '@angular/router'; // For routerLink
import { first, finalize } from 'rxjs/operators';
import { AccountService, AlertService } from '@app/_services';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  standalone: true, // Ensure standalone is true
  imports: [CommonModule, ReactiveFormsModule, RouterModule] // Import required modules
})
export class ForgotPasswordComponent implements OnInit {
  form: FormGroup;
  loading = false;
  submitted = false;

  constructor(
    private formBuilder: FormBuilder,
    private accountService: AccountService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.form.invalid) return;

    this.loading = true;
    this.accountService.forgotPassword(this.f.email.value)
      .subscribe({
        next: () => {
          this.alertService.success('Please check your email for reset instructions');
          this.loading = false;
        },
        error: error => {
          this.alertService.error(error);
          this.loading = false;
        }
      });
}
}