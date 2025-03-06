import { Component, OnInit, Signal, signal, computed } from '@angular/core';
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
  repos: Signal<Repository[]> = signal([]);
  filteredRepos: Signal<Repository[]> = signal([]);
  tags: Signal<string[]> = signal([]);
  searchQuery: Signal<string> = signal('');
  selectedTags: Signal<string[]> = signal([]);
  sortOption: Signal<string> = signal('');

  constructor(private apiService: ApiService, private router: Router) { }

  async ngOnInit() {
    await this.getRepositories();
  }

  async getRepositories() {
    const repositories = await this.apiService.getAllRepositories('Lucs1590').toPromise();
    this.repos.update(() => repositories
      .sort((a, b) => b.updateDate.getTime() - a.updateDate.getTime())
      .filter(repo => repo.private === false));
    this.filteredRepos.update(() => [...this.repos()]);
    this.tags.update(() => this.extractTags(this.repos()));
  }

  private extractTags(repos: Repository[]): string[] {
    const allTags = repos.reduce((tags, repo) => {
      repo.topics.forEach(tag => {
        if (!tags.includes(tag)) {
          tags.push(tag);
        }
      });
      return tags;
    }, []);
    return allTags.sort();
  }

  filterByTag(tag: string) {
    if (tag === 'All') {
      this.selectedTags.update(() => []);
    } else {
      const index = this.selectedTags().indexOf(tag);
      if (index === -1) {
        this.selectedTags.update(tags => [...tags, tag]);
      } else {
        this.selectedTags.update(tags => tags.filter(t => t !== tag));
      }
    }
    this.applyFilters();
  }

  searchProjects() {
    this.applyFilters();
  }

  applyFilters() {
    let filtered = [...this.repos()];

    if (this.selectedTags().length > 0) {
      filtered = filtered.filter(repo => this.selectedTags().every(tag => repo.topics.includes(tag)));
    }

    if (this.searchQuery().trim()) {
      const query = this.searchQuery().trim().toLowerCase();
      filtered = filtered.filter(repo =>
        repo.name.toLowerCase().includes(query) ||
        repo.description.toLowerCase().includes(query) ||
        repo.topics.some(topic => topic.toLowerCase().includes(query))
      );
    }

    if (this.sortOption()) {
      filtered = this.sortProjects(filtered, this.sortOption());
    }

    this.filteredRepos.update(() => filtered);
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

  clearFilters() {
    this.selectedTags.update(() => []);
    this.searchQuery.update(() => '');
    this.sortOption.update(() => '');
    this.filteredRepos.update(() => [...this.repos()]);
  }

  navigateToProjectDetail(id: string) {
    this.router.navigate(['/portfolio', id]);
  }

  showProjectInfo(id: string) {
    const repo = this.repos().find(r => r.name === id);
    if (repo) {
      repo.showInfo = true;
    }
  }

  hideProjectInfo(id: string) {
    const repo = this.repos().find(r => r.name === id);
    if (repo) {
      repo.showInfo = false;
    }
  }
}
