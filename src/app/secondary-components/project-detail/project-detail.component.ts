import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';

@Component({
    selector: 'app-project-detail',
    templateUrl: './project-detail.component.html',
    styleUrls: ['./project-detail.component.css'],
    standalone: false
})
export class ProjectDetailComponent implements OnInit {
  project: Project;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const projectId = params['id'];
      this.project = this.projectService.getProjectById(projectId);
    });
  }

  getProjectDetails() {
    if (this.project) {
      return {
        name: this.project.name,
        description: this.project.description,
        technologies: this.project.technologies,
        images: this.project.images,
        videos: this.project.videos
      };
    } else {
      return {
        name: 'Project not found',
        description: '',
        technologies: [],
        images: [],
        videos: []
      };
    }
  }
}
