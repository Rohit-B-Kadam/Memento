import { Component, OnInit } from '@angular/core';
import { FriendProfile } from '../../../classes/friend-profile';
import { group } from '@angular/animations';
import { FriendsService } from '../../../providers/Database/friends.service';
import { CurrentUserService } from '../../../providers/current-user.service';


@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.scss']
})
export class FriendListComponent implements OnInit {

  friends: FriendProfile[];
  groups: string[];
  
  constructor( private _friendCollection: FriendsService,
                private _currentUser: CurrentUserService) 
  {
    _friendCollection.find(this._currentUser.UserInfo._id).then( (value : FriendProfile[])=>
    {
        this.friends = value;
        console.log(this.friends)
    })

  }

  ngOnInit() {

    this.groups = ["Family","College Friend", "Friend"]
    
  }

  public DeleteFriend(index)
  {
    //console.log(index)
    this._friendCollection.remove(this.friends[index]._id)
        .then( () => {console.log("User is delete")})

    this.friends.splice(index,1);
  }
}
