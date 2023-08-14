import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { AppConstants } from '../../constant/app.constants';

interface model{
  'image':File,
  'name':String,
  'description':String
}

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})

export class CategoryComponent {

allCategory:any=[];
newCategoryObj:any={};
showModal:boolean=false;
isCatEdit:boolean=false;
loader:boolean=false;
basePath:any= this.appConstant.product_base_path;
file:any;
formData:any=new FormData();
activeCardContainer:any = 'category';


constructor(private service:AdminService,private router:Router,public appConstant:AppConstants){}

 ngOnInit() {
  this.getCategory();
 
  }

  getCategory(){
    this.loader=true;
    this.service.fetchAllCategory((res:any)=>{
      if(res.code==200){
        this.loader=false;
        this.allCategory=res.data;
        console.log(res);
      }
    })
  }


addIcon(event:any){
    this.newCategoryObj['image'] = event.target.files[0];
    const reader:any = new FileReader();
    reader.readAsDataURL(this.newCategoryObj['image']);

    reader.onload = (event:any) => { 
      this.newCategoryObj['imagePreview'] = event.target.result;
    }

    this.formData = new FormData();
    this.formData.append('image',this.newCategoryObj['image']);
    
    
}

  addNewCategory() {
      this.formData.append('name',this.newCategoryObj.name);
      this.formData.append('description',this.newCategoryObj.description);
      
      
      this.service.addNewCategory(this.formData, (res: any) => {
        if(res.code==200){
          console.log(res.message);
          this.getCategory();
          this.newCategoryObj = {};
          this.closeModal();
        }
      })
  }

  editCategory(){
    this.formData.append('name',this.newCategoryObj.name);
    this.formData.append('description',this.newCategoryObj.description);
    this.formData.append('category_id',this.newCategoryObj.id);
    this.formData.append('image',this.newCategoryObj['image']);

    this.service.editCategory(this.formData, (res: any) => {
      if(res.code==200){
        console.log(res.message);
        this.getCategory();
        this.newCategoryObj = {};
        this.closeModal();
      }
    })
    console.log(this.newCategoryObj);
    
  }


closeModal(){
  this.showModal=false;
  this.newCategoryObj={};
}

openEditCategoryModal(categoryItem:any){
  console.log(categoryItem);
  
    this.newCategoryObj['image'] = categoryItem.image;
    this.newCategoryObj['name']= categoryItem.name;
    this.newCategoryObj['id'] = categoryItem.id;
    this.newCategoryObj['description'] = categoryItem.description;
    this.showModal=true;
    this.isCatEdit=true;
}

navigateSubCat(id:any){
  this.router.navigate(['admin/sub-category',id]);
}

scrollTop(){
  this.service.scrollTop();
}

receieveChildEvent(event:any){
  console.log(event);
  if(event.action == 'NavigateToSub'){
    this.navigateSubCat(event.value);
  } else if(event.action == 'openEditModal'){
    this.openEditCategoryModal(event.value);
  }
  
}

}




