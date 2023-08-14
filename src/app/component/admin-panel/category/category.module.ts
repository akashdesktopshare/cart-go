import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoryComponent } from './category.component';
import { FormsModule } from '@angular/forms';
import { CommonProductCardModule } from 'src/app/shared/common-product-card/common-product-card.module';


@NgModule({
  declarations: [CategoryComponent],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    FormsModule,
    CommonProductCardModule
  ]
})
export class CategoryModule { }
