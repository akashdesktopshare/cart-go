import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {


  constructor(private router:Router,private auth:AuthService){}

  ngOnInit(){
    console.log(122);
    
    if(this.auth.isAdminLoggedIn()){
      this.router.navigate(['/admin/dashboard'])
    } else if(this.auth.isVendorLoggedIn()){
      this.router.navigate(['/vendor-panel/dashboard'])
    } else{
      this.router.navigate(['/'])
    }
  }
}
