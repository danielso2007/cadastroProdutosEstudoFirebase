import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardHomeComponent } from './components/dashboard-home/dashboard-home.component';
import { DashboardResourcesComponent } from './components/dashboard-resources/dashboard-resources.component';
import { AuthGuardService } from 'src/app/core/services/auth.guard.service';

const routes: Routes = [
  {
    path: '',
    component: DashboardHomeComponent,
    canActivate: [ AuthGuardService ],
    canActivateChild: [ AuthGuardService ],
    children: [
      {path: 'products', loadChildren: '../products/products.module#ProductsModule', canLoad: [ AuthGuardService ]},
      {path: 'my-files', loadChildren: '../my-files/my-files.module#MyFilesModule', canLoad: [ AuthGuardService ]},
      {path: 'upload-files', loadChildren: '../upload-files/upload-files.module#UploadFilesModule', canLoad: [ AuthGuardService ]},
      {path: 'perfil', loadChildren: '../perfil/perfil.module#PerfilModule', canLoad: [ AuthGuardService ]},
      { path: '', component: DashboardResourcesComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
