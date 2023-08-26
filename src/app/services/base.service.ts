import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BaseService {

  baseUrl:any="https://thetekkers.com/myShoppingSite/api/user/"

  httpUrls:any={
    'fetchVendorList':'getVendorList',
    'addCategory':'addCategory',
    'fetchCategoryList':"getCategoryList",
    'addSubCategoryList':'addSubCategory',
    'addProduct':'addProduct',
    'fetchProductList':'getProductList',
    'fetchSubCategoryListById':'getSubCategoryList',
    'fetchUserList':'getCustomerList',
    'updateVendorStatus':'updateVendorStatus',
    'fetchHotCategoryList':'getHotCategoryList',
    'getWishlist':'getWishlist',
    'updateHotCategory':'updateHotCategory',
    'editCategory':'editCategory',
    'addProductToCart':'addProductToCart',
    'getCartItems':'getCartItems',
    'editSubCategory':'editSubCategory',
    'getProductsByVendorId':'getProductsByVendorId',
    'addProductsByVendor':'addProduct',
    'addToWishlist':'updateWishlist',
    'getProductDetailById':'getProductDetailById',
    'becomeVendorRequest':'becomeVendorRequest',
    'removeItemFromCart':'removeItemFromCart',
    'getNewArrivals':'getNewArrivals',
    'fetchVendorReqList':'getVendorRequests',
    'updateProductStatusByVendor':'updateProductStatusByVendor',
    'editProductByVendor':'editProductByVendor',
    'addImage':'addImage',
  }

  constructor( public http:HttpClient) { }

  getData(d: any, url: string, callback: any){
      return this.http.get(this.baseUrl+url,d).subscribe((data)=>callback(<any>data),
      (error: any) => {
        console.log(error);
        if (error.status == 500) {
          callback(error);
        }
      },
      () => {
      })
    }

  postData(d: any, url: string, callback: any){
      return this.http.post(this.baseUrl+url,d).subscribe((data)=>callback(<any>data),
      (error: any) => {
        console.log(error);
        if (error.status == 500) {
          callback(error);
        }
      },
      () => {
      })
    }
}
