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

  constructor(private apiService: ApiService) { }

  async ngOnInit() {
    await this.getPublications();
  }

  async getPublications() {
    const publications = await this.apiService.getAllPublications().toPromise();
    this.publications = publications.sort((a, b) => b.publicationDate.getTime() - a.publicationDate.getTime());
  }

}
