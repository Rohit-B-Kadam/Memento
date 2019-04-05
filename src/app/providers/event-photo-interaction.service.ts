// Gallery and photoview interaction

import { Injectable } from '@angular/core';
import { EventInfo } from '../classes/event-info';
import { PhotoInfo } from '../classes/photo-info';
import { ElectronService } from './electron.service';
import { EventsService } from './Database/events.service';
import { Subject } from 'rxjs';
import { DateAdapter } from '@angular/material';



@Injectable({
  providedIn: 'root'
})

export class EventPhotoInteractionService {

  public eventInfo: EventInfo;
  public photosInfo: PhotoInfo[];
  public imagesBuffer: string[];

  constructor( private eventCollection: EventsService,
              private _electronService: ElectronService ) 
  { 
    //this.clearData();
    console.log("created object");
  }

  public clearData()
  {
    this.eventInfo = new EventInfo("", new Date() ,"","",[],"",[],);
    this.imagesBuffer = [];
    this.photosInfo = [];
  }

  public getEventinfo( eventId: string)
  {

    this.eventCollection.getEventDetail(eventId)
    .then(value => 
      {
          this.eventInfo =  value[0];
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
              this.readImage();
            })
          .catch( err => console.log(err));
  }


  public readImage()
  {
    this.photosInfo.forEach(
      photoInfo => 
      {
        let fs = this._electronService.fs;
        let data = fs.readFileSync(photoInfo.photoUrl);
        let imagebuffer = "data:image/jpg;base64,"+Buffer.from(data).toString('base64');
        this.imagesBuffer.push(imagebuffer); 
      }
    );
  }

  public InsertNewPhoto(newPhoto:PhotoInfo[])
  {
    this.eventCollection.addNewPhoto(this.eventInfo._id , newPhoto)
    let lastIndex = this.photosInfo.length - 1;

    newPhoto.forEach(
      photoI =>
      {
        this.photosInfo.push(photoI)
        let fs = this._electronService.fs;
        if(fs.existsSync(photoI.photoUrl))
        {
          let data = fs.readFileSync(photoI.photoUrl);
          let imagebuffer = "data:image/jpg;base64,"+Buffer.from(data).toString('base64');
          this.imagesBuffer.push(imagebuffer);
        } 
      }
    )

    return lastIndex;
  }

  public DeletePhoto(index: number)
  {
    let photoInfo = this.photosInfo[index];
    this.eventCollection.DeletePhotoFormDataBase(this.eventInfo._id, photoInfo);

    // delete from disk and this.photoInfo, this.imagebuffer
    let fs = this._electronService.fs;
    fs.unlinkSync(photoInfo.photoUrl)
    
    this.photosInfo.splice(index,1)
    this.imagesBuffer.splice(index,1)
  }
}
