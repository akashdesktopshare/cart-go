import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PendingRequestRoutingModule } from './pending-request-routing.module';
import { PendingRequestComponent } from './pending-request.component';


@NgModule({
  declarations: [PendingRequestComponent],
  imports: [
    CommonModule,
    PendingRequestRoutingModule
  ],
  exports:[PendingRequestComponent]
})
export class PendingRequestModule { }
