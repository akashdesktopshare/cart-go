import { Component } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent {


  userList:any=[];
  basePath:any='https://thetekkers.com/myShoppingSite/public/user_images/'
  loader:boolean=false;
  toggleEditDropdown:boolean=false;

  constructor(private _adminService:AdminService){}

  ngOnInit(){
    this.fetchUserList();
  }

  fetchUserList(){
    this.loader=true;
    this._adminService.fetchUserList((res:any)=>{
      if(res){
        this.loader=false;
        this.userList = res.data.user;
        console.log(res);
      }
    })
  }

  toggleDropdown(idx:any){
    this.userList.forEach((ele:any,index:any)=>{
      if(idx == index){
        ele['showDropDown']=!ele['showDropDown']
      }else{
        ele['showDropDown']=false;
      }
    })
  }
}
