import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


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


  constructor(private breakpointObserver: BreakpointObserver) { }

  ngOnInit() {
  }

}
