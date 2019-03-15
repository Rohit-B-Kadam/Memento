import { Injectable } from '@angular/core';
import { EventInfo } from '../classes/event-info';
import { PhotoInfo } from '../classes/photo-info';
import { ElectronService } from './electron.service';
import { EventsService } from './Database/events.service';
import { Subject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})

export class EventPhotoInteractionService {

  public eventInfo: EventInfo;
  public photosInfo: PhotoInfo[];
  public imagesBuffer: string[];

  public imagesSubject: Subject<string>;
  public imagesObs$;

  constructor( private eventCollection: EventsService,
              private _electronService: ElectronService ) 
  { 
    this.imagesBuffer = [];
    this.photosInfo = [];
    this.eventInfo =  new EventInfo('',new Date(),'','',[],'',[]);

  }

  public getEventinfo( eventId: string)
  {

    this.eventCollection.getEventDetail(eventId)
    .then(value => 
      {
          this.eventInfo =  value[0];

          console.log(this.eventInfo);
          this.getPhotoInfo();
      })
    .catch( err => console.log(err));


  }

  public getPhotoInfo()
  {
    this.eventCollection.getAllPhoto(this.eventInfo._id)
          .then( value => 
            {
              this.photosInfo = value as []; 
              console.log(this.photosInfo);
              this.readImage();
            })
          .catch( err => console.log(err));
  }


  public readImage()
  {
    console.log("start");
    this.photosInfo.forEach(
      photoInfo => 
      {
        let fs = this._electronService.fs;
        let data = fs.readFileSync(photoInfo.photoUrl);
        let imagebuffer = "data:image/jpg;base64,"+Buffer.from(data).toString('base64');
        this.imagesBuffer.push(imagebuffer); 
      }
    );

    console.log(this.photosInfo.length);
  }

}
