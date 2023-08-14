import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonProductCardComponent } from './common-product-card.component';
import { RouterModule } from '@angular/router';
import { ProductDescriptionModalModule } from '../product-description-modal/product-description-modal.module';



@NgModule({
  declarations: [CommonProductCardComponent],
  imports: [
    CommonModule,
    RouterModule,
    ProductDescriptionModalModule
  ],
  exports:[CommonProductCardComponent]
})
export class CommonProductCardModule { }
