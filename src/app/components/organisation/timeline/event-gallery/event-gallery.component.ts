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
    this.images = ["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""]
  }

}
