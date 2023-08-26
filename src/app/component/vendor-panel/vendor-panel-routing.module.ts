import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VendorPanelComponent } from './vendor-panel.component';

const routes: Routes = [
  {
    path:'',
    component:VendorPanelComponent,
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
        loadChildren:()=>import("../admin-panel/dashboard/dashboard.module").then(m=>m.DashboardModule)
      },
      {
        path:'products',
        loadChildren:()=>import("./products/products.module").then(m=>m.ProductsModule),
      },
      {
        path:'products/:id',
        loadChildren:()=>import("./products/add-products/add-products.module").then(m=>m.AddProductsModule)
      },
      {
        path:'product-detail/:id',
        loadChildren:()=>import("./product-detail/product-detail.module").then(m=>m.ProductDetailModule)
      },
      {
        path:'orders',
        loadChildren:()=>import("../vendor-panel/orders/orders.module").then(m=>m.OrdersModule)
      },
      {
        path:'earnings',
        loadChildren:()=>import("../vendor-panel/earnings/earnings.module").then(m=>m.EarningsModule)
      },
      {
        path:'support',
        loadChildren:()=>import("../vendor-panel/support/support.module").then(m=>m.SupportModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendorPanelRoutingModule { }
