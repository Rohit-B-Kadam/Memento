import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherPhotosComponent } from './other-photos.component';

describe('OtherPhotosComponent', () => {
  let component: OtherPhotosComponent;
  let fixture: ComponentFixture<OtherPhotosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OtherPhotosComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OtherPhotosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
