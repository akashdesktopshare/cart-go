import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminPanelRoutingModule } from './admin-panel-routing.module';
import { AdminPanelComponent } from './admin-panel.component';
import { AdminService } from 'src/app/services/admin.service';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [AdminPanelComponent],
  imports: [
    CommonModule,
    AdminPanelRoutingModule,
    FormsModule,
    
  ],
  exports:[AdminPanelComponent],
  providers:[AdminService]
})
export class AdminPanelModule { }
