import { Component, OnInit } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { UtilsService } from './services/utils.service';
import { NavigationEnd, Router } from '@angular/router';
import { CanonicalService } from './services/canonical.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false
})
export class AppComponent implements OnInit {

  constructor(
    private meta: Meta,
    private router: Router,
    private canonicalService: CanonicalService,
    private utilsService: UtilsService
  ) { }

  async ngOnInit(): Promise<void> {
    await this.utilsService.setLanguage();
    this.setMetaTags();
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const cleanUrl = this.router.url.split('?')[0];
        const canonicalUrl = `https://lucasbrito.com.br${cleanUrl}`;
        this.canonicalService.setCanonicalURL(canonicalUrl);
      }
    });
  }


  setMetaTags() {
    const date = new Date(Date.now());
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

    this.meta.addTags([
      { name: 'description', content: 'Lucas de Brito Silva. AI, Machine Learning, Data, Portfolio, Recommendations, Publications' },
      { name: 'author', content: 'Lucs1590' },
      { name: 'keywords', content: 'Lucas Brito, Lucas de Brito Silva, Lucs1590, AI, Machine Learning, Personal Website, Data, Portfolio, Recommendations, Publications' },
      { name: 'robots', content: 'index, follow' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'date', content: formattedDate, scheme: 'DD/MM/YYYY' },
      { name: 'revised', content: formattedDate, scheme: 'DD/MM/YYYY' },
      { name: 'og:title', content: 'Lucas de Brito Silva' },
      { name: 'og:type', content: 'website' },
      { name: 'og:url', content: 'https://lucasbrito.com.br' },
      { name: 'og:image', content: 'https://www.lucasbrito.com.br/assets/img/principal-min-mob.png' },
      { name: 'og:description', content: 'Lucas de Brito Silva. AI, Machine Learning, Data, Portfolio, Recommendations, Publications' },
      { name: 'og:site_name', content: 'Lucas Brito' },
      { name: 'og:locale', content: 'pt_BR, en_US' },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@lucs1590' },
      { name: 'twitter:title', content: 'Lucas de Brito Silva' },
      { name: 'twitter:description', content: 'Lucas de Brito Silva. AI, Machine Learning, Data, Portfolio, Recommendations, Publications' },
      { name: 'twitter:image', content: 'https://www.lucasbrito.com.br/assets/img/principal-min-mob.png' },
      { charset: 'UTF-8' }
    ]);
  }
}
