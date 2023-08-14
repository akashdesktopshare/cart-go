import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorsRoutingModule } from './vendors-routing.module';
import { VendorsComponent } from './vendors.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [VendorsComponent],
  imports: [
    CommonModule,
    VendorsRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[VendorsComponent]
})
export class VendorsModule { }
