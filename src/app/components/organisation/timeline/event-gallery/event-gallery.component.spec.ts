import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EventGalleryComponent } from './event-gallery.component';

describe('EventGalleryComponent', () => {
  let component: EventGalleryComponent;
  let fixture: ComponentFixture<EventGalleryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EventGalleryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventGalleryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
