import { Component, OnInit, AfterViewInit, ElementRef, Renderer2, OnDestroy } from '@angular/core';
import { firstValueFrom, Subject, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Publication } from 'src/app/models/publication.model';
import { ApiService } from 'src/app/services/api.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.css'],
  standalone: false
})
export class PublicationsComponent implements OnInit, AfterViewInit, OnDestroy {
  blogPublications: Publication[] = [];
  sciPublications: Publication[] = [];
  filteredSciPublications: Publication[] = [];
  loading = false;
  scholarImage: string = '../../../assets/img/icons/google-scholar1.svg';
  selectedYear = 'all';
  selectedType = 'all';
  availableYears: number[] = [];
  availableTypes: string[] = [];

  private readonly destroy$ = new Subject<void>();

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private elementRef: ElementRef,
    private utilsService: UtilsService,
    private renderer: Renderer2
  ) { }

  async ngOnInit(): Promise<void> {
    this.getSciPublications();
    await this.getBlogPublications();
    this.filterPublications();
  }

  ngAfterViewInit(): void {
    const contentElement = this.elementRef.nativeElement.querySelector('.container-fluid');
    this.loading = !!contentElement && contentElement.innerHTML.trim() !== '';
    this.modifyLinks();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public defineIconImage(event: MouseEvent | null): void {
    if (event?.type === 'mouseover') {
      this.scholarImage = '../../../assets/img/icons/google-scholar2.svg';
    } else {
      this.scholarImage = '../../../assets/img/icons/google-scholar1.svg';
    }
  }

  async getBlogPublications(): Promise<void> {
    try {
      const publications = await firstValueFrom(this.apiService.getAllPublications());
      this.blogPublications = publications
        .map((publication: Publication) => {
          publication.url = this.utilsService.addUtmParameters(publication.url);
          return publication;
        })
        .sort((a: Publication, b: Publication) => b.publicationDate.getTime() - a.publicationDate.getTime());
    } catch (error) {
      console.error('Error fetching blog publications:', error);
      this.blogPublications = [];
    }
  }

  getSciPublications(): void {
    const publications = this.apiService.getAllSciPublications();
    this.sciPublications = publications;
    const parser = new DOMParser();

    this.sciPublications.forEach((publication) => {
      const parsedDescription = parser.parseFromString(publication.description, 'text/html');
      const sanitizedDescription = this.sanitizeHTML(parsedDescription.body.textContent || '');
      publication.description = sanitizedDescription.slice(0, 152) + '..</p>';
    });

    this.availableYears = [...new Set(this.sciPublications.map(p => p.year).filter((y): y is number => y !== undefined))].sort((a, b) => b - a);
    this.availableTypes = [...new Set(this.sciPublications.map(p => p.type).filter((t): t is string => t !== undefined))];
    this.applyFilters();
  }

  applyFilters(): void {
    this.filteredSciPublications = this.sciPublications.filter(pub => {
      const yearMatch = this.selectedYear === 'all' || pub.year === parseInt(this.selectedYear, 10);
      const typeMatch = this.selectedType === 'all' || pub.type === this.selectedType;
      return yearMatch && typeMatch;
    });
  }

  onYearChange(year: string): void {
    this.selectedYear = year;
    this.applyFilters();
  }

  onTypeChange(type: string): void {
    this.selectedType = type;
    this.applyFilters();
  }

  sanitizeHTML(html: string): string {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  }

  filterPublications(): void {
    this.activatedRoute.queryParams
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        const searchQuery = params['search']?.toLowerCase();
        if (!searchQuery) return;

        this.blogPublications = this.blogPublications.filter(publication =>
          publication.title.toLowerCase().includes(searchQuery) ||
          publication.description.toLowerCase().includes(searchQuery)
        );

        this.sciPublications = this.sciPublications.filter(publication =>
          publication.title.toLowerCase().includes(searchQuery) ||
          publication.description.toLowerCase().includes(searchQuery)
        );
      });
  }

  private modifyLinks(): void {
    const links = this.elementRef.nativeElement.querySelectorAll('a');
    links.forEach((link: HTMLAnchorElement) => {
      const href = link.getAttribute('href');
      if (href) {
        const modifiedHref = this.utilsService.addUtmParameters(href);
        this.renderer.setAttribute(link, 'href', modifiedHref);
      }
    });
  }

  trackByPublicationId(index: number, publication: Publication): string {
    return publication.url || publication.title || index.toString();
  }

  trackByYear(index: number, year: number): number {
    return year;
  }

  trackByType(index: number, type: string): string {
    return type;
  }
}
