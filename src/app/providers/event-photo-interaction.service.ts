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
    this.eventInfo = new EventInfo("", new Date() ,"",[],"",[],);
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

  public refreshEventInfo()
  {
    this.eventCollection.getEventDetail(this.eventInfo._id)
    .then(value => 
      {
          this.eventInfo =  value[0];
          //this.getPhotoInfo();
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

  public DeleteLoadedEvent()
  {
    return new Promise((resolve, reject) => {

    this.eventCollection.remove(this.eventInfo._id).then(
      () =>
      {
        let trash = this._electronService.trash;
        let fs = this._electronService.fs;
        
        let fullPath = this.eventInfo.eventPath;
        if (fs.existsSync(fullPath)) {
          (async () => {
            await trash(fullPath);
          })();
        }
        else 
        {
          console.log("delete folder path not found")
        }    
        resolve()
      }
    );
      
    
    });
  }


  public HideThisEvent()
  {
    return new Promise((resolve, reject) => 
    {

      // requirement
      let fstream = this._electronService.fstream;
      let tar = this._electronService.tar;
      let crypto = this._electronService.crypto;
      let trash = this._electronService.trash;
      let fs = this._electronService.fs;


      // Generating the key
      const KEY = 'mySup3rC00lP4ssWord'

      let data = fstream.Reader(this.eventInfo.eventPath);
      let pack = tar.Pack();
      let encrypt = crypto.createCipher("aes-256-cbc",KEY)
      let writer = fstream.Writer("/home/rohit/Desktop/Momento-Events/.Encrypt/"+this.eventInfo._id+".tar")
      let stream = data.pipe(pack).pipe(encrypt).pipe(writer)
      
      
      stream.on('close', () => 
      { 
        //After the Encrpytion
        console.log("File is encypt");

        // Delete the file
        let fullPath = this.eventInfo.eventPath;
        if (fs.existsSync(fullPath)) {
          (async () => {
            await trash(fullPath);
          })();
        }
        else
        {
          console.log("delete folder path not found")
        }    

        // Make the event ishidden flag true
        this.eventCollection.updateHideStatus(this.eventInfo._id,true).then(
          (value) =>
          {
            console.log(value)
            
            // return form promise
            resolve();
            
          }
        );
        
       });
  
      });
  }

  public UnHideTheEvent()
  {
    let trash = this._electronService.trash;
    let fs = this._electronService.fs;

    // 1. make the isHidden flag = false
    this.eventCollection.updateHideStatus(this.eventInfo._id,false).then(
      (value) =>
      {
        console.log(value)
        
        // 1. Delete the encrypt file
         let path = "/home/rohit/Desktop/Momento-Events/.Encrypt/"+this.eventInfo._id+".tar";
        if (fs.existsSync(path)) 
        {
          trash(path);
        }
        console.log("un hide complete")

      }
    );   
  }
}
