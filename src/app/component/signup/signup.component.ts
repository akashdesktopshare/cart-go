import { Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class SignupComponent {

  signUpModal:any;
  @Output() emitToParent:any = new EventEmitter();

  constructor(private fb:FormBuilder){
    this.signUpModal = this.fb.group(
      {
        'role_id':['',Validators.required],
        'first_name':['',Validators.required],
        'last_name':['',Validators.required],
        'email':['',Validators.required],
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
      }
    )
  }

  register(){
    this.emitToParent.emit({'action':'RegisterUser',value:this.signUpModal});
  }
  
  selectProfileImage(event:any){
    this.emitToParent.emit({'action':'chooseProfileImg',value:event});
  }

  toggleForm(){
    this.emitToParent.emit({action:'toggleForm'});
  }

}
