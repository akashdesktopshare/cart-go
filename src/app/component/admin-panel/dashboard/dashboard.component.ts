import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  isAdminLogged:boolean=false;
  isVendorLogged:boolean=false;

  constructor(private authService:AuthService){
  }

  ngOnInit(){
    this.scrollTop();
    this.checkIsAdmin();
    this.checkIsVendor();
    
  }

  checkIsAdmin(){
    this.isAdminLogged = this.authService.isAdminLoggedIn();
  }
  
  checkIsVendor(){
    this.isVendorLogged = this.authService.isVendorLoggedIn();
  }

  scrollTop(){
    setTimeout(() => {
      scrollTo(0,0);
    }, 0);
  }
}
