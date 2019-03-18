import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { EventPhotoInteractionService } from '../../../../providers/event-photo-interaction.service';
import { PhotoInfo } from '../../../../classes/photo-info';
import { Location } from '@angular/common';

@Component({
  selector: 'app-photo-viewer',
  templateUrl: './photo-viewer.component.html',
  styleUrls: ['./photo-viewer.component.scss']
})
export class PhotoViewerComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe([ Breakpoints.Medium ,Breakpoints.Small ,Breakpoints.Handset ])
  .pipe(
    map(result => result.matches)
  );

  public imagebuffer: string;
  public photoInfo: PhotoInfo;
  public index;
  public setClass;

  public friendLists:string[] = [
    'Sonam Karale',
    'Abhishek Zambre',
    'Sanket Hebbal',
    'Shubham Bangar'
  ];

  public TagList:string[] = [
    'car',
    'beach',
    'sunlight'
  ];


  constructor(private breakpointObserver: BreakpointObserver,
              private route: ActivatedRoute,
              private photoInteraction: EventPhotoInteractionService,
              private _location: Location) 
  {
    this.index = 0;
    this.initialisedComponent();
  }

  ngOnInit() {
  }


  public initialisedComponent() {
    this.route.paramMap.subscribe(
        param => {
            let id: string = param.get('id');
            this.loadImage(id);
        });
  }

  public loadImage(id)
  {

    this.index += +id;
    if(this.index < 0 )
      this.index = 0;
    else  
      this.index %= this.photoInteraction.imagesBuffer.length;
    
    this.photoInfo = this.photoInteraction.photosInfo[this.index];
    this.imagebuffer = this.photoInteraction.imagesBuffer[this.index];
    this.setClassToImage(this.photoInteraction.photosInfo[this.index].orientation);
  }


  public setClassToImage( id : number)
  {
      if(id == 1 || id == 2)
      {
        this.setClass = 'orientation_1';
      }
      else if(id == 8 || id == 7)
      {
        this.setClass = 'orientation_8';
      }
      else if(id == 3 || id == 4)
      {
        this.setClass = 'orientation_3';
      }
      else if(id == 6 || id == 5)
      {
        this.setClass = 'orientation_6';
      }
  }


  public goBack()
  {
    this._location.back();
  }

}
