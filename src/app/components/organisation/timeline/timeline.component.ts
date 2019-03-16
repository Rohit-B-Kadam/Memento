import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EventPhotoInteractionService } from '../../../providers/event-photo-interaction.service';


@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss']
})
export class TimelineComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe([ Breakpoints.Medium ,Breakpoints.Small ,Breakpoints.Handset ])
  .pipe(
    map(result => result.matches)
  );

  constructor(private breakpointObserver: BreakpointObserver,
              private photoInteraction: EventPhotoInteractionService) {}

  ngOnInit() {
  }

}
