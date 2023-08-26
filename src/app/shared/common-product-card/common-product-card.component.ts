import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'common-product-card',
  templateUrl: './common-product-card.component.html',
  styleUrls: ['./common-product-card.component.scss']
})
export class CommonProductCardComponent {

  @Input() inputConfig:any;
  @Output() emitToParent:any = new EventEmitter();
  loader:boolean=false;
  @Input() activeCardContainer:any;
  productConfig:any;
  showProductDetailModal:boolean=false;

  constructor(private adminService:AdminService){}

  ngOnChanges() {
    if(this.inputConfig.data){
      this.removeBracketsFromImgName(this.inputConfig.data);
    }
    
}

  removeBracketsFromImgName(data:any){
      data.forEach((item:any)=>{
        if(item.image.includes("{")){
          item.image = item.image.replace( /[{}]/g, '' );
        } else if(item.image.includes("[")){
          item.image = item.image.replace(/[\[\]']+/g,'');
          // item.image = item.image.split(",")[0];
        }else{
          item.image = item.image.split(",");  
        }
      })
  }

  navigateSubCat(id:any){
    this.emitToParent.emit({'action':'NavigateToSub','value':id})
  }

    navigateToEditProduct(catItem:any){
    this.emitToParent.emit({'action':'editProduct','value':catItem})
  }

    openEditCategoryModal(catItem:any){
    this.emitToParent.emit({'action':'editProduct','value':catItem})
  }
  
  changeProductStatus(item:any,currentStatus:any){
    this.emitToParent.emit({'action':'changeProductStatus','value':{'item':item,'currentStatus':currentStatus}})
  }

  updateHotCatStatus(itemId:any,currentStatus:any){
    this.emitToParent.emit({'action':'changeHotCatStatus','value':{'itemId':itemId,'currentStatus':currentStatus}})
  }

  scrollTop(){
    this.adminService.scrollTop();
  }

  showProductDetail(item:any,baseImgPath:any,type:any){
    this.productConfig = {'item':item,'baseImgPath':baseImgPath,'type':type};
    this.showProductDetailModal=true;
  }

  receiveChildEvent(event:any){
    if(event.action === 'closeModal'){
      this.showProductDetailModal=false;
    }
  }

  removeCatFromHot(item:any){
    this.emitToParent.emit({action:'removeCatFromHot',value:item});
  }
}
