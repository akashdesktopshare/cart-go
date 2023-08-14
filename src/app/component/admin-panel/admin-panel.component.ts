import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent {


  isAdminLoggedIn: boolean = false;
  errorMessage:any;
  loggedInUserDetails:any;
  baseImgPath:any="https://thetekkers.com/myShoppingSite/public/user_images/";

  credentials: any = {};
  loader:boolean=false;

  constructor(private _authService:AuthService,private router:Router) { }

  ngOnInit() {
    scrollTo(0,0);
    this.checkAdminLoggedIn();
    this.getAdminDataFromSession();
  }
  
    checkAdminLoggedIn() {
      this.isAdminLoggedIn = this._authService.isAdminLoggedIn();
    }

  getAdminDataFromSession() {
    let local: any = sessionStorage.getItem("adminDetails");
    local = JSON.parse(local);
    if (local) {
      this.loggedInUserDetails = local.user;
      this.navigateToDashboard();
    } else {
      this.router.navigate(['/admin/login'])
    }
  }

  navigateToDashboard() {
    if (this.router.url.endsWith("/login")) {
      this.router.navigate(["/admin/dashboard"]);
    } else {
      this.router.navigate([this.router.url]);
    }
  }

  login() {
    this.loader=true;
    this._authService.adminLogin(this.credentials,(res:any)=>{
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
    sessionStorage.setItem("adminDetails",JSON.stringify(res.data));
    sessionStorage.setItem("isAdminLoggedIn",JSON.stringify(true));
    sessionStorage.setItem("token",JSON.stringify(crypto.randomUUID()));
  }

  logout() {
    sessionStorage.clear();
    location.href = "/"
  }
}