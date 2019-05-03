import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: 'dashboard', loadChildren: './pages/dashboard/dashboard.module#DashboardModule'
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: false})], // Tratando unsubscribe por meio de eventos do Roteador do Angular
  exports: [RouterModule]
})
export class AppRoutingModule { }
