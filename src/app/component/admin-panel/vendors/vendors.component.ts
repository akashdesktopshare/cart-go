import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-vendors',
  templateUrl: './vendors.component.html',
  styleUrls: ['./vendors.component.scss']
})
export class VendorsComponent {

  showModal:any={};
  newVendorDetails:any;
  vendorList:any=[];
  profileUrl:any='https://thetekkers.com/myShoppingSite/public/user_images/';
  loader:boolean=false;
  vendorRequestList:any=[];

  constructor(private fb:FormBuilder,private adminService:AdminService){
    this.newVendorDetails= this.fb.group({
      'name':['',Validators.required],
      'email':['',Validators.required],
      'contactNumber':['',Validators.required],
      'refContactNumberOne':[''],
      'refContactNumberTwo':[''],
      'address':['',Validators.required],
      'aadhaarImage':['',Validators.required],
      'panCardImage':['',Validators.required],
      'bankName':['',Validators.required],
      'ifscCode':['',Validators.required],
      'accountNumber':['',Validators.required],
      'beneficiaryName':['',Validators.required],
      'password':['',Validators.required],
      'logoImg':['',Validators.required],
      'brandImg':['',Validators.required],
      'profileImg':['',Validators.required]
    })
  }

  ngOnInit(){
    this.fetchVendorList();
  }

  fetchVendorList(){
    this.loader=true;
    this.adminService.fetchVendorList((res:any)=>{
      if(res){
        this.loader=false;
        this.vendorList = res.data;
        console.log(res.data);
      }
    })
  }

  uploadProfileImg(event:any){

    let file :any = event.target.files[0];
    let reader:any = URL.createObjectURL(file);
    this.newVendorDetails.controls.profileImg.setValue(reader);
  }

  addNewVendor(){
    this.newVendorDetails.value['id'] = this.vendorList[this.vendorList.length-1].id + 1;
    this.newVendorDetails.value['status'] = true;
    
    this.adminService.addNewVendor(this.newVendorDetails.value,(res:any)=>{
      console.log(this.newVendorDetails.value);
      this.showModal=false;
      
    })
  }

  updateStatus(userId:any,currentStatus:any){
    let params:any= {
      "user_id" : JSON.stringify(userId),
      "status"  : currentStatus == '1' ? '0' : '1'
    };

    this.adminService.updateVendorStatus(params,(res:any)=>{
      if(res){
          this.fetchVendorList();
      }
    })
  }



  toggleDropdown(idx:any){
    this.vendorList.user.forEach((ele:any,index:any)=>{
      if(idx == index){
        ele['showDropDown']=!ele['showDropDown']
      }else{
        ele['showDropDown']=false;
      }
    })
  }

  
}
