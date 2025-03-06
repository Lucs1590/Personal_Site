import { Component, OnInit, Signal, signal, computed } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { UtilsService } from './services/utils.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: false
})
export class AppComponent implements OnInit {
  private readonly description = signal('Lucas Brito - Personal Website. AI, Machine Learning, Data');
  private readonly author = signal('Lucs1590');
  private readonly keywords = signal('Lucas Brito, Lucas de Brito Silva, Lucs1590, AI, Machine Learning, Personal Website, Data');
  private readonly robots = signal('index, follow');
  private readonly viewport = signal('width=device-width, initial-scale=1');
  private readonly date = signal(new Date(Date.now()));
  private readonly formattedDate = computed(() => `${this.date().getDate()}/${this.date().getMonth() + 1}/${this.date().getFullYear()}`);
  private readonly ogTitle = signal('Lucas Brito - Personal Website');
  private readonly ogType = signal('website');
  private readonly ogUrl = signal('https://lucasbrito.com.br');
  private readonly ogImage = signal('https://www.lucasbrito.com.br/assets/img/principal-min-mob.png');
  private readonly ogDescription = signal('Lucas Brito - Personal Website. AI, Machine Learning, Data');
  private readonly ogSiteName = signal('Lucas Brito');
  private readonly ogLocale = signal('pt_BR, en_US');
  private readonly twitterCard = signal('summary_large_image');
  private readonly twitterSite = signal('@lucs1590');
  private readonly twitterTitle = signal('Lucas Brito - Personal Website');
  private readonly twitterDescription = signal('Lucas Brito - Personal Website. AI, Machine Learning, Data');
  private readonly twitterImage = signal('https://www.lucasbrito.com.br/assets/img/principal-min-mob.png');
  private readonly charset = signal('UTF-8');

  constructor(
    private meta: Meta,
    private utilsService: UtilsService
  ) { }

  async ngOnInit(): Promise<void> {
    await this.utilsService.setLanguage();
    this.setMetaTags();
  }

  setMetaTags() {
    this.meta.addTags([
      { name: 'description', content: this.description() },
      { name: 'author', content: this.author() },
      { name: 'keywords', content: this.keywords() },
      { name: 'robots', content: this.robots() },
      { name: 'viewport', content: this.viewport() },
      { name: 'date', content: this.formattedDate(), scheme: 'DD/MM/YYYY' },
      { name: 'revised', content: this.formattedDate(), scheme: 'DD/MM/YYYY' },
      { name: 'og:title', content: this.ogTitle() },
      { name: 'og:type', content: this.ogType() },
      { name: 'og:url', content: this.ogUrl() },
      { name: 'og:image', content: this.ogImage() },
      { name: 'og:description', content: this.ogDescription() },
      { name: 'og:site_name', content: this.ogSiteName() },
      { name: 'og:locale', content: this.ogLocale() },
      { name: 'twitter:card', content: this.twitterCard() },
      { name: 'twitter:site', content: this.twitterSite() },
      { name: 'twitter:title', content: this.twitterTitle() },
      { name: 'twitter:description', content: this.twitterDescription() },
      { name: 'twitter:image', content: this.twitterImage() },
      { charset: this.charset() }
    ]);
  }
}
