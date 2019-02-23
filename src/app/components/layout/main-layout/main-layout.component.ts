import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

/*

main layout
  contain
    1. navbar
    2. sidebar
    3. router-outlet

*/

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {

  constructor(private breakpointObserver: BreakpointObserver) 
  { 

  }

  ngOnInit() {
  }


  // to minimise the sidebar when app side is reduced
  isHandset$: Observable<boolean> = this.breakpointObserver.observe([ Breakpoints.Medium ,Breakpoints.Small, Breakpoints.Handset ] )
    .pipe(
      map(result => result.matches)
    );
}
