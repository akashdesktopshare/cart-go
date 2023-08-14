import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthguardGuard } from './guard/authguard.guard';

const routes: Routes = [

  {
    path:'',
    pathMatch:'full',
    loadChildren:()=>import("./component/home-page/home-page.module").then(m=>m.HomePageModule)
  },
  {
    path:'cart',
    loadChildren:()=> import("./component/cart/cart.module").then(m=>m.CartModule)
  },
  {
    path:'wishlist',
    loadChildren:()=> import("./component/wishlist/wishlist.module").then(m=>m.WishlistModule)
  },
  {
    path:'myprofile',
    loadChildren:()=> import("./component/profile/profile.module").then(m=>m.ProfileModule),
  },
  {
    path:'single-product/:productId',
    loadChildren:()=> import("./component/single-product/single-product.module").then(m=>m.SingleProductModule)
  },
  {
    path:'products',
    loadChildren:()=> import("./component/products/products.module").then(m=>m.ProductsModule)
  },
  {
    path:'admin',
    loadChildren:()=> import("./component/admin-panel/admin-panel.module").then(m=>m.AdminPanelModule)
  },
  {
    path:'vendor-panel',
    loadChildren:()=> import("./component/vendor-panel/vendor-panel.module").then(m=>m.VendorPanelModule)
  },
  
  {
    path:'**',
    loadChildren:()=> import("./component/page-not-found/page-not-found.module").then(m=>m.PageNotFoundModule)
  },

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
