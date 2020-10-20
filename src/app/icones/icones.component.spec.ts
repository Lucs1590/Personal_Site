import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IconesComponent } from './icones.component';

describe('IconesComponent', () => {
  let component: IconesComponent;
  let fixture: ComponentFixture<IconesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IconesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IconesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
