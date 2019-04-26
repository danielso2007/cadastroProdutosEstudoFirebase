import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardHomeComponent } from './components/dashboard-home/dashboard-home.component';
import { DashboardResourcesComponent } from './components/dashboard-resources/dashboard-resources.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardHomeComponent,
    children: [
      {path: 'products', loadChildren: '../products/products.module#ProductsModule'},
      {path: 'my-files', loadChildren: '../my-files/my-files.module#MyFilesModule'},
      {path: 'upload-files', loadChildren: '../upload-files/upload-files.module#UploadFilesModule'},
      { path: '', component: DashboardResourcesComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
