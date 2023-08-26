import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AttachFileComponent } from './attach-file.component';

const routes: Routes = [
  {
    path:'',
    component:AttachFileComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AttachFileRoutingModule { }
