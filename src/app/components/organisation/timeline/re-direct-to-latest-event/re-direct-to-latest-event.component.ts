import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { CurrentUserService } from '../../../../providers/current-user.service';
import { EventsService } from '../../../../providers/Database/events.service';
import { EventInfo } from '../../../../classes/event-info';

@Component({
  selector: 'app-re-direct-to-latest-event',
  template: ''
})
export class ReDirectToLatestEventComponent implements OnInit {

  constructor(private router: Router,
              private _currentUser: CurrentUserService,
              private _eventCollection: EventsService) 
  {
    // TODO: Making it dynamic
    
    _eventCollection.find(_currentUser.UserInfo._id).then( (values)=>{
      
      let eventList = values as EventInfo[];
      let unhideEvent = eventList.filter( (value)=>{
        return !value.isHidden
      })


      if(unhideEvent.length == 0)
      {
        this.router.navigate(['/timeline/create-event']);
        return;  
      }
      this.router.navigate(['/timeline', unhideEvent[0]._id]);

    })
    
  }

  ngOnInit() {
  }

}
