import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './components/products/products.component';
import { AuthGuardService } from 'src/app/core/services/auth.guard.service';

const routes: Routes = [{path: '', component: ProductsComponent, canActivate: [ AuthGuardService ]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
