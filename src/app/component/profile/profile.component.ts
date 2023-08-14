import { Component } from '@angular/core';
import { AppConstants } from '../constant/app.constants';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {

  baseImgPath:any = this.constant.user_base_path;
  userData:any=[];

  constructor(public constant:AppConstants){}

  ngOnInit(){
     let local:any = JSON.parse(<any>sessionStorage.getItem("loggedIn_user_data"));
     if(local){
      this.userData= local;
     }
  }

}
