import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Publication } from 'src/app/models/publication.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
    selector: 'app-publications',
    templateUrl: './publications.component.html',
    styleUrls: ['./publications.component.css'],
    standalone: false
})
export class PublicationsComponent implements OnInit, AfterViewInit {
  blogPublications: Publication[];
  sciPublications: Publication[];
  loading = false;
  scholarImage: string;

  constructor(
    private apiService: ApiService,
    private activatedRoute: ActivatedRoute,
    private elementRef: ElementRef
  ) { }

  async ngOnInit(): Promise<void> {
    this.defineIconImage(null);
    this.getSciPublications();

    await this.getBlogPublications();
    this.filterPublications();
  }

  ngAfterViewInit(): void {
    const contentElement = this.elementRef.nativeElement.querySelector('.container-fluid');
    this.loading = !!contentElement && contentElement.innerHTML.trim() !== '';
  }

  public defineIconImage(event: MouseEvent): void {
    if (event && event.type === 'mouseover') {
      this.scholarImage = '../../../assets/img/icons/google-scholar2.svg';
    } else {
      this.scholarImage = '../../../assets/img/icons/google-scholar1.svg';
    }
  }

  async getBlogPublications(): Promise<void> {
    const publications = await this.apiService.getAllPublications().toPromise();
    this.blogPublications = publications
      .sort((a, b) => b.publicationDate.getTime() - a.publicationDate.getTime());
  }

  getSciPublications(): void {
    const publications = this.apiService.getAllSciPublications();
    this.sciPublications = publications;
    const parser = new DOMParser();

    this.sciPublications.map((publication) => {
      const parsedDescription = parser.parseFromString(publication.description, 'text/html');
      const sanitizedDescription = this.sanitizeHTML(parsedDescription.body.textContent || '');
      publication.description = sanitizedDescription.slice(0, 152) + '..</p>';
    });
  }

  sanitizeHTML(html: string): string {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  }

  filterPublications(): void {
    this.activatedRoute.queryParams.subscribe(params => {
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
}
