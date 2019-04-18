import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrentUserService } from '../../../providers/current-user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {

  @Output() toggleSidenav = new EventEmitter<void>();

  public Title = "notSet";
  public UserName:string;
  public isLogin: boolean;
  
  constructor(private route: ActivatedRoute, private router: Router,
              private _currentuser: CurrentUserService) {
    
    // Showing title
    this.router.events.subscribe(( event) => {
      //this.Title = this.router.url;
      let url:string = this.router.url;
      this.Title = url.split('/')[1];
      this.Title = this.Title.replace("-"," ");
      this.Title = this.Title.toUpperCase();
    })


    this._currentuser.getUserName().subscribe( message => this.UserName = message)
    this._currentuser.getLoginStatus().subscribe(message => this.isLogin = message)
   }

  ngOnInit() {
  }

}
