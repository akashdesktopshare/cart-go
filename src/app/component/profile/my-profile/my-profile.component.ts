import { AuthService } from 'src/app/services/auth.service';
import { AppConstants } from './../../constant/app.constants';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss']
})
export class MyProfileComponent {

  isEditable:boolean=true;
  baseImgPath:any = this.AppConstants.user_base_path;
  userData:any;
  editProfileModal:any;

  constructor(public AppConstants:AppConstants,private _service:AuthService,private fb:FormBuilder) {
    this.configModal();
  }

  ngOnInit(){
    let localData :any = JSON.parse(<any>sessionStorage.getItem("loggedIn_user_data"));
    if(localData){
      this.userData = localData;
      this.setData(this.userData.user);
    }
  }

  configModal(){
    this.editProfileModal = this.fb.group({
        'role_id':['',Validators.required],
        'first_name':['',Validators.required],
        'last_name':['',Validators.required],
        'email':[,Validators.required,],
        'password':['',Validators.required],
        'mobile':['',Validators.required],
        'country_code':['',Validators.required],
        'gender':['',Validators.required],
        'age':['',Validators.required],
        'address':['',Validators.required],
        'city':['',Validators.required],
        'state':['',Validators.required],
        'country':['',Validators.required],
        'postal_code':['',Validators.required],
        'image':['',Validators.required],
    })
  }

  setData(userData:any){
    for (let k in this.editProfileModal.value)
    {
      this.editProfileModal.controls[k].setValue(userData[k]);
      if(k === "mobile" || k === "email"){
        this.editProfileModal.controls[k].disable();
      }
    } 

     console.log(this.editProfileModal.controls);
  }

  editProfile() {
        this.isEditable = !this.isEditable;
  }

  saveProfile(){
    console.log(this.userData);
    
  }
}
