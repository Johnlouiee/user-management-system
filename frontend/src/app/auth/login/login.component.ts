import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Import Router
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] 
})
export class LoginComponent {
  loginForm: FormGroup;
  message: string = '';

  // Inject the Router service into the constructor
  constructor(
    private accountService: AccountService,
    private router: Router
  ) {}

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) return;

    this.loading = true;
    this.accountService.login(this.f.email.value, this.f.password.value)
      .subscribe({
        next: () => {
          this.router.navigate(['/']);
        },
        error: error => {
          this.message = error;
          this.loading = false;
        }
      });
  }
}
