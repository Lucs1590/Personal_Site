import { Component, OnInit } from '@angular/core';
import { SeoService } from '../services/seo.service';

@Component({
    selector: 'app-separador',
    templateUrl: './separador.component.html',
    styleUrls: ['./separador.component.css'],
    standalone: false
})
export class SeparadorComponent implements OnInit {
  mobile: boolean;

  constructor(private seoService: SeoService) { }

  ngOnInit() {
    this.mobile = window.innerWidth <= 991 ? true : false;
    this.updateSeoMetadata();
  }

  private updateSeoMetadata(): void {
    this.seoService.updateMetadata({
      title: 'Lucas de Brito Silva - AI, Machine Learning & Data Science',
      description: 'Lucas de Brito Silva - AI Engineer, Machine Learning enthusiast, and Data Science professional. Explore my portfolio, publications, and recommendations.',
      keywords: 'Lucas Brito, Lucas de Brito Silva, Lucs1590, AI Engineer, Machine Learning, Data Science, Personal Website',
      type: 'profile'
    });
  }

}
