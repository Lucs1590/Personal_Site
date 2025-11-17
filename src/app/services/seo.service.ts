import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

export interface PageMetadata {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  type?: string;
  author?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private readonly defaultMetadata: PageMetadata = {
    title: 'Lucas de Brito Silva',
    description: 'Lucas de Brito Silva - AI, Machine Learning, Data Science, Portfolio, Recommendations, Publications',
    keywords: 'Lucas Brito, Lucas de Brito Silva, Lucs1590, AI, Machine Learning, Personal Website, Data, Portfolio, Recommendations, Publications',
    image: 'https://www.lucasbrito.com.br/assets/img/principal-min-mob.png',
    type: 'website',
    author: 'Lucas de Brito Silva'
  };

  constructor(
    private meta: Meta,
    private title: Title,
    private router: Router
  ) { }

  /**
   * Updates page metadata including title, description, Open Graph, and Twitter Card tags
   */
  updateMetadata(metadata: Partial<PageMetadata>): void {
    const pageMetadata = { ...this.defaultMetadata, ...metadata };
    const currentUrl = `https://lucasbrito.com.br${this.router.url.split('?')[0]}`;

    this.title.setTitle(pageMetadata.title);

    this.meta.updateTag({ name: 'description', content: pageMetadata.description });
    this.meta.updateTag({ name: 'keywords', content: pageMetadata.keywords || this.defaultMetadata.keywords });
    this.meta.updateTag({ name: 'author', content: pageMetadata.author || this.defaultMetadata.author || '' });

    this.meta.updateTag({ property: 'og:title', content: pageMetadata.title });
    this.meta.updateTag({ property: 'og:description', content: pageMetadata.description });
    this.meta.updateTag({ property: 'og:image', content: pageMetadata.image || this.defaultMetadata.image || '' });
    this.meta.updateTag({ property: 'og:url', content: currentUrl });
    this.meta.updateTag({ property: 'og:type', content: pageMetadata.type || this.defaultMetadata.type || 'website' });
    this.meta.updateTag({ property: 'og:site_name', content: 'Lucas Brito' });
    this.meta.updateTag({ property: 'og:locale', content: 'pt_BR' });

    this.meta.updateTag({ name: 'twitter:card', content: 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:site', content: '@lucs1590' });
    this.meta.updateTag({ name: 'twitter:creator', content: '@lucs1590' });
    this.meta.updateTag({ name: 'twitter:title', content: pageMetadata.title });
    this.meta.updateTag({ name: 'twitter:description', content: pageMetadata.description });
    this.meta.updateTag({ name: 'twitter:image', content: pageMetadata.image || this.defaultMetadata.image || '' });
  }

  /**
   * Initializes default metadata for the site
   */
  initializeDefaultMetadata(): void {
    this.updateMetadata(this.defaultMetadata);

    this.meta.updateTag({ name: 'robots', content: 'index, follow' });

    if (!this.meta.getTag('name="viewport"')) {
      this.meta.addTag({ name: 'viewport', content: 'width=device-width, initial-scale=1' });
    }
  }

  /**
   * Sets up automatic metadata updates on route changes
   */
  setupRouteMetadataUpdates(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updateMetadata({});
      });
  }
}
