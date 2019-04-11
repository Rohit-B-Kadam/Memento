import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { EventsService } from '../../../../providers/Database/events.service';
import { EventInfo } from '../../../../classes/event-info';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-event',
  templateUrl: './search-event.component.html',
  styleUrls: ['./search-event.component.scss']
})
export class SearchEventComponent implements OnInit {

  myControl = new FormControl();
  filteredOptions: Observable<string[]>;
  eventList :string[];
  eventId :string[];

  constructor(private eventCollection: EventsService,
              private router: Router) 
  { 
    this.eventList = [];
    this.eventId = []
    // getting data from database
    this.eventCollection.findAll().then( (events : EventInfo[])=> 
    {
        events.forEach( (item) => {
          this.eventList.push(item.title)
          this.eventId.push(item._id)
        })
        this.autoComplete();
    })
    .catch((err)=>{
      console.log("Error: "+err);
    });

  }

  ngOnInit() {
    
  
  }

  public autoComplete()
  {
    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    
  }

  private _filter(value: string): string[] 
  {
    const filterValue = value.toLowerCase();
    let list= this.eventList.filter(option => option.toLowerCase().includes(filterValue));
    return list.sort();
  }

  public SearchTheEvent()
  {
    let searchValue = this.myControl.value;
    console.log(searchValue)
    let ret = this.eventList.indexOf(searchValue)

    if(ret == -1)
    {
      console.log("NotFound")
      return;
    }

    this.router.navigate(['/timeline', this.eventId[ret]]);

  }
}
