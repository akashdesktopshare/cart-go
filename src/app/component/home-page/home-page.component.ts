import { Component, ElementRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class HomePageComponent {

  newArrivalProdlist:any=[];
  bestProdList:any=[];
  localUserData:any;
  userId:any;
  isLoggedIn:boolean=false;
  hotshotList:any=[];
  loader:boolean=false;

  productImgPath:any='https://thetekkers.com/myShoppingSite/public/product_images/';
  
  @ViewChild('slider') sliderRef!: ElementRef;
  @ViewChild('slide') slideRef!: ElementRef;
  position: number = 0;

  constructor(private prodService:ProductService,private authService:AuthService,private alertService:AlertService,private router : Router){}

  ngOnInit(){
    window.scrollTo(0,0);
    window.addEventListener("scroll", this.revealAnimationNewArrival);
    window.addEventListener("scroll", this.revealAnimationHotShot);
    
    this.getUserDataFromLocal();
    this.isLoggedIn=this.authService.isUserLoggedIn();
    console.log(45);
    
    if(this.isLoggedIn){
      this.addProductLocalCartToDb();
    }
    this.getHotShotList();
    this.getArrivalProdData();

  }

  addProductLocalCartToDb(){
    let cartData:any = localStorage.getItem("cartData");
    cartData = JSON.parse(cartData);
    if(cartData){
      let params:any;
      cartData.forEach((ele:any) => {
        
        params = {
          "product_id" : ele.id.toString(),
          "user_id"    : this.userId.toString(),
          "quantity"   : ele.quantity.toString(),
        }
        console.log(params);
        this.prodService.addProductsToCart(params,(res:any)=>{
          if(res.code == 200){
            console.log(res);
          }
        })

      });
      localStorage.removeItem("cartData");
    }
  }

  getUserDataFromLocal(){
    let data:any = sessionStorage.getItem("loggedIn_user_data");
    if(data){
      this.localUserData = JSON.parse(data);
      this.userId = this.localUserData.user.user_id;
    }
  }

  getArrivalProdData(){
    this.loader=true;
    this.prodService.getNewArrivalProducts((res:any)=>{
      if(res.code==200 && res.data){
        this.loader=false;
        this.newArrivalProdlist = this.bestProdList = res.data.products;
        this.removeBracketsFromImgName(this.newArrivalProdlist);
      }
    })
  }

  removeBracketsFromImgName(data: any) {
    data.forEach((item: any) => {
      if (item.image.includes("{")) {
        item.image = item.image.replace(/[{}]/g, '');
      } else if (item.image.includes("[")) {
        item.image = item.image.replace(/[\[\]']+/g, '');
        item.image = item.image.split(",")[0];
      } else {
        item.image = item.image.split(",")[0].trim();
      }
    })
  }

  getBestProdData(){
    this.prodService.getBestProducts((res:any)=>{
      this.bestProdList = res.data;
    })
  }

  getHotShotList(){
    this.prodService.fetchHotShotList((res:any)=>{
      if(res.code==200 && res.data){
        this.hotshotList = res.data.categories;
        console.log(res);
        
      }
    })
  }

  addToCart(item:any){
    if(!this.isLoggedIn){
      this.prodService.addProductsToLocalCart(item);
    }else{
      this.prodService.addProductsToCartAndDB(item,this.userId);
            }
  
  }

  itemExistInCart(item:any){
    let cartData:any = localStorage.getItem("cartData");
    cartData = JSON.parse(cartData);
    let quantity:any = cartData.map((ele:any) => {
      if(ele.id == item.id){
          if(!item['quantity']){
            item['quantity'] = 1;
          }
          item['quantity'] = ele['quantity']+1;
          return item['quantity'];
        }
    });
    return quantity[0];
    
  }


  revealAnimationNewArrival() {
    let reveals = document.querySelectorAll(".revealNewArrival");
    for (let i = 0; i < reveals.length; i++) {
      let windowHeight = window.innerHeight;
      let elementTop = reveals[i].getBoundingClientRect().top;
      let elementVisible = 150;

      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("active");
      } else {
        reveals[i].classList.remove("active");
      }
    }
  }

  revealAnimationHotShot() {
    let reveals = document.querySelectorAll(".revealHotShot");
    for (let i = 0; i < reveals.length; i++) {
      let windowHeight = window.innerHeight;
      let elementTop = reveals[i].getBoundingClientRect().top;
      let elementVisible = 150;

      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("active");
      } else {
        reveals[i].classList.remove("active");
      }
    }
  }

  addRemoveWishlist(item:any){
    if(this.isLoggedIn){
      this.bestProdList.forEach((ele:any)=>{
        if(ele.id == item.id){
          item['isWishlisted'] = !item['isWishlisted'];
          this.createParamsForWishlist(item);
        }
      })
    } else{
      this.addRemoveWishlistFromLocal(item);
    }

  }

  
  createParamsForWishlist(item:any){
    let params:any = {
       "product_id" : item.id.toString(),
       "user_id"    :  this.userId.toString(),
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

  addRemoveWishlistFromLocal(item:any){
    
    let wishlistData:any = JSON.parse(<any>localStorage.getItem("wishlistData"));
    if(wishlistData){
        let isExist:any = wishlistData.some((ele:any)=>ele.id == item.id);
        if(!isExist){
            item['isWishlisted']=true;
            wishlistData.push(item);
            localStorage.setItem("wishlistData",JSON.stringify(wishlistData));
        }else{
            wishlistData.forEach((e:any,idx:any)=>{
              if(e.id == item.id){
                e['isWishlisted'] =  !e['isWishlisted'];
                item['isWishlisted'] =  !item['isWishlisted'];
                wishlistData.splice(idx,1);
                localStorage.setItem("wishlistData",JSON.stringify(wishlistData));
              }
            })
        }
    } else{
      let localWishlist:any = [];
      item['isWishlisted'] =true;
      localWishlist.push(item);
      localStorage.setItem("wishlistData",JSON.stringify(localWishlist));
    }


  }

  filterProductsbyHotCat(hotId:any){
    this.router.navigate(["/products"],{queryParams:{'category_id':hotId,'user_id': this.userId ? this.userId.toString() : '0'}});
    this.prodService.emitOnValueChange({action:'filterByHotCategory',value:{'category_id':hotId,'user_id': this.userId ? this.userId.toString() : '0'}});
  }

}
