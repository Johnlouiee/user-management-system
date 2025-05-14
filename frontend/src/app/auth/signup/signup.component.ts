import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AccountService } from '../../_services/account.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // ✅ Add this
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'] 
})
export class SignupComponent {
  signupForm: FormGroup;
  success: string = '';

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router
  ) {}

  onSubmit() {
    if (this.signupForm.valid) {
      this.accountService.register(this.signupForm.value)
        .subscribe({
          next: () => {
            this.success = 'Registration successful!';
            this.router.navigate(['/login']);
          },
          error: error => {
            this.success = error;
          }
        });
    }
  }
}
