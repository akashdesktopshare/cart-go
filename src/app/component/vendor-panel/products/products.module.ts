import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './products.component';
import { FormsModule } from '@angular/forms';
import { CommonProductCardModule } from 'src/app/shared/common-product-card/common-product-card.module';


@NgModule({
  declarations: [ProductsComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    FormsModule,
    CommonProductCardModule
  ],
  exports:[ProductsComponent]
})
export class ProductsModule { }
