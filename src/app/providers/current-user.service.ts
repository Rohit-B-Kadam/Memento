import { Injectable } from '@angular/core';
import { User } from '../classes/user';
import { FriendProfile } from '../classes/friend-profile';
import { EventInfo } from '../classes/event-info';
import { EventsService } from './Database/events.service';
import { FriendsService } from './Database/friends.service';
import { CatergoryCollectionService } from './Database/catergory-collection.service';
import { Category } from '../classes/category';
import { UsersService } from './Database/users.service';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {

  public UserInfo: User;
  public FriendList: FriendProfile[];
  public Categories: Category[];
  public EventList: EventInfo[];

  public userNameSubject= new BehaviorSubject<string>("NotLogin");
  public isLoginSubject = new BehaviorSubject<boolean>(false);


  constructor(
    public eventCollection : EventsService,
    public friendCollection : FriendsService,
    public categoriesCollection: CatergoryCollectionService,
    public userCollection: UsersService) 
  {

    this.UserInfo = {
          userName: "Rohit Kadam", 
          password: "kadam", 
          email: "14rohitkadam@gmail.com", 
          profileURL: "/home/rohit/Desktop/Momento-Events/.metadata/profile_pic/14rohitkadam@gmail.com.jpg", 
          _id: "cSM9QFF8kSFKXVVR"}
        
    //this.setCurrentUser(this.UserInfo);
  }

  public setCurrentUser(user: User)
  {
    this.UserInfo = user;
    console.log(this.UserInfo)

    this.setUserName(this.UserInfo.userName)
    this.setLogin(true)

    this.eventCollection.find(this.UserInfo._id).then((values) =>
    {
      this.EventList = values as EventInfo[];
      console.log(this.EventList)
    })

    this.friendCollection.find(this.UserInfo._id).then((values) =>
    {
      this.FriendList = values as FriendProfile[];
      console.log(this.FriendList)
    })

    this.categoriesCollection.find(this.UserInfo._id).then((values) =>
    {
      this.Categories = values as Category[];
      console.log(this.Categories)
    })

  }

  public refreshCurrentUser()
  {
    this.setCurrentUser(this.UserInfo);
  }

  public setUserName(value:string)
  {
    this.userNameSubject.next(value)
  }

  public getUserName(): Observable<string>
  {
    return this.userNameSubject.asObservable();
  }


  public setLogin(value:boolean)
  {
    this.isLoginSubject.next(value)
  }

  public getLoginStatus(): Observable<boolean>
  {
    return this.isLoginSubject.asObservable();
  }
}
