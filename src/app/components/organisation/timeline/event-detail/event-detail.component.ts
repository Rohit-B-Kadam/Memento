import { Component, OnInit } from '@angular/core';
import { EventInfo } from '../../../../classes/event-info';
import { GalleryItem, ImageItem } from '@ngx-gallery/core';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.component.html',
  styleUrls: ['./event-detail.component.scss']
})
export class EventDetailComponent implements OnInit 
{
  
  public eventInfo:EventInfo;
  public months;
  public images: GalleryItem[];
  
  constructor() 
  { 
    
    this.eventInfo = new EventInfo("Visapur Fort",
                                    new Date(2019,1,21)
                                    ,"Lohagad, pune",
                                    "trekking"
                                    ,["friends","trekking"] ,
                                    "Something is something",
                                    ["Sonam","Sanket","chandan"]);  
    
  this.months = [
    'January', 'February', 'March', 'April', 'May',
    'June', 'July', 'August', 'September',
    'October', 'November', 'December'
    ];

  }

  ngOnInit() 
  {

    // set the gallery image array
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

}
