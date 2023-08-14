import { Component } from '@angular/core';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent {

  user_id:any;
  wishlistData:any=[];
  baseImgPath:any="https://thetekkers.com/myShoppingSite/public/product_images/"
  loader:boolean=false;


  constructor(private prodService:ProductService,private alert:AlertService,private authService:AuthService){}

  ngOnInit(){
    let userDataFromLocal:any = sessionStorage.getItem("loggedIn_user_data");
    userDataFromLocal = JSON.parse(userDataFromLocal);
    if(userDataFromLocal){
      this.user_id = userDataFromLocal.user.user_id;
      this.getWishlistData();
    }else{
      this.getLocalWishlistData();
    }
  }

  getWishlistData(){
    this.loader=true;
    let params:any={
      'user_id': JSON.stringify(this.user_id)
    }
    this.prodService.fetchWishlist(params,(res:any)=>{
      if(res.code == 200){
        this.loader=false;
        console.log(res);
        this.wishlistData = res.data.wishlist;
      }
    })
  }

  getLocalWishlistData(){
    let wishlistData:any = JSON.parse(<any>localStorage.getItem("wishlistData"));
    if(wishlistData){
      this.wishlistData = wishlistData;
    } else this.wishlistData = [];
    
  }

  addToCart(item:any){

  }
  
  removeItem(item:any){
    this.wishlistData.forEach((ele:any,idx:any) => {
      if((ele?.product && ele?.product[0].id == item.id) || ele.id == item.id){
        this.wishlistData.splice(idx,1);
        if(this.authService.isUserLoggedIn()){
          this.createParamsForWishlist(item);

        }
      }
    });
  }

  createParamsForWishlist(item:any){
    let params:any = {
       "product_id" : item.id.toString(),
       "user_id"    :  this.user_id.toString(),
       "status"     : "0"
   }
 
   this.prodService.addToWishlist(params,(res:any)=>{
     if(res.code==200){
       console.log(res);
       this.alert.alert("error","Product Removed From Wishlist", "Success", {displayDuration: 1000, pos: 'top'})
     }
   })
  }


}
