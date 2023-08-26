import { Component, ViewEncapsulation } from '@angular/core';
import { ProductService } from '../services/product.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';
import { AppConstants } from '../component/constant/app.constants';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class HeaderComponent {

  cartItems:any=[];
  showCategoryDrpdown:boolean=false;
  showModal:boolean=false;
  showActiveForm:any={};
  loginDetails:any={};
  vendorSignUpDetails:any={};
  loader:boolean=false;
  isLoggedIn:boolean=false;
  user_base_path:any= this._constant.user_base_path;
  product_img_path:any= this._constant.product_base_path;
  loggedInUserDetails:any;
  toggleDropdown:boolean=false;
  signUpModal:any;
  errorMessage:any;
  categoryList:any=[];

  profileImg:any;
  formData:any=new FormData();

  constructor(private prodService: ProductService,private _authService:AuthService,public _constant:AppConstants,private router:Router){
    this.prodService.subscribeOnValueChange('HeaderComp',(event:any)=>{
      if(event['action']=='itemAdded'){
        console.log(213);
        this.cartItems = event.value.length;
      } 
      else if(event['action']=='itemDeleted'){
        this.cartItems = event.value.length;
      }
    })

   
  }

  ngOnInit(){
    this.getLoggedInDetails();
    this.getCategoryList();
    let cartData:any = localStorage.getItem("cartData");
    this.cartItems = JSON.parse(cartData)?.length;

  }

  getLoggedInDetails(){
      let local:any = sessionStorage.getItem("loggedIn_user_data");
      if(local && local != "undefined"){
        local = JSON.parse(local);
        this.isLoggedIn = true;
        this.loggedInUserDetails = local.user;
      }
  }

  getCategoryList(){
    this.prodService.fetchAllCategory((res:any)=>{
      if(res.code==200){
        console.log(res.data);
        this.categoryList = res.data.categories;
      }
    })
  }

  login(){
    this.loader=true;
    let params:any={
      'email':this.loginDetails['email'],
      'password':this.loginDetails['password'],
    }
    
    this._authService.login(params,(res:any)=>{
      if(res.code == 200 && res.data){
        this.loader=false;
        console.log(res);
        this.isLoggedIn = true;
        this.storeUserDataIntoLocal(res);
        this.showModal=false;
        location.reload();
      } else if(res.code==200 && res.status == 'failure'){
        this.errorMessage = res.message;
        this.loader=false;
      }
})

  }

  toggleMenu(): void {
    if(!this.isLoggedIn){
      this.showModal=true;
      this.showActiveForm['login']=true;
    }
    this.toggleDropdown = !this.toggleDropdown;
    if(this.toggleDropdown){
      console.log(12);
       document.addEventListener("click",(e:any)=>{
          if(!e.target.closest('.no-css-drop')){
                this.toggleDropdown = false;
          }
      })
    }else{
    }
  }
  
  logout(){
    localStorage.clear();
    sessionStorage.clear();
    location.reload();
  }

  selectProfileImage(event:any){
    this.profileImg = event.target.files[0];
    const reader:any = new FileReader();
    reader.readAsDataURL(this.profileImg);
    this.formData.append('image',this.profileImg);
  }

  register(signUpModal:any){
    this.loader=true;
    let inputfieldsLength =  Object.keys(signUpModal.value).length;
    signUpModal.controls.role_id.setValue("1");
    signUpModal.controls.role_id.updateValueAndValidity();
    
     for (let i = 0; i<inputfieldsLength;i++){
      if(`${Object.keys(signUpModal.value)[i]}` != 'image' && `${Object.values(signUpModal.value)[i]}`){
        this.formData.append(`${Object.keys(signUpModal.value)[i]}`,`${Object.values(signUpModal.value)[i]}`)
        console.log(`${Object.keys(signUpModal.value)[i]}`,`${Object.values(signUpModal.value)[i]}`);
      }
    }

    this._authService.signUp(this.formData,(res:any)=>{
      if(res.code == 200 ){
        this.loader=false;
        console.log(res);
        this.isLoggedIn = true;
        this.storeUserDataIntoLocal(res);
        this.showModal=false;
        location.reload();
      }
    })

    
  }
  storeUserDataIntoLocal(res:any){
    sessionStorage.setItem("token",JSON.stringify(crypto.randomUUID()));
    sessionStorage.setItem("loggedIn_user_data",JSON.stringify(res.data))
  }

  becomeVendorRequest(){
    console.log(this.vendorSignUpDetails);
    this.loader=true;
    this.prodService.becomeVendorRequest(this.vendorSignUpDetails,(res:any)=>{
      if(res.code==200){
        this.loader=false;
        this.vendorSignUpDetails={};
        this.closeOtherThanVendorRequest();
        this.showActiveForm['vendorRequestSent']=true;
      }
    })
  }

  closeOtherThanVendorRequest(){
    this.showActiveForm['becomeVendor']=this.showActiveForm['login']=this.showActiveForm['register']=false;
  }

  closeModal(){
    this.showModal=false;
    this.showActiveForm['becomeVendor']=this.showActiveForm['login']=this.showActiveForm['register']=this.showActiveForm['vendorRequestSent']=false;
  }

  toggleForm(){
    this.showActiveForm['register']=false;
    this.showActiveForm['login']=true;
  }

  receieveChildEvent(event:any){
    if(event.action == 'RegisterUser'){
      this.register(event.value);
    } else if(event.action == 'chooseProfileImg'){
      this.selectProfileImage(event.value);
    } else if(event.action == 'toggleForm'){
      this.toggleForm();
    }
  }

  productsByFilterCategory(catId:any){
      this.router.navigate(["/products"],{queryParams:{'category_id':catId,'user_id': this.loggedInUserDetails?.user_id ? this.loggedInUserDetails?.user_id.toString() : '0'}});
      this.prodService.emitOnValueChange({action:'filterByCategory',value:{'category_id':catId,'user_id': this.loggedInUserDetails?.user_id ? this.loggedInUserDetails?.user_id.toString() : '0'}});
  }

  productsByFilterSubCategory(subCatid:any,catId:any){
    this.router.navigate(["/products"],{queryParams:{'category_id':catId,'subCategory_id':subCatid,'user_id': this.loggedInUserDetails?.user_id ? this.loggedInUserDetails?.user_id.toString() : '0'}});
    this.prodService.emitOnValueChange({action:'filterBySubCategory',value:{'category_id':catId,'subCategory_id':subCatid,'user_id': this.loggedInUserDetails?.user_id ? this.loggedInUserDetails?.user_id.toString() : '0'}});
  }
  
}
