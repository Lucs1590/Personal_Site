import { Component, Input } from '@angular/core';
import { Repository } from '../../models/repository.model';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent {
  @Input() repo: Repository;


  showDetails() {
    console.log(this.repo);
  }

  openRepo() {
    window.open(this.repo.url, '_blank');
  }

}
