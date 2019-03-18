import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {

  @Output() toggleSidenav = new EventEmitter<void>();

  public Title = "notSet";
  
  constructor(private route: ActivatedRoute, private router: Router) {
    this.router.events.subscribe(( event) => {
      //this.Title = this.router.url;
      let url:string = this.router.url;
      this.Title = url.split('/')[1];
      this.Title = this.Title.replace("-"," ");
      this.Title = this.Title.toUpperCase();
    })
   }

  ngOnInit() {
  }

}
