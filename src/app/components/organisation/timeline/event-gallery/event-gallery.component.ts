import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventsService } from '../../../../providers/Database/events.service';
import { EventInfo } from '../../../../classes/event-info';
import { EventPhotoInteractionService } from '../../../../providers/event-photo-interaction.service';
import { PhotoInfo } from '../../../../classes/photo-info';
import { ElectronService } from '../../../../providers/electron.service';
import { interval, Subject } from 'rxjs';

@Component({
  selector: 'app-event-gallery',
  templateUrl: './event-gallery.component.html',
  styleUrls: ['./event-gallery.component.scss']
})
export class EventGalleryComponent implements OnInit {

  public images = [];
  public eventInfo: EventInfo;
  public photosInfo: PhotoInfo[];
  public imagesBuffer: string[];
  private subject = new Subject<any>();

  constructor(
                private route: ActivatedRoute,
                private router: Router,
                private eventCollection: EventsService,
                private _electronService: ElectronService
  ) 
  {
      this.imagesBuffer = [];
      this.photosInfo = [];
      this.eventInfo =  new EventInfo('',new Date(),'','',[],'',[]);
      this.initialisedComponent();

      let observable$ = this.subject.asObservable();
      observable$.subscribe( buffer => { this.imagesBuffer.push(buffer) });

  }

  ngOnInit() {
  
     //this.eventInfo = this.photoInteraction.eventInfo;
  }

  public initialisedComponent()
  {
    this.route.paramMap.subscribe(
      param => 
      {
        let id: string = param.get('id');
        this.loadImage(id);
      }
    )
  }


  public loadImage( eventId: string)
  {
    // get means read
    this.getEventinfo(eventId);
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


  async readImage()
  {
    console.log("start");
    // this.photosInfo.forEach(
    //   photoInfo => 
    //   {
    //     let fs = this._electronService.fs;
    //     let data = fs.readFileSync(photoInfo.photoUrl);
    //     let imagebuffer = "data:image/jpg;base64,"+Buffer.from(data).toString('base64');
    //     this.imagesBuffer.push(imagebuffer); 
    //   }
    // );

    for (let index  = 0; index < this.photosInfo.length; index++) 
    {
      setTimeout(() =>{
        let fs = this._electronService.fs;
        let data = fs.readFileSync(this.photosInfo[index].photoUrl);
        let imagebuffer = "data:image/jpg;base64,"+Buffer.from(data).toString('base64');
        //this.subject.next({ buffer: imagebuffer });
        this.imagesBuffer.push(imagebuffer);
        
      }, 1000);

        
        

    }
    console.log(this.photosInfo.length+ "Image readed");
  }



}
