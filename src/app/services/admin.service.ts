import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BaseService } from './base.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService extends BaseService{
  
  constructor(http:HttpClient) {
    super(http);
  
}

scrollTop(){
  setTimeout(() => {
    window.scroll(0,0);
  }, 0);
}

fetchAllCategory(callback:any){
  this.getData({}, this.httpUrls['fetchCategoryList'], callback);
}

fetchProductList(callback:any){
  this.getData({}, this.httpUrls['fetchProductList'], callback);
}

fetchUserList(callback:any){
  this.getData({}, this.httpUrls['fetchUserList'], callback);
}

fetchHotCategoryList(callback:any){
  this.getData({}, this.httpUrls['fetchHotCategoryList'], callback);
}

fetchVendorReqList(callback:any){
  this.getData({}, this.httpUrls['fetchVendorReqList'], callback);
}

fetchSubCatById(id:any,callback:any){
  this.postData(id, this.httpUrls['fetchSubCategoryListById'], callback);
}

editCategory(params:any,callback:any){
  this.postData(params, this.httpUrls['editCategory'], callback);
}

editSubCategory(params:any,callback:any){
  this.postData(params, this.httpUrls['editSubCategory'], callback);
}

updateVendorStatus(params:any,callback:any){
  this.postData(params, this.httpUrls['updateVendorStatus'], callback);
}

updateHotCategory(params:any,callback:any){
  this.postData(params, this.httpUrls['updateHotCategory'], callback);
}

addNewCategory(params:any,callback:any){
  this.postData(params, this.httpUrls['addCategory'], callback);
}

addNewSubCategory(params:any,callback:any){
  this.postData(params, this.httpUrls['addSubCategoryList'], callback);
}

fetchAllSubCategory(callback:any){
}

fetchVendorList(callback:any){
  this.getData({}, this.httpUrls['fetchVendorList'], callback);
}

addNewVendor(params:any,callback:any){
  // this.vendorList.push(params);
  return callback({'status':200,'message':'New Vendor Added'});
}

}
