import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UsersService } from '../../../../../providers/Database/users.service';
import { User } from '../../../../../classes/user';
import { CurrentUserService } from '../../../../../providers/current-user.service';



@Component({
  selector: 'app-password-checking',
  templateUrl: './password-checking.component.html',
  styleUrls: ['./password-checking.component.scss']
})
export class PasswordCheckingComponent {

  public password:string;
  public displayError:string;
  public userInfo:User;

  constructor(
    public dialogRef: MatDialogRef<PasswordCheckingComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _userCollection: UsersService,
    private _currentUser: CurrentUserService
   ) 
   {
      this.displayError = "";
      this.password = "";
      this._userCollection.find(_currentUser.UserInfo._id).then((values: any)=>
      {
          this.userInfo = values[0];
          console.log(this.userInfo)
      })
   }

  onNoClick(): void {
    this.dialogRef.close("unSuccessful");
  }

  public verify()
  { 
    if(this.password.length == 0)
    {
      this.displayError = "Required";
      return
    }

    if(this.password != this.userInfo.password)
    {
      this.displayError = "Password is wrong";
      return
    }

      this.dialogRef.close("Successful")
  }
}

