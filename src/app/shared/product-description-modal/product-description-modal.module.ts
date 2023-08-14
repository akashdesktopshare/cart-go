import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDescriptionModalComponent } from './product-description-modal.component';



@NgModule({
  declarations: [ProductDescriptionModalComponent],
  imports: [
    CommonModule
  ],
  exports:[ProductDescriptionModalComponent]
})
export class ProductDescriptionModalModule { }
