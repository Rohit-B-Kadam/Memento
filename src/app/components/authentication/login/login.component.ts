import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../providers/Database/users.service';
import { User } from '../../../classes/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public userObj: User;

  constructor( private userCollection: UsersService) 
  {
      this.userObj = new User("rohit","kadam","rk@gmail.com");
      userCollection.insert(this.userObj).then( ()=> {
        userCollection.findAll().then( (value)=> {
          console.log("List of user are ");
          console.log(value);
        })
        .catch((err)=>{
          console.log("Error: "+err);
        });

      })
    
  }

  ngOnInit() {
  }

}
