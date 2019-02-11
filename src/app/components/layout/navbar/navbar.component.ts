import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})

export class NavbarComponent implements OnInit {

  @Output() toggleSidenav = new EventEmitter<void>();
  public searchValue;
  options: string[] = ['One', 'Two', 'Three'];
  
  constructor() { }

  ngOnInit() {
  }

}
