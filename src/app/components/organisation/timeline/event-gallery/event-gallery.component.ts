import { Component, OnInit, OnDestroy } from '@angular/core';
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
export class EventGalleryComponent implements OnInit , OnDestroy {
    

    public images = [];
    public eventInfo: EventInfo;
    public imagesBuffer: string[];
    public intTimmer;
    public index;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private photoInteraction: EventPhotoInteractionService
    ) {
        this.imagesBuffer = [];
        this.eventInfo = new EventInfo('', new Date(), '', '', [], '', []);
        this.initialisedComponent();

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
        this.eventInfo = this.photoInteraction.eventInfo;

        this.loadTheImage();
        
    }

    public async  loadTheImage() 
    {
        this.index = 0;
        console.log("started reading")
        this.intTimmer = setInterval(
            () => 
            {
                if(this.index < this.photoInteraction.imagesBuffer.length)
                {
                    this.imagesBuffer.push(this.photoInteraction.imagesBuffer[this.index])
                    this.index++;
                }
                else
                {
                    clearInterval( this.intTimmer);
                }
            },1000
        );//endFunc
    }


}
