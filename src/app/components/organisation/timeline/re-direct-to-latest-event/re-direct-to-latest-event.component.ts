import { Component, OnInit } from '@angular/core';
import {  Router } from '@angular/router';

@Component({
  selector: 'app-re-direct-to-latest-event',
  template: ''
})
export class ReDirectToLatestEventComponent implements OnInit {

  constructor(private router: Router) 
  {
    // TODO: Making it dynamic
    this.router.navigate(['/timeline', 'rEg6Q0bNguylIBhq']);
  }

  ngOnInit() {
  }

}
