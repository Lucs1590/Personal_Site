// portfolio.component.ts
import { Component, OnInit } from '@angular/core';
import { Repository } from '../models/repository.model';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {
  repos: Repository[];
  filteredRepos: Repository[];
  filteredTags: string[];
  tags: string[];
  searchQuery: string = '';
  tagSearchQuery: string = '';

  constructor(private apiService: ApiService) { }

  async ngOnInit() {
    await this.getRepositories();
  }

  async getRepositories() {
    const repositories = await this.apiService.getAllRepositories('Lucs1590').toPromise();
    this.repos = repositories
      .sort((a, b) => b.updateDate.getTime() - a.updateDate.getTime())
      .filter(repo => repo.private === false);
    this.filteredRepos = [...this.repos];
    this.tags = this.extractTags(this.repos);
    this.filteredTags = [...this.tags];
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
      this.filteredRepos = [...this.repos];
    } else {
      this.filteredRepos = this.repos.filter(repo => repo.topics.includes(tag));
    }
  }

  searchProjects() {
    if (!this.searchQuery.trim()) {
      this.filteredRepos = [...this.repos];
    } else {
      const query = this.searchQuery.trim().toLowerCase();
      this.filteredRepos = this.repos.filter(repo =>
        repo.name.toLowerCase().includes(query)
      );
    }
  }

  filterTags() {
    if (!this.tagSearchQuery.trim()) {
      this.filteredTags = [...this.tags];
    } else {
      const query = this.tagSearchQuery.trim().toLowerCase();
      this.filteredTags = this.tags.filter(tag => tag.toLowerCase().includes(query));
    }
  }

  toggleTagFilter(tag: string) {
    const trimmedTag = tag.trim();
    const trimmedQuery = this.tagSearchQuery.trim();

    if (this.tagSearchQuery.includes(trimmedTag)) {
      this.tagSearchQuery = this.tagSearchQuery.replace(trimmedTag, '').trim();
    } else {
      if (trimmedTag.includes(trimmedQuery)) {
        this.tagSearchQuery = trimmedTag;
      } else {
        this.tagSearchQuery += ` ${trimmedTag}`;
      }
    }
    this.filterTags();
  }
}

