import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HotCategoryRoutingModule } from './hot-category-routing.module';
import { HotCategoryComponent } from './hot-category.component';
import { FormsModule } from '@angular/forms';
import { CommonProductCardModule } from 'src/app/shared/common-product-card/common-product-card.module';


@NgModule({
  declarations: [HotCategoryComponent],
  imports: [
    CommonModule,
    HotCategoryRoutingModule,
    FormsModule,
    CommonProductCardModule
  ],
  exports:[HotCategoryComponent]
})
export class HotCategoryModule { }
