import { Component } from '@angular/core';
import { CurrentUserService } from '../../../providers/current-user.service';

@Component({
  selector: 'sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent 
{

  isLogin: boolean;

  constructor( private _currentUser: CurrentUserService) 
  {
      this._currentUser.getLoginStatus().subscribe(msg => this.isLogin = msg)
  }

}
