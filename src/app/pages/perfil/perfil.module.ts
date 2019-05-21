import { NgModule } from '@angular/core';

import { PerfilRoutingModule } from './perfil-routing.module';
import { PerfilComponent } from './components/perfil/perfil.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [PerfilComponent],
  imports: [
    SharedModule,
    PerfilRoutingModule
  ]
})
export class PerfilModule { }
