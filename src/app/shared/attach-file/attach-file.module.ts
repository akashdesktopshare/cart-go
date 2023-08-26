import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AttachFileRoutingModule } from './attach-file-routing.module';
import { AttachFileComponent } from './attach-file.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [AttachFileComponent],
  imports: [
    CommonModule,
    AttachFileRoutingModule,
    FormsModule
  ],
  exports:[AttachFileComponent]
})
export class AttachFileModule { }
