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
    const repositories = await this.apiService.getAllRepositories('Lucs1590').toPromise();
    this.repos = repositories
      .sort((a, b) => b.updateDate.getTime() - a.updateDate.getTime())
      .filter(repo => repo.private === false);
  }

  // https://gitstalk.netlify.app/lucs1590 --> Gitstalk link
}
