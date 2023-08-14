import { Component } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-hot-category',
  templateUrl: './hot-category.component.html',
  styleUrls: ['./hot-category.component.scss']
})
export class HotCategoryComponent {

  loader:boolean=false;
  showModal:boolean=false;
  hotCategoryList:any=[];
  basePath:any="https://thetekkers.com/myShoppingSite/public/product_images/";
  newCategoryObj:any={}
  isCatEdit:boolean=false;
  allCategories:any=[];
  isLimitReached:boolean=false;
  errorMessage:any='';

  changeStatus:boolean=false;
  activeCardContainer:any='hot-category';

  constructor(private _adminService:AdminService){}

  ngOnInit() {
    this.getCategory();
    }
  
    getCategory(){
      this.loader=true;
      this._adminService.fetchHotCategoryList((res:any)=>{
        if(res.code==200){
          this.loader=false;
          this.hotCategoryList=res.data;
          console.log(res);
        }
      })
    }

    updateStatus(id:any,isActive:any){

    }

    addCategoryToHotList(){
        let params: any = {
          'category_id': this.newCategoryObj['category_id'],
          'status': this.newCategoryObj['status']
        }
        this._adminService.updateHotCategory(params, (res: any) => {
          if (res.code == 200) {
            this.changeStatus = false;
            this.closeModal();
            this.getCategory();
          }
        })

    }

    closeModal(){
      this.showModal=false;
    }

    isHotListLimitReached(){
      this.isLimitReached = this.hotCategoryList.categories.length >= 5 ? true : false;
      this.isLimitReached ?  this.errorMessage = 'You Can Only Add Upto 5 Categories.' :  this.errorMessage = '';
      this.getAllCategoryList();
    }
  
    getAllCategoryList(){
        this._adminService.fetchAllCategory((res:any)=>{
          if(res.code==200){
            this.allCategories = res.data.categories;
          }
        })
    }

    selectCategory(event:any){

      let catIdAndStatus = event.target.value.split("|");
      this.newCategoryObj['category_id'] = catIdAndStatus[0];
      this.newCategoryObj['status'] = catIdAndStatus[1] == '1' ? '0' : '1';

      catIdAndStatus[1] == '1' ? this.changeStatus = true :    this.changeStatus = false;
    }

    removeCatFromHot(item:any){
      let params: any = {
        'category_id': item.id.toString(),
        'status': "0"
      }
      this._adminService.updateHotCategory(params, (res: any) => {
        if (res.code == 200) {
          this.changeStatus = false;
          this.closeModal();
          this.getCategory();
        }
      })
    }

    receieveChildEvent(event:any){
      if(event.action == 'changeHotCatStatus'){
        this.updateStatus(event.value.itemId,event.value.currentStatus);
      } else if(event.action === 'removeCatFromHot'){
        this.removeCatFromHot(event.value);
      }
    }

}
