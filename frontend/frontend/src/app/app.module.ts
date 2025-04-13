import { AppRoutingModule } from './app.routes';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { VerifyComponent } from './auth/verify/verify.component';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';


@NgModule({
    imports: [
      BrowserModule,
      ReactiveFormsModule,
      AppRoutingModule,
      SignupComponent, 
      LoginComponent,
      ReactiveFormsModule,
      VerifyComponent
    ]
  })
  export class AppModule {}
  
