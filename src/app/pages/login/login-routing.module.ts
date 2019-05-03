import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AutoLoginGuardService } from 'src/app/core/services/auto.login.guard.service';

const routes: Routes = [
  {path: 'login', component: LoginComponent, canActivate: [ AutoLoginGuardService ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
