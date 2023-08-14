import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl:any="https://thetekkers.com/myShoppingSite/api/user/"

  httpUrls:any={
    'login':"signInWithEmail",
    'signup':'signUp',
    'adminLogin':'adminSignIn',
  }

  constructor(private http:HttpClient) { }

  isAdminLoggedIn(){
    return !!sessionStorage.getItem("token");
  }

  isUserLoggedIn(){
    return !!sessionStorage.getItem("token")
  }

  isVendorLoggedIn(){
    return !!sessionStorage.getItem("vendorToken");
  }
  
  vendorLogin(credentials:any,callback:any){
    return this.http.post(this.baseUrl+this.httpUrls['login'],credentials).subscribe((data:any)=>callback(<any>data));
  }

  login(credentials:any,callback:any){
    return this.http.post(this.baseUrl+this.httpUrls['login'],credentials).subscribe((data:any)=>callback(<any>data));
  }

  adminLogin(credentials:any,callback:any){
    return this.http.post(this.baseUrl+this.httpUrls['adminLogin'],credentials).subscribe((data:any)=>callback(<any>data));
  }

  signUp(userData:any,callback:any){
    return this.http.post(this.baseUrl+this.httpUrls['signup'],userData).subscribe((data:any)=>callback(<any>data));
  }

}
