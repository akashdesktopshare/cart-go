import { Injectable } from '@angular/core';


@Injectable({
    providedIn: 'root'
})
export class AppConstants {

    public user_id:any;
    public logged_user_data:any;
    public user_base_path :any = "https://thetekkers.com/myShoppingSite/public/user_images/";
    public product_base_path:any="https://thetekkers.com/myShoppingSite/public/product_images/";
    public id_proof_base_path: any="https://thetekkers.com/myShoppingSite/public/id_proof/";
    public lic_photo_base_path: any="https://thetekkers.com/myShoppingSite/public/lic_photo/";

    constructor(){}
    
    ngOnInit(){
        this.logged_user_data = JSON.parse(<any>sessionStorage.getItem("loggedIn_user_data"));
        this.user_id = this.logged_user_data.user.user_id;
        console.log(this.user_id);
    }
   
}

