import { Component } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { VendorService } from 'src/app/services/vendor.service';
import { AppConstants } from '../../constant/app.constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  isVendorLogged:boolean=false;
  vendorDetails:any;

  newProductObj:any={};
  productList:any=[];
  prodImgUrl: any= this.constant.product_base_path;
  loader:any={'category':false,'subCategory':false,'showLoader':false};
 

  file:any;
  activeCardContainer:any = 'vendor-products';


  constructor(private _service:VendorService,private authService:AuthService,public constant:AppConstants,private router:Router){}

  ngOnInit(){
    this.scrollTop();
    this.checkIsVendor();
    if(this.isVendorLogged){
      this.getVendorDetails();
    }
  }

  scrollTop(){
    this._service.scrollTop();
  }

  getVendorDetails(){
    this.vendorDetails = sessionStorage.getItem("vendorDetails");
    this.vendorDetails = JSON.parse(this.vendorDetails);
    console.log(this.vendorDetails);
    
    if(this.vendorDetails){
      this.getProductListByVendor();
    }
  }

  checkIsVendor(){
    this.isVendorLogged = this.authService.isVendorLoggedIn();
  }

  getProductListByVendor(){
    this.loader.showLoader=true;
      this._service.fetchProductListByVendor({'user_id':this.vendorDetails.user.user_id.toString()},(res:any)=>{
      if(res.code==200){
        this.loader.showLoader=false;
        this.productList = res.data;
      }
    })
  }

changeProductStatus(item:any,currentStatus:any){
  console.log(item,currentStatus);

  this.productList?.products.forEach((ele:any)=>{
    if(ele.id== item.id){
      ele.is_active == "1" ? ele.is_active =  "0": ele.is_active =  "1";
      console.log(ele.is_active);
      
      this.updateProductStatus(ele);
    }
  })
  
}

updateProductStatus(item:any){
  let params :any={
    "product_id" : item.id.toString(),
    "user_id"    : this.vendorDetails.user.user_id.toString(),
    "status"     : item.is_active.toString()
}

this._service.updateProductStatusByVendor(params,(res:any)=>{
  if(res.code==200){
    console.log(res);
    
  }
})

}

receieveChildEvent(event:any){
  console.log(event);
  if(event.action == 'changeProductStatus'){
    this.changeProductStatus(event.value.item,event.value.currentStatus);
  } else if(event.action == 'editProduct'){
    this.router.navigate(['vendor-panel/products/edit']);
    this._service.passEditProductData(event.value);
    // this.openEditCategoryModal(event.value);
  }
  
}

}
