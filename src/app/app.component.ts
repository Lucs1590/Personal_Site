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
    private title: Title,
    private meta: Meta,
    private apiService: ApiService,
    private translate: TranslateService
  ) { }

  async ngOnInit(): Promise<void> {
    await this.setLanguage();
    this.title.setTitle('Lucas Brito');
    const date = new Date(Date.now());

    const formatedData = `${(date.getDate())}/${(date.getMonth() + 1)}/${date.getFullYear()}`;

    this.meta.addTags([
      { name: 'description', content: 'Lucas Brito' },
      { name: 'author', content: 'Lucs1590' },
      { name: 'keywords', content: 'Lucas Brito, Lucs1590, AI, IA, Machine Learning' },
      { name: 'robots', content: 'index, follow' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'date', content: formatedData, scheme: 'DD/MM/YYYY' },
      { name: 'revised', content: formatedData, scheme: 'DD/MM/YYYY' },
      { name: 'og:title', content: 'Lucas Brito' },
      { name: 'og:type', content: 'website' },
      { name: 'og:url', content: 'https://lucasbrito.com.br' },
      { name: 'og:description', content: 'Lucas Brito' },
      { name: 'og:site_name', content: 'Lucas Brito' },
      { name: 'og:locale', content: 'pt_BR, en_US' },
      { charset: 'UTF-8' }
    ]);
  }

  async setLanguage() {
    const ipInfo = await firstValueFrom(this.apiService.getIPInfo());
    this.translate.setDefaultLang('pt');
    if (ipInfo?.country?.toUpperCase() !== 'BR') {
      this.translate.setDefaultLang('en');
    };
  }
}
