import { Component, OnInit } from '@angular/core';
import { Publication } from 'src/app/models/publication.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.css']
})
export class PublicationsComponent implements OnInit {
  publications: Publication[];
  loading = false;
  scholarImage: string;

  constructor(
    private apiService: ApiService
  ) { }

  async ngOnInit() {
    this.defineIconImage(null);
    await this.getPublications();
    setTimeout(() => {
      this.loading = true;
    }, 600);
  }

  public defineIconImage(event: MouseEvent): void {
    if (event && event.type === 'mouseover') {
      this.scholarImage = '../../../assets/img/google-scholar2.svg';
    } else {
      this.scholarImage = '../../../assets/img/google-scholar1.svg';
    }
  }


  async getPublications() {
    const publications = await this.apiService.getAllPublications().toPromise();
    this.publications = publications
      .sort((a, b) => b.publicationDate.getTime() - a.publicationDate.getTime())
      .splice(0, 6);
  }

}
