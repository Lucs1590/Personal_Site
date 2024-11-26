import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

import { PortfolioComponent } from './portfolio.component';
import { ApiService } from '../services/api.service';
import { Repository } from '../models/repository.model';

describe('PortfolioComponent', () => {
  let component: PortfolioComponent;
  let fixture: ComponentFixture<PortfolioComponent>;
  let router: Router;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PortfolioComponent],
      providers: [HttpClient, HttpHandler, ApiService],
      imports: [RouterTestingModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PortfolioComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should filter projects by tag', () => {
    const repos: Repository[] = [
      { id: '1', name: 'Repo1', topics: ['SOFTWARE'], private: false, updateDate: new Date() },
      { id: '2', name: 'Repo2', topics: ['OTHERS'], private: false, updateDate: new Date() }
    ];
    component.repos = repos;
    component.filterByTag('SOFTWARE');
    expect(component.filteredRepos.length).toBe(1);
    expect(component.filteredRepos[0].name).toBe('Repo1');
  });

  it('should navigate to project detail page', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.navigateToProjectDetail('1');
    expect(navigateSpy).toHaveBeenCalledWith(['/portfolio', '1']);
  });

  it('should filter projects by search query', () => {
    const repos: Repository[] = [
      { id: '1', name: 'Repo1', description: 'Description1', topics: ['SOFTWARE'], private: false, updateDate: new Date() },
      { id: '2', name: 'Repo2', description: 'Description2', topics: ['OTHERS'], private: false, updateDate: new Date() }
    ];
    component.repos = repos;
    component.searchQuery = 'Repo1';
    component.searchProjects();
    expect(component.filteredRepos.length).toBe(1);
    expect(component.filteredRepos[0].name).toBe('Repo1');
  });

  it('should sort projects by date', () => {
    const repos: Repository[] = [
      { id: '1', name: 'Repo1', topics: ['SOFTWARE'], private: false, updateDate: new Date('2022-01-01') },
      { id: '2', name: 'Repo2', topics: ['OTHERS'], private: false, updateDate: new Date('2023-01-01') }
    ];
    component.repos = repos;
    component.sortOption = 'date';
    component.applyFilters();
    expect(component.filteredRepos[0].name).toBe('Repo2');
  });

  it('should sort projects by name', () => {
    const repos: Repository[] = [
      { id: '1', name: 'BRepo', topics: ['SOFTWARE'], private: false, updateDate: new Date() },
      { id: '2', name: 'ARepo', topics: ['OTHERS'], private: false, updateDate: new Date() }
    ];
    component.repos = repos;
    component.sortOption = 'name';
    component.applyFilters();
    expect(component.filteredRepos[0].name).toBe('ARepo');
  });

  it('should show project info on hover', () => {
    const repos: Repository[] = [
      { id: '1', name: 'Repo1', topics: ['SOFTWARE'], private: false, updateDate: new Date(), showInfo: false }
    ];
    component.repos = repos;
    component.showProjectInfo('1');
    expect(component.repos[0].showInfo).toBe(true);
  });

  it('should hide project info on mouse out', () => {
    const repos: Repository[] = [
      { id: '1', name: 'Repo1', topics: ['SOFTWARE'], private: false, updateDate: new Date(), showInfo: true }
    ];
    component.repos = repos;
    component.hideProjectInfo('1');
    expect(component.repos[0].showInfo).toBe(false);
  });
});
