import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent {

      constructor(private router:Router){}

  
      backToPage(){
        let url:any = this.router.url;
        url = url.split("/");
        console.log(url);
        if(url[1] === "vendor-panel"){
          this.router.navigate([url[1]]);
        }else if(url[1] === "admin"){
          this.router.navigate([url[1]]);
        }else{
          window.location.href="/";
        }
        
        
        

      }  
}