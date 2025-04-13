import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { provideHttpClient } from '@angular/common/http';
import { AppRoutingModule } from './app.routes';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { VerifyComponent } from './auth/verify/verify.component';
import { ReactiveFormsModule } from '@angular/forms';

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    AppRoutingModule,
    SignupComponent,
    LoginComponent,
    VerifyComponent,
    ReactiveFormsModule
  ]
});
