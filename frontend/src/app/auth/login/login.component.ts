import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // Import Router

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
  constructor(private fb: FormBuilder, private router: Router) { 
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

  // Method to navigate to the Sign Up page
  navigateToSignUp() {
    this.router.navigate(['/sign-up']); // Now it uses the injected router
  }
}
