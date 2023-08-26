import { Component, EventEmitter, Output, ViewEncapsulation } from '@angular/core';
import { AppConstants } from 'src/app/component/constant/app.constants';
import { VendorService } from 'src/app/services/vendor.service';

@Component({
  selector: 'app-attach-file',
  templateUrl: './attach-file.component.html',
  styleUrls: ['./attach-file.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class AttachFileComponent {

  showModal:boolean=false;
  selectedFiles:any=[];
  totalFile:number=0;
  loader:boolean=false;
  formData:any = new FormData();
  errorMessage:any;
  @Output() emitToParent:any= new EventEmitter();
  uploadedImgNames:any=[];

  constructor(public constant:AppConstants,private vendorService:VendorService){}

  closeModal() {
    this.emitToParent.emit({'action':'closeModal'});
    // this.totalFile = this.selectedFiles.length;
  }

  onFileChange(event: any) {
    this.formData = new FormData();
    for (let i = 0; i < event.target.files.length; i++) {
      let params:any = {
        'image':event.target.files[i]
      }
      this.selectedFiles.push(params);
    }
  }

  removeItem(image:any) {
    const index = this.selectedFiles.findIndex((e:any)=>e.image == image);
    if (index !== -1) {
      this.selectedFiles.splice(index, 1);
      this.totalFile = this.selectedFiles.length;
    }
  }

  uploadImgToGetName() {
        this.loader=true;
        this.loopThroughData(this.selectedFiles,0)
  }
  

  loopThroughData(dataArray: any[], currentIndex: number) {
    if (currentIndex >= dataArray.length) {
      this.emitToParent.emit({'action':'uploadedImgName',value:this.uploadedImgNames});
      this.closeModal();
      this.loader=false;
      return;
    }
    const currentData = dataArray[currentIndex];
    let formData: any = new FormData();
    formData.append("image", currentData.image);
    this.vendorService.fetchImageUrl(formData,(res:any)=>{
      if(res.code == 200){
        this.uploadedImgNames.push(res.data);
        this.loopThroughData(dataArray, currentIndex + 1);
      }else{
        this.errorMessage = res.message;
      }
    })
     
  }

}
