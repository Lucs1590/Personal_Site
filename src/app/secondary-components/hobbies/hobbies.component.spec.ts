import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HobbiesComponent } from './hobbies.component';

describe('HobbiesComponent', () => {
  let component: HobbiesComponent;
  let fixture: ComponentFixture&lt;HobbiesComponent&gt;;
  let httpMock: HttpTestingController;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ HobbiesComponent ],
      imports: [ HttpClientTestingModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HobbiesComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch and display book list correctly', () => {
    const expectedBooks = [
      { title: 'The Pragmatic Programmer', author: 'Andrew Hunt and David Thomas' },
      { title: 'Clean Code', author: 'Robert C. Martin' }
    ];
    component.fetchBookList();
    expect(component.bookList).toEqual(expectedBooks);
  });

  it('should fetch and display sports data correctly', () => {
    const expectedSportsData = { running: '100km', cycling: '200km' };
    const req = httpMock.expectOne('https://api.strava.com/path/to/user/data');
    req.flush(expectedSportsData);
    expect(component.sportsData).toEqual(expectedSportsData);
  });

  it('should fetch and display computer setup correctly', () => {
    const expectedSetup = [
      { item: 'Laptop', model: 'MacBook Pro 16-inch' },
      { item: 'Monitor', model: 'Dell Ultrasharp 27"' }
    ];
    component.fetchComputerSetup();
    expect(component.computerSetup).toEqual(expectedSetup);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
