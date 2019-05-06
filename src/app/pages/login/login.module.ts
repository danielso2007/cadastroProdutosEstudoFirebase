import { NgModule } from '@angular/core';

import { LoginRoutingModule } from './login-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginComponent } from './components/login/login.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';

@NgModule({
  declarations: [LoginComponent, ForgotPasswordComponent],
  imports: [
    SharedModule,
    LoginRoutingModule
  ]
})
export class LoginModule { }
