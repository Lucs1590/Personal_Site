import { Injectable, Inject, Renderer2, RendererFactory2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CanonicalService {
  private renderer: Renderer2;

  constructor(@Inject(DOCUMENT) private document: Document, rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
  }

  setCanonicalURL(url?: string) {
    let cleanUrl = url || this.document.location.href;

    cleanUrl = cleanUrl.replace(/index\.html$/, '');
    cleanUrl = cleanUrl.split('?')[0];
    cleanUrl = cleanUrl.replace(/^https?:\/\/www\./, 'https://'); // Removendo "www."

    let link: HTMLLinkElement = this.document.querySelector('link[rel="canonical"]') ||
      this.document.createElement('link');

    if (!link.parentElement) {
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }

    this.renderer.setAttribute(link, 'href', cleanUrl);
  }
}
