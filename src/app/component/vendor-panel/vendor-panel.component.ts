import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-vendor-panel',
  templateUrl: './vendor-panel.component.html',
  styleUrls: ['./vendor-panel.component.scss']
})
export class VendorPanelComponent {

  isVendorLoggedIn: boolean = false;
  errorMessage:any;
  loggedInUserDetails:any;

  credentials: any = {};
  loader:boolean=false;
  baseImgPath:any="https://thetekkers.com/myShoppingSite/public/user_images/";

  constructor(private _authService:AuthService,private router:Router){}

  ngOnInit(){
    this.checkAdminLoggedIn();
    this.getAdminDataFromSession();
  }

  checkAdminLoggedIn() {
    this.isVendorLoggedIn = this._authService.isVendorLoggedIn();
  }

getAdminDataFromSession() {
  let local: any = sessionStorage.getItem("vendorDetails");
  local = JSON.parse(local);
  if (local) {
    this.loggedInUserDetails = local.user;
    this.navigateToDashboard();
  } else {
    this.router.navigate(['/vendor-panel/login'])
  }
}

navigateToDashboard() {
  if (this.router.url.endsWith("/login")) {
    this.router.navigate(["/vendor-panel/dashboard"]);
  } else {
    this.router.navigate([this.router.url]);
  }
}


  login() {
    this.loader=true;
    this._authService.vendorLogin(this.credentials,(res:any)=>{
      if(res.code==200 && res.data){
        this.loader=false;
        this.setLoginSession(res);
        location.reload();
      } else if(res.code == 200 && res.status == 'failure'){
          this.errorMessage = res.message;
          this.loader=false;
      }
    })
  }

  setLoginSession(res:any){
    sessionStorage.setItem("vendorDetails",JSON.stringify(res.data));
    sessionStorage.setItem("isVendorLoggedIn",JSON.stringify(true));
    sessionStorage.setItem("vendorToken",JSON.stringify(crypto.randomUUID()));
  }

  logout() {
    sessionStorage.clear();
    location.href = "/"
  }

}
