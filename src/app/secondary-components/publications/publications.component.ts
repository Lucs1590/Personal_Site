import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, defer, fromEvent, merge, of, switchMap } from 'rxjs';
import { Publication } from 'src/app/models/publication.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.css']
})
export class PublicationsComponent implements OnInit {
  blogPublications: Publication[];
  sciPublications: Publication[];
  loading = false;
  scholarImage: string;
  notFound = false; // Flag to indicate if publications were not found
  
  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute // Inject ActivatedRoute to access query parameters
  ) { }
  
  async ngOnInit(): Promise<void> {
    this.defineIconImage(null);
  
    // Parse query parameters
    const title = this.route.snapshot.queryParamMap.get('title');
    const category = this.route.snapshot.queryParamMap.get('category');
  
    await this.getBlogPublications(title, category);
    this.getSciPublications(title, category);
  
    setTimeout(() => {
      this.loading = true;
    }, 600);
  }

  public defineIconImage(event: MouseEvent): void {
    if (event && event.type === 'mouseover') {
      this.scholarImage = '../../../assets/img/icons/google-scholar2.svg';
    } else {
      this.scholarImage = '../../../assets/img/icons/google-scholar1.svg';
    }
  }


  async getBlogPublications(title: string, category: string): Promise<void> {
    const publications = await this.apiService.getFilteredPublications(title, category).toPromise();
    this.blogPublications = publications
      .sort((a, b) => b.publicationDate.getTime() - a.publicationDate.getTime())
      .splice(0, 6);
  }

  async getSciPublications(title: string, category: string): Promise<void> {
    const publications = await this.apiService.getFilteredPublications(title, category).toPromise();
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
}

