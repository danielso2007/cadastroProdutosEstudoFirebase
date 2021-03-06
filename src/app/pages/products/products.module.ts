import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './components/products/products.component';


@NgModule({
  declarations: [ProductsComponent],
  imports: [
    SharedModule,
    ProductsRoutingModule
  ]
})
export class ProductsModule { }
