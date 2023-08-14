import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPanelComponent } from './admin-panel.component';
import { AuthguardGuard } from 'src/app/guard/authguard.guard';

const routes: Routes = [
  {
    path:'',
    component:AdminPanelComponent,
    children:[
      {
        path:'',
        redirectTo:'login',
        pathMatch:'full',
      },
      {
        path:'login',
        loadChildren:()=>import("../admin-panel/login/login.module").then(m=>m.LoginModule)
      },
      {
        path:'dashboard',
        loadChildren:()=>import("../admin-panel/dashboard/dashboard.module").then(m=>m.DashboardModule),
        canActivate:[AuthguardGuard]
      },
      {
        path:'category',
        loadChildren:()=>import("../admin-panel/category/category.module").then(m=>m.CategoryModule),
        canActivate:[AuthguardGuard]
      },
      {
        path:'hot-category',
        loadChildren:()=>import("../admin-panel/hot-category/hot-category.module").then(m=>m.HotCategoryModule),
        canActivate:[AuthguardGuard]
      },
      {
        path:'sub-category',
        loadChildren:()=>import("../admin-panel/sub-category/sub-category.module").then(m=>m.SubCategoryModule),
        canActivate:[AuthguardGuard]
      },
      {
        path:'vendors',
        loadChildren:()=>import("../admin-panel/vendors/vendors.module").then(m=>m.VendorsModule),
        canActivate:[AuthguardGuard]
      },
      {
        path:'users',
        loadChildren:()=>import("../admin-panel/user/user.module").then(m=>m.UserModule),
        canActivate:[AuthguardGuard]
      },
      {
        path:'pending-request',
        loadChildren:()=>import("../admin-panel/pending-request/pending-request.module").then(m=>m.PendingRequestModule),
        canActivate:[AuthguardGuard]
      },
      // {
      //   path:'products',
      //   loadChildren:()=>import("../admin-panel/products/products.module").then(m=>m.ProductsModule),
      //   canActivate:[AuthguardGuard]
      // },
    ]
  },
   
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminPanelRoutingModule { }
