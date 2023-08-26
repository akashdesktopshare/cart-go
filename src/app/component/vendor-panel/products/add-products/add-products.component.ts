import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConstants } from 'src/app/component/constant/app.constants';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { VendorService } from 'src/app/services/vendor.service';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.scss']
})
export class AddProductsComponent {

  categoryList:any=[];
  subCategoryList:any=[];
  showAddProductConfig:boolean=false;
  addProductConfig:any={'image':[]};
  showModal:boolean=false;
  isProdEdit:boolean=false;
  loader:any={'category':false,'subCategory':false,'showLoader':false};
  formData:any=new FormData();
  productImages:any=[];
  errorMessage:any;
  isVendorLogged:boolean=false;
  vendorDetails:any;
  productImgUrl:any = this.constant.product_base_path;
  uploadedProdImgs:any=[];

  constructor(private _service:VendorService,private router:Router ,private adminService:AdminService,private authService:AuthService,private constant:AppConstants,private activeRoute:ActivatedRoute){
    if(this.router.url.includes("edit")){
      this.isProdEdit = true;
      this.addProductConfig = this._service.getPassedEditProductData();
      console.log(this.addProductConfig);
    }
    
  }


  ngOnInit(){
    this.scrollTop();
    this.checkIsVendor();
    if(this.isVendorLogged){
      this.getVendorDetails();
      this.getAllCatList();
    }
  }

  scrollTop(){
    this._service.scrollTop();
  }

  checkIsVendor(){
    this.isVendorLogged = this.authService.isVendorLoggedIn();
  }

   getVendorDetails(){
    this.vendorDetails = sessionStorage.getItem("vendorDetails");
    this.vendorDetails = JSON.parse(this.vendorDetails);
  }

  addNewProduct(){
    this.addProductConfig['vendor_id'] = this.vendorDetails.user.user_id.toString();
    this.addProductConfig['SKU'] = '123';
  
    let inputfieldsLength =  Object.keys(this.addProductConfig).length;
  
    for (let i = 0; i<inputfieldsLength;i++){
        this.formData.append(`${Object.keys(this.addProductConfig)[i]}`,`${Object.values(this.addProductConfig)[i]}`)
    }
  
    this._service.addProductsByVendor(this.formData,(res:any)=>{
      if(res.code==200){
        console.log(res);
        this.addProductConfig={};
        this.showAddProductConfig = false;
        this.subCategoryList = [];
        this.errorMessage='';
        this.router.navigate(['/vendor-panel/products']);
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
    this.addProductConfig['category_id'] = event.target.value;
    this.adminService.fetchSubCatById({'category_id':event.target.value},(res:any)=>{
    if(res.code == 200 ){
      this.loader.subCategory=false;
      this.subCategoryList = res.data.categories[0].sub_category;
      if(this.subCategoryList.length == 0){
        this.subCategoryList = '';
  
      }
      this.showAddProductConfig = false;
    }
  })
  }
  
  showAddProductConfigModal(event:any){
    this.addProductConfig['subCategory_id'] = event.target.value;
    this.showAddProductConfig = true;
  }

  openEditCategoryModal(item:any){

    this.addProductConfig['name'] = item.name;
    this.addProductConfig['description'] = item.description;
    this.addProductConfig['price'] = item.price;
    this.addProductConfig['discount_id'] = item.discount_id;
    this.addProductConfig['quantity'] = item.quantity;
    this.addProductConfig['subCategory_id'] = item.subCategory_id;
   
    this.showAddProductConfig=true;
    this.showModal =true;
    this.isProdEdit =true;
      
  }
  
  editProduct(){
    this.addProductConfig['vendor_id'] = this.vendorDetails.user.user_id.toString();
    this.addProductConfig['SKU'] = '123';
    this.addProductConfig['product_id'] = this.addProductConfig['id'];
  
    let inputfieldsLength =  Object.keys(this.addProductConfig).length;
  
    for (let i = 0; i<inputfieldsLength;i++){
        this.formData.append(`${Object.keys(this.addProductConfig)[i]}`,`${Object.values(this.addProductConfig)[i]}`)
    }
  
    this._service.editProductByVendor(this.formData,(res:any)=>{
      if(res.code==200){
        console.log(res);
        this.addProductConfig={};
        this.showModal=false;
        this.errorMessage='';
        this.router.navigate(['/vendor-panel/products']);
      }else{
        this.errorMessage = res.message;
      }
    })
  }

  receiveChildEvent(event:any){
      if(event['action'] == 'closeModal'){
        this.showModal=false;
      } else if(event['action'] == 'uploadedImgName'){

        if(this.addProductConfig['image'].length>0){
          event.value.forEach((item:any)=>{
            this.addProductConfig['image'].push(item);
          })
        } else{
          this.addProductConfig['image'] = event.value;
        }

        
      }
  }
}
