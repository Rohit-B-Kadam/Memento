import { Injectable } from '@angular/core';
import { User } from '../classes/user';
import { FriendProfile } from '../classes/friend-profile';
import { EventInfo } from '../classes/event-info';
import { EventsService } from './Database/events.service';
import { FriendsService } from './Database/friends.service';
import { CatergoryCollectionService } from './Database/catergory-collection.service';
import { Category } from '../classes/category';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {

  public UserInfo: User;
  public FriendList: FriendProfile[];
  public Categories: Category[];
  public EventList: EventInfo[];

  constructor(
    public eventCollection : EventsService,
    public friendCollection : FriendsService,
    public categoriesCollection: CatergoryCollectionService
  ) 
  {

  }

  public setCurrentUser(user: User)
  {
    this.UserInfo = user;
    console.log(this.UserInfo)
    
    this.eventCollection.findAll().then((values) =>
    {
      this.EventList = values as EventInfo[];
      console.log(this.EventList)
    })

    this.friendCollection.findAll().then((values) =>
    {
      this.FriendList = values as FriendProfile[];
      console.log(this.FriendList)
    })

    this.categoriesCollection.findAll().then((values) =>
    {
      this.Categories = values as Category[];
      console.log(this.Categories)
    })

  }
}
