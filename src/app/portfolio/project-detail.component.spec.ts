import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { ProjectDetailComponent } from './project-detail.component';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';

describe('ProjectDetailComponent', () => {
  let component: ProjectDetailComponent;
  let fixture: ComponentFixture<ProjectDetailComponent>;
  let projectService: ProjectService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({ id: '1' })
          }
        },
        ProjectService
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectDetailComponent);
    component = fixture.componentInstance;
    projectService = TestBed.inject(ProjectService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch project details based on route parameters', () => {
    const project = new Project(
      '1',
      'Tombamento de Guia',
      'Description of Tombamento de Guia',
      ['Angular', 'TypeScript'],
      ['image1.jpg', 'image2.jpg'],
      ['video1.mp4']
    );
    spyOn(projectService, 'getProjectById').and.returnValue(project);

    component.ngOnInit();

    expect(component.project).toEqual(project);
    expect(projectService.getProjectById).toHaveBeenCalledWith('1');
  });
});
