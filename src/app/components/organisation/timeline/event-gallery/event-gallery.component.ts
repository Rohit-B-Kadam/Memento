import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-gallery',
  templateUrl: './event-gallery.component.html',
  styleUrls: ['./event-gallery.component.scss']
})
export class EventGalleryComponent implements OnInit {

  public images = [];
  constructor() { }

  ngOnInit() {
    this.images =  // set the gallery image array
    this.images = ["/assets/Image/IMG_20190121_092930.jpg",
    "/assets/Image/IMG_20190121_121704.jpg",
    "/assets/Image/IMG_20190121_143654.jpg",
    "/assets/Image/IMG_20190121_144905.jpg",
    "/assets/Image/IMG_20190121_123348.jpg",
    "/assets/Image/IMG_20190121_123359.jpg",
    "/assets/Image/IMG_20190121_130447.jpg",
    "/assets/Image/IMG_20190121_131320.jpg",
    "/assets/Image/IMG_20190121_142514.jpg",
    "/assets/Image/IMG_20190121_142751.jpg",
    "/assets/Image/IMG_20190121_165611.jpg",
     ]
  }

}
