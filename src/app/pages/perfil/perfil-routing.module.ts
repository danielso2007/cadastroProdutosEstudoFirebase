import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PerfilComponent } from './components/perfil/perfil.component';
import { AuthGuardService } from '../../core/services/auth.guard.service';

const routes: Routes = [{path: '', component: PerfilComponent, canActivate: [ AuthGuardService ]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PerfilRoutingModule { }
