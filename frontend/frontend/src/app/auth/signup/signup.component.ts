import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html'
})
export class SignupComponent {
  signupForm: FormGroup;
  success = '';

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.signupForm = this.fb.group({
      email: [''],
      password: ['']
    });
  }

  onSubmit() {
    this.authService.signup(this.signupForm.value).subscribe(() => {
      this.success = 'Sign-up successful! Check your email for a verification link.';
    });
  }
}
