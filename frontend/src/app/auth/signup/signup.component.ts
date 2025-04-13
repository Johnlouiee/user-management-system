import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // ✅ Add this
  templateUrl: './signup.component.html'
})
export class SignupComponent {
  signupForm: FormGroup;
  success: string = '';

  constructor(private fb: FormBuilder) {
    this.signupForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.signupForm.valid) {
      this.success = `Signed up successfully: ${JSON.stringify(this.signupForm.value)}`;
    } else {
      this.success = '';
    }
  }
}
