import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FourZeroFourPageComponent } from './four-zero-four-page.component';

describe('FourZeroFourPageComponent', () => {
  let component: FourZeroFourPageComponent;
  let fixture: ComponentFixture<FourZeroFourPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FourZeroFourPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FourZeroFourPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
