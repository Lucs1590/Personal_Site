import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  repos;

  constructor(private apiService: ApiService) { }

  async ngOnInit() {
    await this.getRepositories();
  }

  async getRepositories() {
    const repositories = await this.apiService.getAllRepositories();
    this.repos = repositories;
    // .sort((a, b) => b.publicationDate.getTime() - a.publicationDate.getTime())
    // .splice(0, 8);
  }
}
