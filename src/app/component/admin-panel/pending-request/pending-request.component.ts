import { Component } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-pending-request',
  templateUrl: './pending-request.component.html',
  styleUrls: ['./pending-request.component.scss']
})
export class PendingRequestComponent {

  loader:boolean=false;
  vendorRequestList:any=[];
  constructor(private adminService:AdminService){}

  ngOnInit(){
    this.getVendorReqList();
  }

  getVendorReqList(){
    this.loader=true;
    this.adminService.fetchVendorReqList((res:any)=>{
      if(res.code==200 && res.data){
        this.loader=false;
        this.vendorRequestList = res.data;
        console.log(this.vendorRequestList);
      }
    })
  }

  acceptRequest(id:any,status:any){

  }

}
