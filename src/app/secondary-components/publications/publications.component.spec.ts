import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';

import { PublicationsComponent } from './publications.component';

describe('PublicationsComponent', () => {
  let component: PublicationsComponent;
  let fixture: ComponentFixture<PublicationsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PublicationsComponent],
      providers: [HttpClient, HttpHandler]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PublicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
