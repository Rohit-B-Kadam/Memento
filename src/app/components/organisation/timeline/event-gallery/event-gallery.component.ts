import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EventsService } from '../../../../providers/Database/events.service';
import { EventInfo } from '../../../../classes/event-info';
import { EventPhotoInteractionService } from '../../../../providers/event-photo-interaction.service';
import { PhotoInfo } from '../../../../classes/photo-info';
import { ElectronService } from '../../../../providers/electron.service';
import { interval, Subject } from 'rxjs';
import { Location } from '@angular/common';
var EXIF = require('exif-js');

@Component({
    selector: 'app-event-gallery',
    templateUrl: './event-gallery.component.html',
    styleUrls: ['./event-gallery.component.scss']
})
export class EventGalleryComponent implements OnInit , OnDestroy {
    

    public images = [];
    public eventInfo: EventInfo;
    public imagesBuffer: string[];
    public setClass: string[];
    public intTimmer;
    public intTimmerNewPhoto;
    public index;

    public Loaded = false
    public newImagePath: PhotoInfo[];  // new added path will be save

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private photoInteraction: EventPhotoInteractionService,
        private _location : Location,    // to go back
        private _electronService: ElectronService
    ) 
    {
        this.imagesBuffer = [];
        this.setClass= [];
        this.eventInfo = new EventInfo('', new Date(), '', '', [], '', []);
        this.initialisedComponent();
        this.newImagePath = [];
    }

    ngOnInit() {

        this.eventInfo = this.photoInteraction.eventInfo;
    }

    ngOnDestroy(): void 
    {
        clearInterval(this.intTimmer);
    }

    public initialisedComponent() {
        this.route.paramMap.subscribe(
            param => {
                let id: string = param.get('id');
                this.loadImage(id);
            }
        )
    }


    public loadImage(eventId: string) 
    {
        this.photoInteraction.clearData();
        this.photoInteraction.getEventinfo(eventId)

        
        this.loadTheImage();
        

    }

    public async  loadTheImage() 
    {
        this.index = 0;
        // console.log("started reading")
        this.intTimmer = setInterval(
            () => 
            {
                if(this.index < this.photoInteraction.imagesBuffer.length)
                {
                    this.imagesBuffer.push(this.photoInteraction.imagesBuffer[this.index]);
                    this.setClassToImage(this.photoInteraction.photosInfo[this.index].orientation , this.index);
                    this.index++;
                    this.eventInfo = this.photoInteraction.eventInfo;
                }
                else
                {
                    clearInterval( this.intTimmer);
                    this.Loaded = true
                }
            },1000
        );//endFunc
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


  public goBack()
  {
    this._location.back();
  }

  /// Adding photo

  public AddPhoto()
  {
    
    // Move to event folder
    this.moveAllPhotoToDest("/home/rohit/Desktop/Momento-Events")

    // Fill PhotoInfo
    this.fillPhotoInfo();

    //console.log(this.newImagePath)
    
    this.intTimmerNewPhoto = setInterval(
        () => 
        {
            if(this.Loaded)
            {
                console.log("Loading is complete")

                // Add to database
                let lastIndex = this.photoInteraction.InsertNewPhoto(this.newImagePath)

                lastIndex += 1;
                
                // Display on screen
                for( let i = lastIndex; i < this.photoInteraction.imagesBuffer.length; i++)
                {
                    this.imagesBuffer.push(this.photoInteraction.imagesBuffer[i]);
                    this.setClassToImage(this.photoInteraction.photosInfo[i].orientation , i);
                }
                // clear the added image
                this.newImagePath = [];
                
                clearInterval(this.intTimmerNewPhoto);
            }
            
        },2000
    );//endFunc

    // Add path to database


  }

  public onFileInput(event: any)
  {
    for( let i = 0 ; i < event.target.files.length; i++)
    {
        this.newImagePath.push(new PhotoInfo(event.target.files[i].path));
        //this.readTheImagedata(event.target.files[i]);
    }

    this.AddPhoto()
  }

  
  public moveAllPhotoToDest( destFolder:string)
  {
    // getting nodejs fs module from electronService
    let fs = this._electronService.fs;
    let date = this.eventInfo.date;

    let fullPath: string= destFolder;
    if (!fs.existsSync(fullPath))
    {
      fs.mkdirSync(fullPath);
    }

    // check year folder is exist or not
    fullPath += '/'+date.getFullYear();
    if (!fs.existsSync(fullPath))
    {
      fs.mkdirSync(fullPath);
    }
   

    fullPath += "/"+date.getDate()+'_'+date.getMonth()+'_'+this.eventInfo.title;
    if (!fs.existsSync(fullPath))
    {
      fs.mkdirSync(fullPath);
    }

    for(let i = 0 ; i < this.newImagePath.length; i++)
    {
      let photoName = this.newImagePath[i].photoUrl.split('\\').pop().split('/').pop();
      fs.copyFileSync(this.newImagePath[i].photoUrl, fullPath+'/'+photoName);
      this.newImagePath[i].photoUrl = fullPath+'/'+photoName;
    }

  }

  public fillPhotoInfo()
  {
    let fs = this._electronService.fs;

    for(let i = 0 ; i < this.newImagePath.length; i++)
    {
      let data = fs.readFileSync(this.newImagePath[i].photoUrl);

      var exifData = EXIF.readFromBinaryFile(this.toArrayBuffer(data));
      this.newImagePath[i].model = exifData.Model;
      this.newImagePath[i].dataTime = exifData.DateTime;
      this.newImagePath[i].orientation = exifData.Orientation;
    }
  }

  public toArrayBuffer(buf) 
  {
    var ab = new ArrayBuffer(buf.length);
    var view = new Uint8Array(ab);
    for (var i = 0; i < buf.length; ++i) 
    {
        view[i] = buf[i];
    }
    return ab;
  }


  // Delete this event
  public DeleteEvent()
  {
      //Stop loading image
      clearInterval(this.intTimmer);
      this.photoInteraction.DeleteLoadedEvent().then(
          () =>
          {
            this.router.navigate(['/timeline', 'OkPpHUV9cAg2z83j']);
          }
      )

      
  }

  // Export the event
  public ExportTheEvent()
  {

  }
}
