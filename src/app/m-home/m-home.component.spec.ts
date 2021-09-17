import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { MHomeComponent } from './m-home.component';

describe('MHomeComponent', () => {
  let component: MHomeComponent;
  let fixture: ComponentFixture<MHomeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
