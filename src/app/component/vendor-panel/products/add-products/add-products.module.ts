import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddProductsRoutingModule } from './add-products-routing.module';
import { AddProductsComponent } from './add-products.component';
import { FormsModule } from '@angular/forms';
import { AttachFileModule } from 'src/app/shared/attach-file/attach-file.module';


@NgModule({
  declarations: [AddProductsComponent],
  imports: [
    CommonModule,
    AddProductsRoutingModule,
    FormsModule,
    AttachFileModule
  ],
  exports:[AddProductsComponent]
})
export class AddProductsModule { }
