import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from '../../services/project.service';
import { Project } from '../../models/project.model';
import { SeoService } from '../../services/seo.service';

@Component({
    selector: 'app-project-detail',
    templateUrl: './project-detail.component.html',
    styleUrls: ['./project-detail.component.css'],
    standalone: false
})
export class ProjectDetailComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private projectService = inject(ProjectService);
  private seoService = inject(SeoService);

  project: Project;

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const projectId = params['id'];
      this.project = this.projectService.getProjectById(projectId);
      this.updateSeoMetadata();
    });
  }

  private updateSeoMetadata(): void {
    if (this.project) {
      this.seoService.updateMetadata({
        title: `${this.project.name || 'Project'} - Lucas Brito Portfolio`,
        description: this.project.description || 'Detailed view of project from Lucas Brito\'s portfolio.',
        keywords: `Lucas Brito, ${this.project.name || 'Project'}, Portfolio Project, Software Development`,
        type: 'article'
      });
    } else {
      this.seoService.updateMetadata({
        title: 'Project Details - Lucas Brito Portfolio',
        description: 'Detailed view of project from Lucas Brito\'s portfolio.',
        keywords: 'Lucas Brito, Portfolio Project, Software Development'
      });
    }
  }
}
