import { Component, OnInit } from '@angular/core';
import { EventInfo } from '../../../classes/event-info';
import { PhotoInfo } from '../../../classes/photo-info';
import { EventsService } from '../../../providers/Database/events.service';
import { ElectronService } from '../../../providers/electron.service';
import { CurrentUserService } from '../../../providers/current-user.service';
import { async } from 'q';

@Component({
  selector: 'app-duplicate',
  templateUrl: './duplicate.component.html',
  styleUrls: ['./duplicate.component.scss']
})
export class DuplicateComponent implements OnInit 
{

    eventList: EventInfo[];
    photoList: PhotoInfo[];
    duplicate: PhotoInfo[][];
    imageBufferss: string[][];
    setClass: string[];

  constructor(
                private _eventCollection: EventsService,
                private _electronService: ElectronService,
                private _currentUser: CurrentUserService
  ) { }

  ngOnInit() 
  {
    this.setClass = [];
    this.StartSearching();
  }

  public StartSearching()
  {
      console.log("Duplicate Searching start")

      // 1. EventInfoList
      this._eventCollection
        .find(this._currentUser.UserInfo._id)
        .then( 
           (values) =>
          {
              this.eventList = values as EventInfo[];

              this.eventList = this.eventList.filter((value) => {
                return !value.isHidden;
              })

              // console.log(this.eventList)

              // 2. Get PhotoInfo of each Event
              this.photoList = [];
              let len = this.eventList.length;

              this.eventList.forEach( async (value) => {

                this._eventCollection.getAllPhoto(value._id)
                  .then((photos) => 
                  { 
                    
                    let mapPhoto = photos as PhotoInfo[]
                    
                    for(let i = 0 ; i < mapPhoto.length; i++)
                    {
                      mapPhoto[i].eventName = value.title;
                      mapPhoto[i].eventId = value._id;
                    }

                    this.photoList = this.photoList.concat(mapPhoto)
                    len--;
                    if(len == 0)
                    {
                      // 3. Find Duplicate
                      this.FindDuplicate();
                    }
                  })

              })
          })

  }

  public FindDuplicate()
  {
    let fs = this._electronService.fs;
    let mapChecksum = new Map<string , PhotoInfo[] >()

    // 1. Calculate CheckSum for every photo

    this.photoList.forEach((photo) => {

      let data = fs.readFileSync( photo.photoUrl) 
      let cs = this.generateChecksum(data);
        
        let bret = mapChecksum.has(cs)

        if(bret)
        {
          mapChecksum.get(cs).push(photo)
        }
        else
        {
          let addphoto:PhotoInfo[] = [photo];
          mapChecksum.set(cs,addphoto)
        }
    })

    this.duplicate = [];
    // pushing only those value whose value len more then 1
    mapChecksum.forEach( (value , key) => 
    {
      if(value.length >= 2)
      {
        this.duplicate.push(value)
      }

    })

    this.readTheDuplicateFile()
  }


  public generateChecksum(str) 
  {
    let crypto = this._electronService.crypto;
    return crypto
        .createHash('md5')    // algorithm
        .update(str)          // Stream
        .digest('hex');       // encoding
  }

  public readTheDuplicateFile()
  {
    let fs = this._electronService.fs;
    console.log(this.duplicate)
    this.imageBufferss = [];

      let data:Buffer;
      let buffer;
      // Reading and add to imageBufferss
      for( let i = 0 ; i < this.duplicate.length ; i++)
      {
        let bufferArray = [];

        for( let j = 0 ; j < this.duplicate[i].length; j++)
        {
            data = fs.readFileSync(this.duplicate[i][j].photoUrl);
            buffer = "data:image/jpg;base64,"+Buffer.from(data).toString('base64');
            bufferArray.push(buffer)
            this.setClassToImage(this.duplicate[i][j].orientation, i);    
        }
        this.imageBufferss.push(bufferArray)
      }

  }


  public setClassToImage(id: number,index: number) 
  {
      if (id == 1 || id == 2) {
          this.setClass[index] = 'orientation_1';
      }
      else if (id == 8 || id == 7) {
          this.setClass[index] = 'orientation_8';
      }
      else if (id == 3 || id == 4) {
          this.setClass[index] = 'orientation_3';
      }
      else if (id == 6 || id == 5) {
          this.setClass[index] = 'orientation_6';
      }
  }

  public deletePhoto( photoI : PhotoInfo )
  { 
      console.log(photoI)
      // Delete is photo
      this._eventCollection.DeletePhotoFormDataBase(photoI.eventId,photoI)
      
      let fs = this._electronService.fs;
      fs.unlinkSync(photoI.photoUrl)
      console.log("Photo is deleted")

      setTimeout( ()=>{
        this.StartSearching();
      }, 2000)
      
  }


}
