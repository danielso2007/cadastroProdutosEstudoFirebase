import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyFilesComponent } from './components/my-files/my-files.component';

const routes: Routes = [{path: '', component: MyFilesComponent}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyFilesRoutingModule { }
