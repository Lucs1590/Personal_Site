import { Component, OnInit, inject } from '@angular/core';
import { SeoService } from '../services/seo.service';
import { MHomeComponent } from '../m-home/m-home.component';
import { HomeComponent } from '../home/home.component';
import { RecommendationsComponent } from '../secondary-components/recommendations/recommendations.component';
import { PresentationsComponent } from '../secondary-components/presentations/presentations.component';

@Component({
  selector: 'app-separador',
  templateUrl: './separador.component.html',
  styleUrls: ['./separador.component.css'],
  imports: [MHomeComponent, HomeComponent, RecommendationsComponent, PresentationsComponent]
})
export class SeparadorComponent implements OnInit {
  private seoService = inject(SeoService);

  mobile: boolean;

  ngOnInit() {
    this.mobile = window.innerWidth <= 991 ? true : false;
    this.updateSeoMetadata();
  }

  private updateSeoMetadata(): void {
    this.seoService.updateMetadata({
      title: 'Lucas de Brito Silva - AI, Machine Learning & Data Science',
      description: 'Lucas de Brito Silva - AI Engineer, Machine Learning Engineer and Data Scientist specializing in computer vision, deep learning, and software development. Explore my portfolio, publications, and recommendations.',
      keywords: 'Lucas Brito, Lucas de Brito Silva, Lucs1590, AI Engineer, Machine Learning, Data Science, Personal Website',
      type: 'profile'
    });
  }

}
