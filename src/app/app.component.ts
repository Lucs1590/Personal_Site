import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import { ApiService } from './services/api.service';

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

  async ngOnInit() {
    await this.setLanguage();
    this.title.setTitle('Lucas Brito');
    const date = new Date(Date.now());
    const formatedData = ((date.getDate())) + '/' + ((date.getMonth() + 1)) + '/' + date.getFullYear();
    this.meta.addTags([
      { name: 'description', content: 'Lucas Brito homepage.' },
      { name: 'author', content: 'Lucs1590' },
      { name: 'keywords', content: 'Brito, Lucs1590, Development, IA, Machine Learning, Fullstack' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'date', content: formatedData, scheme: 'DD-MM-YYYY' },
      { charset: 'UTF-8' }
    ]);
  }

  async setLanguage() {
    const ipInfo = await this.apiService.getIPInfo().toPromise();
    this.translate.setDefaultLang('pt');
    if (ipInfo?.country?.toUpperCase() !== 'BR') {
      this.translate.setDefaultLang('en');
    };
  }
}
