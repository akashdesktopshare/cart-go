import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubCategoryComponent } from './sub-category.component';

const routes: Routes = [
  {
    path:'',
    pathMatch:'full',
    component:SubCategoryComponent,
  },
  {
    path:':code',
    component:SubCategoryComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubCategoryRoutingModule { }
