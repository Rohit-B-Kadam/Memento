import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventsService } from '../../../../providers/Database/events.service';
import { EventInfo } from '../../../../classes/event-info';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Location } from '@angular/common';

@Component({
  selector: 'app-edit-event',
  templateUrl: './edit-event.component.html',
  styleUrls: ['./edit-event.component.scss']
})
export class EditEventComponent implements OnInit 
{
  // Date Filter
  dateFilter = (d: Date): boolean => 
  {
    let dateNow = new Date();
    // Prevent to selected future date.
    return d <= dateNow;
  }

  public eventInfo: EventInfo;
  
  public eventDetail: FormGroup;



  // Filling data
  categories: string[] = ["Family" , "Friend", "College Friends"];
  
  eventType: string[] = ["Trekking","Marriage","Pinic","Event"];
  

  constructor(private _formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private eventCollection: EventsService,
              private router: Router,
              private _location : Location) 
  {
    this.initialisedComponent();
    this.eventDetail = this._formBuilder.group(
      {
        eventName: [null, Validators.required],
        eventDate: [null, Validators.required],
        location: [null, Validators.required],
        eventType: [null, Validators.required],
        eventCategory: [null, Validators.required],
        description: [null, Validators.required],
  
      }
    );

  }

  ngOnInit() {
  }

  public initialisedComponent() {
    this.route.paramMap.subscribe(
        param => {
            let id: string = param.get('id');
            this.eventCollection.getEventDetail(param.get('id'))
          .then(value => {
            this.eventInfo = value[0];
            console.log(this.eventInfo)
            this.setValue()
          })
          .catch(err => console.log(err));
        }
    )
  }


  public setValue()
  {
    this.eventDetail = this._formBuilder.group(
      {
        eventName: [this.eventInfo.title, Validators.required],
        eventDate: [this.eventInfo.date, Validators.required],
        location: [this.eventInfo.location, Validators.required],
        eventType: [this.eventInfo.eventType, Validators.required],
        eventCategory: [this.eventInfo.categories, Validators.required],
        description: [this.eventInfo.description, Validators.required],
  
      }
    );
  }

  public onSubmit()
  {
  
      this.eventInfo.title= this.eventDetail.value['eventName']
      this.eventInfo.date = this.eventDetail.value['eventDate']
      this.eventInfo.location = this.eventDetail.value['location']
      this.eventInfo.eventType = this.eventDetail.value['eventType']
      this.eventInfo.categories = this.eventDetail.value['eventCategory']
      this.eventInfo.description = this.eventDetail.value['description']

      this.eventCollection.update(this.eventInfo._id , this.eventInfo).then
      (
        value => {
          console.log("updated")
          this.redirectToEventDetail()
        }
      ).catch(
        err => console.log(err)
      )
      
  }

  public redirectToEventDetail()
  {
    console.log("inside")
    this.router.navigate(['/timeline', this.eventInfo._id]);
  }

  public goBack()
  {
    this._location.back();
  }

}
