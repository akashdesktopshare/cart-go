import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HotCategoryComponent } from './hot-category.component';

const routes: Routes = [
  {
    path:'',
    component:HotCategoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HotCategoryRoutingModule { }
