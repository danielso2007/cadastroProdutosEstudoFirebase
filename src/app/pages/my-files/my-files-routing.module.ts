import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyFilesComponent } from './components/my-files/my-files.component';
import { AuthGuardService } from 'src/app/core/services/auth.guard.service';

const routes: Routes = [{path: '', component: MyFilesComponent, canActivate: [ AuthGuardService ]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyFilesRoutingModule { }
