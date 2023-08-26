import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';
import { AppConstants } from '../constant/app.constants';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss']
})
export class SingleProductComponent {

  singleProduct :any= [];
  productQuantity:any=1;
  baseImgPath:any='https://thetekkers.com/myShoppingSite/public/product_images/'
  loader:boolean=false;

  constructor(private route:ActivatedRoute,private prodService:ProductService,private authService:AuthService,public appConstant:AppConstants){
   let prodId =  this.route.snapshot.paramMap.get("productId")
   this.getSingleProduct(prodId);
   this.scrollToTop();
  }

  ngOnInit(){

  }

  getSingleProduct(prodId:any){
    this.loader=true;
    this.prodService.fetchProductsById({'product_id':prodId},(res:any)=>{
      if(res.code==200 && res.data){
        this.loader=false;
        console.log(res);
        this.singleProduct  = res.data.product[0];
        this.removeBracketsFromImgName(res.data.product);
      }
    })
    
    // let cartData:any = JSON.parse(<any>localStorage.getItem("cartData"));
    // if(cartData){
    //  let singleProdItem:any =  cartData.filter((item:any,idx:any) => {
    //     if(item.id == prodId){
    //       return item;
    //     }
    //   });
    //   this.singleProduct= singleProdItem[0];
    // }
    // this.prodService.getSingleProduct(prodId,(res:any)=>{
    //   this.singleProduct = res.data;
    // })
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

  handleQuantity(val:any){
    if(this.productQuantity < 10 && val === 'add'){
      this.productQuantity += 1;
    }else if(this.productQuantity > 1 && val === 'remove'){
      this.productQuantity -= 1;
    }
  }

  addToCart(item:any){

    if(this.authService.isUserLoggedIn()){
      this.prodService.addProductsToCartAndDB(item,this.appConstant.user_id);
    } else{
      this.prodService.addProductsToLocalCart(item);
    }
    // item['itemQuantity'] = this.productQuantity;
    // let cartData: any = [];
    // let localCart = localStorage.getItem("cartData");
    // if (!localCart) {
    //   cartData.push(item);
    //   localStorage.setItem("cartData", JSON.stringify(cartData));
    //   this.prodService.emitOnValueChange({action:'itemAdded',value:cartData});
    // } else {
    //   cartData = JSON.parse(localCart);
    //   let exist = cartData.some((ele: any) => ele.itemId == item.itemId);
    //   if (!exist) {
    //     cartData.push(item);
    //     localStorage.setItem("cartData", JSON.stringify(cartData));
    //     this.prodService.emitOnValueChange({action:'itemAdded',value:cartData});
    //   } else {
    //     cartData.find((e: any) => {
    //       if (e.itemId == item.itemId) {
    //         e.itemQuantity = this.productQuantity;
    //         localStorage.setItem("cartData", JSON.stringify(cartData));
    //         this.prodService.emitOnValueChange({action:'itemAdded',value:cartData});
    //       }
    //     })
    //   }
    // }

  }

  scrollToTop(){
    setTimeout(() => {
      scrollTo(0,0);
     }, 0);
  }

  changeBigImg(imgSrc:any){
    let bigImg:any = document.getElementById("big-img");
    bigImg.src = this.baseImgPath+imgSrc;
  }


}
