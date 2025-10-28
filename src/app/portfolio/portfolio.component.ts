import { Component, OnInit } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { Repository } from '../models/repository.model';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css'],
  standalone: false
})
export class PortfolioComponent implements OnInit {
  repos: Repository[] = [];
  filteredRepos: Repository[] = [];
  tags: string[] = [];
  searchQuery = '';
  selectedTags: string[] = [];
  sortOption = '';

  constructor(
    private apiService: ApiService,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    await this.getRepositories();
  }

  async getRepositories(): Promise<void> {
    try {
      const repositories = await firstValueFrom(this.apiService.getAllRepositories('Lucs1590'));
      this.repos = repositories
        .sort((a, b) => b.updateDate.getTime() - a.updateDate.getTime())
        .filter(repo => !repo.private);
      this.filteredRepos = [...this.repos];
      this.tags = this.extractTags(this.repos);
    } catch (error) {
      console.error('Error fetching repositories:', error);
      this.repos = [];
      this.filteredRepos = [];
    }
  }

  private extractTags(repos: Repository[]): string[] {
    const allTags = repos.reduce<string[]>((tags, repo) => {
      repo.topics.forEach(tag => {
        if (!tags.includes(tag)) {
          tags.push(tag);
        }
      });
      return tags;
    }, []);
    return allTags.sort();
  }

  filterByTag(tag: string): void {
    if (tag === 'All') {
      this.selectedTags = [];
    } else {
      const index = this.selectedTags.indexOf(tag);
      if (index === -1) {
        this.selectedTags.push(tag);
      } else {
        this.selectedTags.splice(index, 1);
      }
    }
    this.applyFilters();
  }

  searchProjects(): void {
    this.applyFilters();
  }

  applyFilters(): void {
    let filtered = [...this.repos];

    if (this.selectedTags.length > 0) {
      filtered = filtered.filter(repo => this.selectedTags.every(tag => repo.topics.includes(tag)));
    }

    if (this.searchQuery.trim()) {
      const query = this.searchQuery.trim().toLowerCase();
      filtered = filtered.filter(repo =>
        repo.name.toLowerCase().includes(query) ||
        repo.description.toLowerCase().includes(query) ||
        repo.topics.some(topic => topic.toLowerCase().includes(query))
      );
    }

    if (this.sortOption) {
      filtered = this.sortProjects(filtered, this.sortOption);
    }

    this.filteredRepos = filtered;
  }

  sortProjects(repos: Repository[], sortOption: string): Repository[] {
    switch (sortOption) {
      case 'date':
        return repos.sort((a, b) => b.updateDate.getTime() - a.updateDate.getTime());
      case 'name':
        return repos.sort((a, b) => a.name.localeCompare(b.name));
      default:
        return repos;
    }
  }

  clearFilters(): void {
    this.selectedTags = [];
    this.searchQuery = '';
    this.sortOption = '';
    this.filteredRepos = [...this.repos];
  }

  navigateToProjectDetail(id: string): void {
    void this.router.navigate(['/portfolio', id]);
  }

  showProjectInfo(id: string): void {
    const repo = this.repos.find(r => r.name === id);
    if (repo) {
      repo.showInfo = true;
    }
  }

  hideProjectInfo(id: string): void {
    const repo = this.repos.find(r => r.name === id);
    if (repo) {
      repo.showInfo = false;
    }
  }

  trackByRepoName(index: number, repo: Repository): string {
    return repo.name;
  }

  trackByTag(index: number, tag: string): string {
    return tag;
  }
}
