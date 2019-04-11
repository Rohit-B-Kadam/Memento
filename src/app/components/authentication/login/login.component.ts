import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../../providers/Database/users.service';
import { User } from '../../../classes/user';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { routerNgProbeToken } from '@angular/router/src/router_module';
import { CurrentUserService } from '../../../providers/current-user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public userObj: User;
  public loginForm: FormGroup;
  public UserList: User[];

  constructor( private userCollection: UsersService,
                private router: Router,
                private _formBuilder: FormBuilder,
                private currentUserService : CurrentUserService) 
  {
    this.userCollection.findAll().then( 
      value => {
        console.log(value)
        this.UserList = value as User[];
      }
    )

    this.loginForm = this._formBuilder.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });

    
  }


  ngOnInit() {
  }

  username: string;
  password: string;

  login() : void 
  {
    let username = this.loginForm.value['username'];
    let password = this.loginForm.value['password'];
    let flag = false;
    this.UserList.forEach( (user) => {
      if(user.userName == username && user.password == password)
      {
        flag = true;
        
        // Fill info current user
        this.currentUserService.setCurrentUser(user)

        setTimeout( ()=>
        {
          this.router.navigate(['/timeline'])
        },2000
        );
      }
    })

    if(!flag)
    {
      alert("Password is incorrect")
    }

   
  }
}
