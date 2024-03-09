import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from './services/api.service';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private meta: Meta,
    private apiService: ApiService,
    private translate: TranslateService
  ) { }

  async ngOnInit(): Promise<void> {
    await this.setLanguage();
    this.setMetaTags();
  }

  async setLanguage() {
    const ipInfo = await firstValueFrom(this.apiService.getIPInfo());
    this.translate.setDefaultLang('pt');
    if (ipInfo?.country?.toUpperCase() !== 'BR') {
      this.translate.setDefaultLang('en');
    }
  }

  setMetaTags() {
    const date = new Date(Date.now());
    const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;

    this.meta.addTags([
      { name: 'description', content: 'Lucas Brito - Personal Website. AI, Machine Learning, Data' },
      { name: 'author', content: 'Lucs1590' },
      { name: 'keywords', content: 'Lucas Brito, Lucas de Brito Silva, Lucs1590, AI, Machine Learning, Personal Website, Data' },
      { name: 'robots', content: 'index, follow' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'date', content: formattedDate, scheme: 'DD/MM/YYYY' },
      { name: 'revised', content: formattedDate, scheme: 'DD/MM/YYYY' },
      { name: 'og:title', content: 'Lucas Brito - Personal Website' },
      { name: 'og:type', content: 'website' },
      { name: 'og:url', content: 'https://lucasbrito.com.br' },
      { name: 'og:image', content: 'https://www.lucasbrito.com.br/assets/img/principal-min-mob.png' },
      { name: 'og:description', content: 'Lucas Brito - Personal Website. AI, Machine Learning, Data' },
      { name: 'og:site_name', content: 'Lucas Brito' },
      { name: 'og:locale', content: 'pt_BR, en_US' },
      { name: 'twitter:card', content: 'summary_large_image' }, // Changed to summary_large_image for better Twitter card
      { name: 'twitter:site', content: '@lucs1590' },
      { name: 'twitter:title', content: 'Lucas Brito - Personal Website' },
      { name: 'twitter:description', content: 'Lucas Brito - Personal Website. AI, Machine Learning, Data' },
      { name: 'twitter:image', content: 'https://www.lucasbrito.com.br/assets/img/principal-min-mob.png' },
      { charset: 'UTF-8' }
    ]);
  }
}
