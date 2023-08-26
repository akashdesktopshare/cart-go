import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class VendorService extends BaseService{
  
  editProductConfig:any;

  constructor(http:HttpClient) {
    super(http);
}

scrollTop(){
  setTimeout(() => {
    window.scroll(0,0);
  }, 0);
}

fetchProductListByVendor(vendor_id:any,callback:any){
  this.postData(vendor_id, this.httpUrls['getProductsByVendorId'], callback);
}

addProductsByVendor(params:any,callback:any){
  this.postData(params, this.httpUrls['addProductsByVendor'], callback);
}

updateProductStatusByVendor(params:any,callback:any){
  this.postData(params, this.httpUrls['updateProductStatusByVendor'], callback);
}

editProductByVendor(params:any,callback:any){
  this.postData(params, this.httpUrls['editProductByVendor'], callback);
}

fetchImageUrl(params:any,callback:any){
  this.postData(params, this.httpUrls['addImage'], callback);
}

passEditProductData(product:any){
  this.editProductConfig = product;
}

getPassedEditProductData(){
  return this.editProductConfig;
}

}
