import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomePageRoutingModule } from './home-page-routing.module';
import { HomePageComponent } from './home-page.component';
import { ReverseListPipe } from 'src/app/pipes/reverse-list.pipe';


@NgModule({
  declarations: [HomePageComponent,ReverseListPipe],
  imports: [
    CommonModule,
    HomePageRoutingModule,
    
  ],
  exports:[HomePageComponent]
})
export class HomePageModule { }
