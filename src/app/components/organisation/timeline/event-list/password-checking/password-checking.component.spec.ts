import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordCheckingComponent } from './password-checking.component';

describe('PasswordCheckingComponent', () => {
  let component: PasswordCheckingComponent;
  let fixture: ComponentFixture<PasswordCheckingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PasswordCheckingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PasswordCheckingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
