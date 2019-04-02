import { Component, OnInit } from '@angular/core';
import { FriendProfile } from '../../../classes/friend-profile';
import { group } from '@angular/animations';


@Component({
  selector: 'app-friend-list',
  templateUrl: './friend-list.component.html',
  styleUrls: ['./friend-list.component.scss']
})
export class FriendListComponent implements OnInit {

  friends: FriendProfile[];
  groups: string[];
  constructor() { }

  ngOnInit() {

    this.groups = ["Family","College Friend", "Friend"]

    this.friends=[
      {
        name:'Sonam Karale',
        group:['friends'],
        email:'sonam',
        profilePhoto: '../../../../assets/image/sonam.jpg'
      },
      {
        name:'Rohit Kadam',
        group:['friends'],
        email:'rohit',
        profilePhoto: '../../../../assets/image/sonam.jpg'
      },
      {
        name:'Sonam Karale',
        group:['friends'],
        email:'sonam',
        profilePhoto: '../../../../assets/image/sonam.jpg'
      },
      {
        name:'Sonam Karale',
        group:['friends'],
        email:'sonam',
        profilePhoto: '../../../../assets/image/sonam.jpg'
      },
      {
        name:'Sonam Karale',
        group:['friends'],
        email:'sonam',
        profilePhoto: '../../../../assets/image/sonam.jpg'
      },
      {
        name:'Sonam Karale',
        group:['friends'],
        email:'sonam',
        profilePhoto: '../../../../assets/image/sonam.jpg'
      },
      {
        name:'Sonam Karale',
        group:['friends'],
        email:'sonam',
        profilePhoto: '../../../../assets/image/sonam.jpg'
      },
      {
        name:'Sonam Karale',
        group:['friends'],
        email:'sonam',
        profilePhoto: '../../../../assets/image/sonam.jpg'
      },
      {
        name:'Sonam Karale',
        group:['friends'],
        email:'sonam',
        profilePhoto: '../../../../assets/image/sonam.jpg'
      },
    ]
  }

}
