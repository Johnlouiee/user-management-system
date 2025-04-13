import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html'
})
export class VerifyComponent {
  message = '';

  constructor(private route: ActivatedRoute, private authService: AuthService) {
    const token = this.route.snapshot.queryParamMap.get('token');
    if (token) {
      this.authService.verifyEmail(token).subscribe(() => {
        this.message = 'Email successfully verified!';
      });
    }
  }
}
