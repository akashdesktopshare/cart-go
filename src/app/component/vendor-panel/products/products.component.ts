import { Component } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { VendorService } from 'src/app/services/vendor.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  isVendorLogged:boolean=false;
  vendorDetails:any;

  showModal:boolean=false;
  newProductObj:any={};
  productList:any=[];
  basePath: any= "https://thetekkers.com/myShoppingSite/public/product_images/";
  isProdEdit:boolean=false;
  loader:any={'category':false,'subCategory':false,'showLoader':false};
  categoryList:any=[];
  subCategoryList:any=[];
  showAddProductConfig:boolean=false;
  errorMessage:any;

  addProductConfig:any={};
  file:any;
  formData:any=new FormData();
  activeCardContainer:any = 'vendor-products';

  constructor(private _service:VendorService,private authService:AuthService,private adminService:AdminService){}

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

  addIcon(event:any){
    this.file = event.target.files[0];
   const reader:any = new FileReader();
   reader.readAsDataURL(this.file);

   reader.onload=(event:any)=>{
     this.addProductConfig['image'] =  event.target.result;
     
   }

   this.formData = new FormData();
   this.formData.append('image',this.file)
   
}

addNewProduct(){
  this.addProductConfig['vendor_id'] = this.vendorDetails.user.user_id.toString();
  this.addProductConfig['SKU'] = '123';

  let inputfieldsLength =  Object.keys(this.addProductConfig).length;

  for (let i = 0; i<inputfieldsLength;i++){
    if(`${Object.keys(this.addProductConfig)[i]}` != 'image'){
      this.formData.append(`${Object.keys(this.addProductConfig)[i]}`,`${Object.values(this.addProductConfig)[i]}`)
    }
  }

  this._service.addProductsByVendor(this.formData,(res:any)=>{
    if(res.code==200){
      console.log(res);
      this.addProductConfig={};
      this.showAddProductConfig = false;
      this.subCategoryList = [];
      this.showModal=false;
      this.errorMessage='';
      this.getProductListByVendor();
    }else{
      this.errorMessage = res.message;
    }
  })
  
}


getAllCatList(){
  this.loader.category=true;
  this.adminService.fetchAllCategory((res:any)=>{
    this.loader.category=false;
    this.categoryList = res.data.categories;
  })
}

getSubCategoryById(event:any){
  this.loader.subCategory=true;
  this.adminService.fetchSubCatById({'category_id':event.target.value},(res:any)=>{
  if(res.code == 200 ){
    this.loader.subCategory=false;
    this.subCategoryList = res.data.categories[0].sub_category;
    if(this.subCategoryList.length == 0){
      this.subCategoryList = '';

    }
    this.showAddProductConfig = false;
    this.addProductConfig = {};
  }
})
}

showAddProductConfigModal(event:any){
  this.addProductConfig['subCategory_id'] = event.target.value;
  this.showAddProductConfig = true;
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

openEditCategoryModal(item:any){

  this.addProductConfig['name'] = item.name;
  this.addProductConfig['description'] = item.description;
  this.addProductConfig['price'] = item.price;
  this.addProductConfig['discount_id'] = item.discount_id;
  this.addProductConfig['quantity'] = item.quantity;
  this.addProductConfig['subCategory_id'] = item.subCategory_id;
  this.addProductConfig['product_id'] = item.id;
  this.showAddProductConfig=true;
  this.showModal =true;
  this.isProdEdit =true;
    
}

editProduct(){
  this.addProductConfig['vendor_id'] = this.vendorDetails.user.user_id.toString();
  this.addProductConfig['SKU'] = '123';

  let inputfieldsLength =  Object.keys(this.addProductConfig).length;

  for (let i = 0; i<inputfieldsLength;i++){
    if(`${Object.keys(this.addProductConfig)[i]}` != 'image'){
      this.formData.append(`${Object.keys(this.addProductConfig)[i]}`,`${Object.values(this.addProductConfig)[i]}`)
    }
  }

  this._service.editProductByVendor(this.formData,(res:any)=>{
    if(res.code==200){
      console.log(res);
      this.addProductConfig={};
      this.showModal=false;
      this.errorMessage='';
      this.getProductListByVendor();
    }else{
      this.errorMessage = res.message;
    }
  })
}

receieveChildEvent(event:any){
  console.log(event);
  if(event.action == 'changeProductStatus'){
    this.changeProductStatus(event.value.item,event.value.currentStatus);
  } else if(event.action == 'openEditModal'){
    this.openEditCategoryModal(event.value);
  }
  
}

}
