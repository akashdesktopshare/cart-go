import { Component } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-sub-category',
  templateUrl: './sub-category.component.html',
  styleUrls: ['./sub-category.component.scss']
})
export class SubCategoryComponent {

  basePath:any="https://thetekkers.com/myShoppingSite/public/product_images/";

  subCatList:any=[];
  newCategoryObj:any={};
  showModal:boolean=false;
  isCatEdit:boolean=false;
  categoryList:any=[];
  loader:boolean=false;

  subCatImage:any;
  formData:any=new FormData();
  categoryId:number|any;
  activeCardContainer:any='sub-category';

  constructor(private service:AdminService,private route:ActivatedRoute){
    this.route.paramMap.subscribe((params: any) => {
      this.categoryId = params.get('code');
      this.getSubCatById(this.categoryId);
});

  }

  ngOnInit(){}

getSubCatById(id:any){
  
  this.loader=true;
  this.service.fetchSubCatById({'category_id':id},(res:any)=>{
    if(res.code == 200 ){
      this.loader=false;
      this.subCatList = res.data.categories[0].sub_category;
      console.log(res);
    } else{

    }
  })
}

addIcon(event:any){
  this.subCatImage = event.target.files[0];
  const reader:any = new FileReader();
  reader.readAsDataURL(this.subCatImage);

  reader.onload = (event:any) => { 
    this.newCategoryObj['imagePreview'] = event.target.result;
  }

  this.formData = new FormData();
  this.formData.append('image',this.subCatImage);
}

addNewCategory() {

  if (!this.isCatEdit) {
    this.formData.append('name',this.newCategoryObj['name']);
    this.formData.append('description',this.newCategoryObj['description']);
    this.formData.append('category_id',this.categoryId);
   

    this.service.addNewSubCategory(this.formData, (res: any) => {
      if (res.code == 200 ) {
        console.log(res);
        this.newCategoryObj = {};
        this.closeModal();
        this.getSubCatById(this.categoryId);
      } else if(res.code==201){
        alert(res.errors[0]);
        this.newCategoryObj = {};
        this.closeModal();
      }
    })

  } 
  console.log(this.subCatList);

}

closeModal(){
this.showModal=false;
this.isCatEdit=false;
}

editCategory(){
  this.formData.append('image',this.newCategoryObj['image']);
  this.formData.append('name',this.newCategoryObj.name);
  this.formData.append('description',this.newCategoryObj.description);
  this.formData.append('subCategory_id',this.newCategoryObj['id']);

  this.service.editSubCategory(this.formData, (res: any) => {
    if(res.code==200){
      console.log(res.message);
      this.newCategoryObj = {};
      this.closeModal();
      this.getSubCatById(this.categoryId);
    }
  })
  console.log(this.newCategoryObj);
  
}

openEditCategoryModal(categoryItem:any){

  this.newCategoryObj['image'] = categoryItem.image;
  this.newCategoryObj['name']= categoryItem.name;
  this.newCategoryObj['id'] = categoryItem.id;
  this.newCategoryObj['description'] = categoryItem.description;
  this.showModal=true;
  this.isCatEdit=true;
}

getAllCatList(){
  this.service.fetchAllCategory((res:any)=>{
    this.categoryList = res.data.categories;
    console.log(res);
  })
}


receieveChildEvent(event:any){
  if(event.action === 'openEditModal'){
    this.openEditCategoryModal(event.value);
  }
}

}
