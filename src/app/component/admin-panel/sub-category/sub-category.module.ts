import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubCategoryRoutingModule } from './sub-category-routing.module';
import { FormsModule } from '@angular/forms';
import { SubCategoryComponent } from './sub-category.component';
import { CommonProductCardModule } from 'src/app/shared/common-product-card/common-product-card.module';


@NgModule({
  declarations: [SubCategoryComponent],
  imports: [
    CommonModule,
    SubCategoryRoutingModule,
    FormsModule,
    CommonProductCardModule
  ]
})
export class SubCategoryModule { }
