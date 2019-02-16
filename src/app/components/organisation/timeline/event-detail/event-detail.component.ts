import { Component, OnInit } from '@angular/core';
import { EventInfo } from '../../../../classes/event-info';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit 
{
  
  public eventInfo:EventInfo;
  public months;
  constructor() 
  { 
    this.eventInfo = new EventInfo("Visapur Fort","Treking with full Mcs class friend"
                                    ,"Lohagad, pune",
                                    new Date(2019,1,21),["friends","trekking"] ,["fort","trekking"],["Sonam","Sanket","chandan"]);  
    
  this.months = [
    'January', 'February', 'March', 'April', 'May',
    'June', 'July', 'August', 'September',
    'October', 'November', 'December'
    ];

  }

  ngOnInit() 
  {

  }

}
