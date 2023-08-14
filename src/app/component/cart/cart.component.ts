import { Component } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {

  cartData:any=[];
  userData:any;
  totalPrice:any=0;
  loader:boolean=false;

  basePath:any='https://thetekkers.com/myShoppingSite/public/product_images/'

  constructor(private prodservice:ProductService,private adminService:AdminService,private authService:AuthService,private alertService:AlertService){}

  ngOnInit(){
    
    this.scrollTop();

    let data:any = sessionStorage.getItem("loggedIn_user_data");
    this.userData = JSON.parse(data); 
    if(this.authService.isUserLoggedIn() && this.userData){
      this.getCartData(this.userData.user.user_id);
    }else{
      this.cartData = JSON.parse(<any>localStorage.getItem("cartData"))
      if(!this.cartData){
        this.cartData=[];
      }
      console.log(this.cartData);
      
    }
  }

  scrollTop(){
    this.adminService.scrollTop();
  }

  getCartData(userId:any){
    this.loader=true;
    this.prodservice.getCartItems({'user_id':JSON.stringify(userId)},(res:any)=>{
      if(res.code ==200){
        this.loader=false;
      console.log(res);
      this.cartData = res.data.cart;
      this.getSubTotal();
      this.prodservice.emitOnValueChange({ action: 'itemAdded', value: this.cartData })
      }
    })
  }

  deleteCartItem(item:any){
    if(!this.authService.isUserLoggedIn()){
        this.deleteCartItemFromLocal(item);
    }else{
      this.deleteCartItemFromDB(item);
    }
  }

  deleteCartItemFromDB(item:any){
    let params:any={
      "product_id" : item.id.toString(),
      "user_id"    : this.userData.user.user_id.toString()
  }

    this.prodservice.removeCartItem(params,(res:any)=>{
      if(res.code==200){
        console.log(res);
        this.getCartData(this.userData.user.user_id);
        this.alertService.alert("error","Item Removed From Cart", "Success", {displayDuration: 1000, pos: 'top'})
      }
    })
  }

  deleteCartItemFromLocal(item:any){
    let cartData:any=[];
    let localCart :any =  localStorage.getItem("cartData");
    if(localCart){
        cartData= JSON.parse(localCart);
        cartData.forEach((ele:any,idx:any) => {
          if (ele.id == item.product_id) {
            this.cartData.splice(idx, 1);
            localStorage.setItem("cartData",JSON.stringify(this.cartData));
            this.prodservice.emitOnValueChange({'action':'itemDeleted','value':this.cartData})
          }
        });
    }else{
      console.log(45);
      
      cartData = JSON.parse(JSON.stringify(this.cartData));

      cartData.forEach((ele:any,idx:any) => {
        if (ele.id == item.product_id) {
          this.cartData.splice(idx, 1);
          this.prodservice.emitOnValueChange({'action':'itemDeleted','value':this.cartData})
        }
      });
      this.cartData = this.cartData;
    }
  }

  handleQty(value:any,item:any){
    if(value === 'add'){
      this.cartData.forEach((ele:any) => {
        if(ele.product_id == item.product_id){
          item.quantity = +item.quantity + 1;
          this.getSubTotal();
        }
      });
    }else{
      this.cartData.forEach((ele:any) => {
        if(ele.product_id == item.product_id){
          item.quantity = +item.quantity - 1;
          this.getSubTotal();
        }
      });
    }
  }

  getSubTotal(){
      let total:any=0;
        this.cartData.forEach((item:any)=>{
          item['totalPrice'] = +item.quantity * +item.product[0]?.price
            total = total + item['totalPrice'];
        })
        this.totalPrice = total;
      return total;
        
  }
}
