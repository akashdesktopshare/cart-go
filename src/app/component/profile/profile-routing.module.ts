import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { UserPermissionGuard } from 'src/app/guard/user-permission.guard';

const routes: Routes = [
  {
    path:'',
    component:ProfileComponent,
    children:[
      {
        path:'',
        redirectTo:'my-profile',
        pathMatch:'full',
      },
      {
        path:'my-profile',
        loadChildren:()=>import("../../component/profile/my-profile/my-profile.module").then(m=>m.MyProfileModule),
        canActivate:[UserPermissionGuard]
      },
      {
        path:'my-orders',
        loadChildren:()=>import("../../component/profile/my-orders/my-orders.module").then(m=>m.MyOrdersModule),
        canActivate:[UserPermissionGuard]
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
