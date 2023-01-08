import { Component, OnInit } from '@angular/core';
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

  constructor(
    private apiService: ApiService
  ) { }

  async ngOnInit(): Promise<void> {
    this.defineIconImage(null);
    this.getSciPublications();

    await this.getBlogPublications();

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


  async getBlogPublications(): Promise<void> {
    const publications = await this.apiService.getAllPublications().toPromise();
    this.blogPublications = publications
      .sort((a, b) => b.publicationDate.getTime() - a.publicationDate.getTime())
      .splice(0, 6);
  }

  getSciPublications(): void {
    const publications = this.apiService.getAllSciPublications();
    this.sciPublications = publications;
    this.sciPublications.map((publication) =>
      publication.description = '<p>'.concat(
        publication?.description
          .slice(publication?.description.indexOf('<p>'), publication?.description.indexOf('</p>'))
          .replace(new RegExp('<.+?>', 'g'), '')
          .slice(0, 152),
        '..</p>')
    );
  }

}
