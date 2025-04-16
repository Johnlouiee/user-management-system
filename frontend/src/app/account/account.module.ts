import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AccountRoutingModule } from './account-routing.module';
import { SharedModule } from '../shared.module';
import { LayoutComponent } from './layout.component';
import { LoginComponent } from './login.component';
import { RegisterComponent } from './register.component';
import { VerifyEmailComponent } from './verify-email.component';
import { ForgotPasswordComponent } from './forgot-password.component';
import { ResetPasswordComponent } from './reset-password.component';

@NgModule({
  declarations: [], // Empty since all components are standalone
  imports: [
    CommonModule, // For ngClass, ngIf, etc.
    ReactiveFormsModule, // For formGroup, formControlName
    AccountRoutingModule, // For routing
    SharedModule, // For shared functionality
    // Import standalone components
    LayoutComponent,
    LoginComponent,
    RegisterComponent,
    VerifyEmailComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent
  ]
})
export class AccountModule {}