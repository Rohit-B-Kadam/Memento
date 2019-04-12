import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CatergoryCollectionService } from '../../../../../providers/Database/catergory-collection.service';
import { Category } from '../../../../../classes/category';
import { CurrentUserService } from '../../../../../providers/current-user.service';

@Component({
  selector: 'app-add-category-dialog',
  templateUrl: './add-category-dialog.component.html',
  styleUrls: ['./add-category-dialog.component.scss']
})
export class AddCategoryDialogComponent {

  public newCategory:string;
  public displayError:string;
  public categoryList: Category[];

  constructor(
    public dialogRef: MatDialogRef<AddCategoryDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _categoryCollection: CatergoryCollectionService,
    private _currentUser: CurrentUserService
   ) 
   {
      this.displayError = "";
      this.newCategory = "";

      _categoryCollection.find(this._currentUser.UserInfo._id).then((values)=>
      {
        this.categoryList = values as Category[];
        console.log(this.categoryList)
      })
   }

  onNoClick(): void {
    this.dialogRef.close("unSuccessful");
  }

  public Add()
  { 

    if(this.newCategory.length == 0)
    {
      this.displayError = "Required";
      return
    }

    let flag = false;
    
    this.categoryList.forEach( (item) => {
      if(item.value == this.newCategory)
      {
        flag = true;
      }
    })
    
    if(flag)
    {
      this.displayError = "Category already present";
    }
    else
    {

      let newItem = new Category(this.newCategory,this._currentUser.UserInfo._id)
      console.log(newItem)
      this._categoryCollection.insert(newItem)
      this._currentUser.refreshCurrentUser();
      this.dialogRef.close("Successful")
    }
  }

}
