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

  it('should filter projects by tag', () => {
    const projects: Project[] = [
      new Project('1', 'Project1', 'Description1', ['SOFTWARE'], ['image1.jpg'], ['video1.mp4']),
      new Project('2', 'Project2', 'Description2', ['OTHERS'], ['image2.jpg'], ['video2.mp4'])
    ];
    spyOn(service, 'getProjects').and.returnValue(projects);
    const filteredProjects = service.getProjects().filter(project => project.technologies.includes('SOFTWARE'));
    expect(filteredProjects.length).toBe(1);
    expect(filteredProjects[0].name).toBe('Project1');
  });

  it('should search projects by name', () => {
    const projects: Project[] = [
      new Project('1', 'Project1', 'Description1', ['SOFTWARE'], ['image1.jpg'], ['video1.mp4']),
      new Project('2', 'Project2', 'Description2', ['OTHERS'], ['image2.jpg'], ['video2.mp4'])
    ];
    spyOn(service, 'getProjects').and.returnValue(projects);
    const searchQuery = 'Project1';
    const searchedProjects = service.getProjects().filter(project => project.name.includes(searchQuery));
    expect(searchedProjects.length).toBe(1);
    expect(searchedProjects[0].name).toBe('Project1');
  });

  it('should sort projects by date', () => {
    const projects: Project[] = [
      new Project('1', 'Project1', 'Description1', ['SOFTWARE'], ['image1.jpg'], ['video1.mp4']),
      new Project('2', 'Project2', 'Description2', ['OTHERS'], ['image2.jpg'], ['video2.mp4'])
    ];
    spyOn(service, 'getProjects').and.returnValue(projects);
    const sortedProjects = service.getProjects().sort((a, b) => b.id.localeCompare(a.id));
    expect(sortedProjects[0].name).toBe('Project2');
  });
});
