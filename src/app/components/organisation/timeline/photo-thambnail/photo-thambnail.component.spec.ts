import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PhotoThambnailComponent } from './photo-thambnail.component';

describe('PhotoThambnailComponent', () => {
  let component: PhotoThambnailComponent;
  let fixture: ComponentFixture<PhotoThambnailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PhotoThambnailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PhotoThambnailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
