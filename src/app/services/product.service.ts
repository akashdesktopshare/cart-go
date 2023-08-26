import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { BaseService } from './base.service';
import { HttpClient } from '@angular/common/http';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService extends BaseService {

  data:any=[];

  private seviceEventEmitter = new Subject<any>();
  private seviceEventEmitterReference: any = {};

  constructor(http:HttpClient,private alertService:AlertService) {
    super(http);

    this.data = [
      {
      "id": 1,
      "name": "Product 2",
      "description": "ornamental pieces (such as rings, necklaces, earrings, and bracelets) that are made of materials which may or may not be precious (such as gold, silver, glass, and plastic), are often set with genuine or imitation gems, and are worn for personal adornment.",
      "image": "1688543232322.jpg",
      "SKU": "12345",
      "subCategory_id": "2",
      "inventory_id": "2",
      "price": "120",
      "discount_id": "0",
      "vendor_id": "2",
      "is_active": "1",
      "created_at": "2023-07-05T07:47:12.000000Z",
      "updated_at": "2023-07-05T07:47:12.000000Z",
      "deleted_at": null,
    },
      {
      "id": 2,
      "name": "Product 1",
      "description": "ornamental pieces (such as rings, necklaces, earrings, and bracelets) that are made of materials which may or may not be precious (such as gold, silver, glass, and plastic), are often set with genuine or imitation gems, and are worn for personal adornment.",
      "image": "1688543232322.jpg",
      "SKU": "12345",
      "subCategory_id": "2",
      "inventory_id": "2",
      "price": "130",
      "discount_id": "0",
      "vendor_id": "2",
      "is_active": "1",
      "created_at": "2023-07-05T07:47:12.000000Z",
      "updated_at": "2023-07-05T07:47:12.000000Z",
      "deleted_at": null,
    },
    ]
}

  getNewArrivalProducts(callback:any){
    this.getData({}, this.httpUrls['getNewArrivals'], callback);
  }

  getSingleProduct(productId:any,callback:any){
   return callback({'data':this.data.find((e:any)=>e.id == productId)})
  }

  getBestProducts(callback:any){
    return callback({'data':this.data});
  }

  fetchWishlist(user_id:any,callback:any){
    this.postData(user_id, this.httpUrls['getWishlist'], callback);
  }

  fetchAllCategory(callback:any){
    this.getData({}, this.httpUrls['fetchCategoryList'], callback);
  }

  fetchProductsList(params:any,callback:any){
    this.postData(params, this.httpUrls['fetchProductList'], callback);
  }

  fetchProductsById(prodId:any,callback:any){
    this.postData(prodId, this.httpUrls['getProductDetailById'], callback);
  }

  fetchHotShotList(callback:any){
    this.getData({}, this.httpUrls['fetchHotCategoryList'], callback);
  }

  becomeVendorRequest(vendorDetails:any,callback:any){
    this.postData(vendorDetails, this.httpUrls['becomeVendorRequest'], callback);
  }

  addProductsToLocalCart(item:any){
    console.log(43543);
    this.alertService.alert("success","Item Added Into Cart", "Success", {displayDuration: 1000, pos: 'top'})
    if(!item.quantity){
      item['quantity'] = 1;
    }
    let cartData: any = [];
    let localCart = localStorage.getItem("cartData");
    if (!localCart) {
      cartData.push(item);
      localStorage.setItem("cartData", JSON.stringify(cartData));
      this.emitOnValueChange({ action: 'itemAdded', value: cartData });
    } else {
      cartData = JSON.parse(localCart);
      let exist = cartData.some((ele: any) => ele.id == item.id);
      if (!exist) {
        cartData.push(item);
        localStorage.setItem("cartData", JSON.stringify(cartData));
        this.emitOnValueChange({ action: 'itemAdded', value: cartData });
      } else {
        cartData.find((e: any) => {
          if (e.id == item.id) {
            e.quantity = e.quantity + 1;
            localStorage.setItem("cartData", JSON.stringify(cartData));
            this.emitOnValueChange({ action: 'itemAdded', value: cartData });
          }
        })
      }
    }
  }

  addProductsToCartAndDB(item:any,userId:any){
    
    if(!item.quantity){
      item['quantity'] = 1;
    }
    let cartData: any = [];
    let localCart = localStorage.getItem("cartData");
    if (!localCart) {
      cartData.push(item);
      localStorage.setItem("cartData", JSON.stringify(cartData));
      this.createParamsToAdd(item,userId);
      this.emitOnValueChange({ action: 'itemAdded', value: cartData });
    } else {
      cartData = JSON.parse(localCart);
      let exist = cartData.some((ele: any) => ele.id == item.id);
      if (!exist) {
        cartData.push(item);
        localStorage.setItem("cartData", JSON.stringify(cartData));
        this.createParamsToAdd(item,userId);
        this.emitOnValueChange({ action: 'itemAdded', value: cartData });
      } else {
        cartData.find((e: any) => {
          if (e.id == item.id) {
            e.quantity = e.quantity + 1;
            item.quantity = item.quantity + 1;
            localStorage.setItem("cartData", JSON.stringify(cartData));
            this.createParamsToAdd(item,userId);
            this.emitOnValueChange({ action: 'itemAdded', value: cartData });
          }
        })
      }
    }
  }

  createParamsToAdd(item:any,userId:any){
    let params:any = {
      "product_id" : item.id.toString(),
      "user_id"    : userId.toString(),
      "quantity"   : item.quantity.toString()
    }

    this.addProductsToCart(params,(res:any)=>{
      if(res.code==200){
        console.log(res);
        this.alertService.alert("success","Item Added Into Cart", "Success", {displayDuration: 1000, pos: 'top'})
      }
    })
  }

  addProductsToCart(params:any,callback:any){
    this.postData(params, this.httpUrls['addProductToCart'], callback);
  }

  addToWishlist(params:any,callback:any){
    this.postData(params, this.httpUrls['addToWishlist'], callback);
  }

  getCartItems(user_id:any,callback:any){
    this.postData(user_id, this.httpUrls['getCartItems'], callback);
  }

  removeCartItem(params:any,callback:any){
    this.postData(params, this.httpUrls['removeItemFromCart'], callback);
  }

  emitOnValueChange(data: any) {
    this.seviceEventEmitter.next(data);
  }

  subscribeOnValueChange(name: any, callback: any) {
    this.seviceEventEmitterReference[name] = this.seviceEventEmitter.subscribe((header) => {
      callback(header)
    });
  }
}
