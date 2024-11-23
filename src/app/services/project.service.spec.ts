import { TestBed } from '@angular/core/testing';
import { ProjectService } from './project.service';
import { Project } from '../models/project.model';

describe('ProjectService', () => {
  let service: ProjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProjectService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all projects', () => {
    const projects = service.getProjects();
    expect(projects.length).toBeGreaterThan(0);
  });

  it('should return a project by id', () => {
    const project = service.getProjectById('1');
    expect(project).toBeTruthy();
    expect(project.id).toBe('1');
  });

  it('should add a new project', () => {
    const newProject = new Project(
      '14',
      'New Project',
      'Description of New Project',
      ['Angular', 'TypeScript'],
      ['image1.jpg', 'image2.jpg'],
      ['video1.mp4']
    );
    service.addProject(newProject);
    const project = service.getProjectById('14');
    expect(project).toBeTruthy();
    expect(project.id).toBe('14');
  });

  it('should update an existing project', () => {
    const updatedProject = new Project(
      '1',
      'Updated Project',
      'Updated Description',
      ['Angular', 'TypeScript'],
      ['image1.jpg', 'image2.jpg'],
      ['video1.mp4']
    );
    service.updateProject(updatedProject);
    const project = service.getProjectById('1');
    expect(project).toBeTruthy();
    expect(project.name).toBe('Updated Project');
  });

  it('should delete a project by id', () => {
    service.deleteProject('1');
    const project = service.getProjectById('1');
    expect(project).toBeUndefined();
  });
});
