import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UploadFilesComponent } from './components/upload-files/upload-files.component';
import { AuthGuardService } from 'src/app/core/services/auth.guard.service';

const routes: Routes = [{path: '', component: UploadFilesComponent, canActivate: [ AuthGuardService ]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UploadFilesRoutingModule { }
