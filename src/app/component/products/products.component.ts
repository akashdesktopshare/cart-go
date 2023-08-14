import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { AuthService } from '../../services/auth.service';
import { AlertService } from '../../services/alert.service';
import {AppConstants} from "../constant/app.constants"

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  productList:any=[];
  productImgPath:any='https://thetekkers.com/myShoppingSite/public/product_images/';
  userData:any;
  loader:boolean=false;

  constructor(private prodService:ProductService,private auth_service:AuthService,public appConstants:AppConstants,private alertService:AlertService){
   
    this.getAllProducts();
  }

  ngOnInit(){
    this.scrollTop();
    this.getLoggedInUserDetails();
  }

  getLoggedInUserDetails(){
    this.userData = JSON.parse(<any>sessionStorage.getItem("loggedIn_user_data"))
  }

  getAllProducts(){
    this.loader=true;
    this.prodService.fetchProductsList((res:any)=>{
      if(res.code==200 && res.data){
        this.loader=false;
        this.productList = res.data.products;
      }
    })
}

addToCart(item:any){
  if(this.auth_service.isUserLoggedIn()){
    this.prodService.addProductsToCartAndDB(item,this.userData.user.user_id.toString());
  } else{
    this.prodService.addProductsToLocalCart(item);
  }
}

addRemoveWishlist(item:any){
  console.log(item);
  this.productList.forEach((ele:any)=>{
    if(ele.id == item.id){
      item['isWishlisted'] = !item['isWishlisted'];
      this.createParamsForWishlist(item);
    }
  })
}

createParamsForWishlist(item:any){
  console.log(this.appConstants);
  
 let params:any = {
    "product_id" : item.id.toString(),
    "user_id"    : this.userData.user.user_id.toString(),
    "status"     : item['isWishlisted'] ? "1" : "0"
}

this.prodService.addToWishlist(params,(res:any)=>{
  if(res.code==200){
    console.log(res);
    item['isWishlisted'] ?
    this.alertService.alert("success","Product Added To Wishlist", "Success", {displayDuration: 1000, pos: 'top'}) : 
    this.alertService.alert("error","Product Removed To Wishlist", "Success", {displayDuration: 1000, pos: 'top'});
    
    
  }
})

}

scrollTop(){
  setTimeout(() => {
    scrollTo(0,0);
  }, 0);
}
}
