import { Component, OnInit } from '@angular/core';
import { EventInfo } from '../../../../classes/event-info';
import { GalleryItem, ImageItem, Gallery, GalleryRef } from '@ngx-gallery/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { EventsService } from '../../../../providers/Database/events.service';
import { PhotoInfo } from '../../../../classes/photo-info';
import { ElectronService } from '../../../../providers/electron.service';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit 
{
  
  public eventInfo:EventInfo;
  public months: string[];
  public images: GalleryItem[];
  
  constructor(private route: ActivatedRoute,
              private router: Router,
              private eventCollection: EventsService,
              private _electronService: ElectronService) 
  { 
      this.eventInfo = new EventInfo('',new Date(),'','',[],'',[]);
      this.initialiseEventDetail();
  }

  ngOnInit() 
  {

    this.months = [
      'January', 'February', 'March', 'April', 'May',
      'June', 'July', 'August', 'September',
      'October', 'November', 'December'
      ];


    //set the gallery image array
    this.images = [
      new ImageItem({src: "../../../../../assets/Image/IMG_20190121_092930.jpg" , 
                      thumb: "../../../../../assets/Image/IMG_20190121_092930.jpg" }),
      new ImageItem({src: "../../../../../assets/Image/IMG_20190121_121704.jpg" , 
                      thumb: "../../../../../assets/Image/IMG_20190121_121704.jpg" }),
      new ImageItem({src: "../../../../../assets/Image/IMG_20190121_143654.jpg" , 
                      thumb: "../../../../../assets/Image/IMG_20190121_143654.jpg" }),
      new ImageItem({src: "../../../../../assets/Image/IMG_20190121_144905.jpg" , 
                      thumb: "../../../../../assets/Image/IMG_20190121_144905.jpg" }),
      new ImageItem({src: "../../../../../assets/Image/IMG_20190121_153740.jpg" , 
                      thumb: "../../../../../assets/Image/IMG_20190121_153740.jpg" }),
      new ImageItem({src: "../../../../../assets/Image/IMG_20190121_165611.jpg" , 
                      thumb: "../../../../../assets/Image/IMG_20190121_165611.jpg" })
    ]

    

  }

  public initialiseEventDetail()
  {
    // routing
    this.route.paramMap.subscribe(
      param => {

        let id: string = param.get('id');
        console.log(id);

        if (id !== null) 
        {

          this.eventCollection.getEventDetail(param.get('id'))
            .then(value => 
              {
                  console.log(value);
                  this.eventInfo =  value[0];
                  this.getPhoto();
              })
            .catch( err => console.log(err));

        }
        else
        {
          this.showDefault();
        }
      }
    )
  }

  public showDefault()
  {

    this.eventInfo = new EventInfo("Visapur Fort",
                                    new Date(2019,1,21),
                                    "Lohagad, pune",
                                    "trekking",
                                    ["friends","trekking"],
                                    "Something is something",
                                    ["Sonam","Sanket","chandan"]);  
    
  }

  public getPhoto()
  {
      this.eventCollection.getAllPhoto(this.eventInfo._id)
          .then( value => 
            {
              console.log(value);
              this.displayFivePhoto(value as PhotoInfo[]);
            })
          .catch( err => console.log(err));
  }

  public displayFivePhoto( photoInfo: PhotoInfo[] )
  {

    // initialising
    this.images = [];

    let len = (photoInfo.length >= 5 ) ? 5 : photoInfo.length;
    for( let i = 0 ; i < len; i++)
    {
      this.readTheImagedata(photoInfo[i].photoUrl);
    }
  }


  public async  readTheImagedata(file)
  {
    let fs = this._electronService.fs;
    let data = fs.readFileSync(file);
    let imagebuffer = "data:image/jpg;base64,"+Buffer.from(data).toString('base64');
    console.log(imagebuffer);
    let imItem: ImageItem = new ImageItem({ src: imagebuffer , thumb:  imagebuffer} );
    this.images.push(imItem); 
  }



}

