import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VendorPanelRoutingModule } from './vendor-panel-routing.module';
import { VendorPanelComponent } from './vendor-panel.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [VendorPanelComponent],
  imports: [
    CommonModule,
    VendorPanelRoutingModule,
    FormsModule
  ],
  exports:[VendorPanelComponent]
})
export class VendorPanelModule { }
