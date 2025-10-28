import { Injectable } from '@angular/core';
import { Project } from '../models/project.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private readonly projects: Project[] = [
    new Project(
      '1',
      'Tombamento de Guia',
      'Description of Tombamento de Guia',
      ['Angular', 'TypeScript'],
      ['image1.jpg', 'image2.jpg'],
      ['video1.mp4']
    ),
    new Project(
      '2',
      'Sistema Odontológico',
      'Description of Sistema Odontológico',
      ['Angular', 'TypeScript'],
      ['image1.jpg', 'image2.jpg'],
      ['video1.mp4']
    ),
    new Project(
      '3',
      'Sistema de Gestão de Sinistralidade',
      'Description of Sistema de Gestão de Sinistralidade',
      ['Angular', 'TypeScript'],
      ['image1.jpg', 'image2.jpg'],
      ['video1.mp4']
    ),
    new Project(
      '4',
      'Aplicativo Napkinn',
      'Description of Aplicativo Napkinn',
      ['Angular', 'TypeScript'],
      ['image1.jpg', 'image2.jpg'],
      ['video1.mp4']
    ),
    new Project(
      '5',
      'DISC',
      'Description of DISC',
      ['Angular', 'TypeScript'],
      ['image1.jpg', 'image2.jpg'],
      ['video1.mp4']
    ),
    new Project(
      '6',
      'Coffee Recognize',
      'Description of Coffee Recognize',
      ['Angular', 'TypeScript'],
      ['image1.jpg', 'image2.jpg'],
      ['video1.mp4']
    ),
    new Project(
      '7',
      'Cobweb',
      'Description of Cobweb',
      ['Angular', 'TypeScript'],
      ['image1.jpg', 'image2.jpg'],
      ['video1.mp4']
    ),
    new Project(
      '8',
      'NKOcr',
      'Description of NKOcr',
      ['Angular', 'TypeScript'],
      ['image1.jpg', 'image2.jpg'],
      ['video1.mp4']
    ),
    new Project(
      '9',
      'Pet',
      'Description of Pet',
      ['Angular', 'TypeScript'],
      ['image1.jpg', 'image2.jpg'],
      ['video1.mp4']
    ),
    new Project(
      '10',
      'Site Triathlon',
      'Description of Site Triathlon',
      ['Angular', 'TypeScript'],
      ['image1.jpg', 'image2.jpg'],
      ['video1.mp4']
    ),
    new Project(
      '11',
      'Show Bible (document)',
      'Description of Show Bible (document)',
      ['Angular', 'TypeScript'],
      ['image1.jpg', 'image2.jpg'],
      ['video1.mp4']
    ),
    new Project(
      '12',
      'Strava Analysis',
      'Description of Strava Analysis',
      ['Angular', 'TypeScript'],
      ['image1.jpg', 'image2.jpg'],
      ['video1.mp4']
    ),
    new Project(
      '13',
      'Africa Financial',
      'Description of Africa Financial',
      ['Angular', 'TypeScript'],
      ['image1.jpg', 'image2.jpg'],
      ['video1.mp4']
    )
  ];

  getProjects(): Project[] {
    return this.projects;
  }

  getProjectById(id: string): Project | undefined {
    return this.projects.find(project => project.id === id);
  }

  addProject(project: Project): void {
    this.projects.push(project);
  }

  updateProject(updatedProject: Project): void {
    const index = this.projects.findIndex(project => project.id === updatedProject.id);
    if (index !== -1) {
      this.projects[index] = updatedProject;
    }
  }

  deleteProject(id: string): void {
    const index = this.projects.findIndex(project => project.id === id);
    if (index !== -1) {
      this.projects.splice(index, 1);
    }
  }
}
