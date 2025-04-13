import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // ✅ Add this
  templateUrl: './login.component.html' // ✅ Make sure this matches your file
})
export class LoginComponent {
  loginForm: FormGroup;
  message: string = '';

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.message = `Login Successful: ${JSON.stringify(this.loginForm.value)}`;
    } else {
      this.message = 'Form is invalid!';
    }
  }
}
