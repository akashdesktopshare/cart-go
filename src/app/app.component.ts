import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ShoppingWebsite';
  isAdmin:boolean=false;
  isVendor:boolean=false;
  constructor(){
   
  }

  ngOnInit(){
   this.isAdmin = window.location.pathname.includes("/admin");
   this.isVendor = window.location.pathname.includes("vendor-panel");
  }

}
