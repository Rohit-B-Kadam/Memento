import { Component, OnInit, OnDestroy } from '@angular/core';
import { EventInfo } from '../../../../classes/event-info';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { EventsService } from '../../../../providers/Database/events.service';
import { PhotoInfo } from '../../../../classes/photo-info';
import { ElectronService } from '../../../../providers/electron.service';


// Decorator
@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})


export class EventDetailComponent implements OnInit , OnDestroy
{
  
  // Class Properties  
  public eventInfo:EventInfo;
  public months: string[];
  public imageDisplay: string;
  public imageIndex: number;
  public setTimer;
  public setClass;

  /// Services
  constructor(private route: ActivatedRoute,              // Get URL data
              private eventCollection: EventsService,
              private _electronService: ElectronService) 
  { 
      this.eventInfo = new EventInfo('',new Date(),'',[],'',[]);
      this.initialiseEventDetail();
      
  }

  // On component load
  ngOnInit() 
  {

    this.months = [
      'January', 'February', 'March', 'April', 'May',
      'June', 'July', 'August', 'September',
      'October', 'November', 'December'
      ];

    //set the gallery image array

  }

  // On component unload
  ngOnDestroy(): void 
  {
    clearInterval(this.setTimer);
  }

  public initialiseEventDetail()
  {
    // routing
    this.route.paramMap.subscribe(
      param => {

        let id: string = param.get('id');
        this.eventCollection.getEventDetail(param.get('id'))
          .then(value => {
            this.eventInfo = value[0];
            this.getPhoto();
          })
          .catch(err => console.log(err));

      }
    )
  }


  public getPhoto()
  {
      this.eventCollection.getAllPhoto(this.eventInfo._id)
          .then( value => 
            {
              this.displayFivePhoto(value as PhotoInfo[]);
            })
          .catch( err => console.log(err));
  }

  public async  displayFivePhoto( photoInfo: PhotoInfo[] )
  {
    // initialising
    clearInterval(this.setTimer);
    this.imageIndex = 0;
    let timer = 0;

    let fs = this._electronService.fs;
    let data:Buffer;
    let imagebuffer:string;

    console.log(photoInfo)
    try
    {

    // Loaded Image
      let photoUrl = photoInfo[this.imageIndex % 5].photoUrl;
      data = fs.readFileSync(photoUrl);
      imagebuffer = "data:image/jpg;base64,"+Buffer.from(data).toString('base64');
      this.setClassToImage(photoInfo[this.imageIndex % 5].orientation);
      this.imageDisplay = imagebuffer;
      this.imageIndex++;

    }catch(e)
    {
      this.imageIndex++;
      console.log("catch")
    }

    // repeated loaded image ie image loop
    this.setTimer = setInterval( ()=> 
    {
      try
      {
      //TODO: Handle if event photo less than 5 
        let photoUrl = photoInfo[this.imageIndex % 5].photoUrl;

        fs = this._electronService.fs;
        data = fs.readFileSync(photoUrl);
        imagebuffer = "data:image/jpg;base64,"+Buffer.from(data).toString('base64');
        this.imageDisplay = imagebuffer;
        this.setClassToImage(photoInfo[this.imageIndex % 5].orientation);
        this.imageIndex++;
      }catch(e)
      {
        this.imageIndex++;
        console.log("catch")
      }
    }, 2000);
  }

  public setClassToImage( id : number)
  {
      if(id == 1 || id == 2)
      {
        this.setClass = 'orientation_1';
      }
      else if(id == 8 || id == 7)
      {
        this.setClass = 'orientation_8';
      }
      else if(id == 3 || id == 4)
      {
        this.setClass = 'orientation_3';
      }
      else if(id == 6 || id == 5)
      {
        this.setClass = 'orientation_6';
      }
  }

}

