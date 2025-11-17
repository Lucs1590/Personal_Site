import { AfterViewChecked, AfterViewInit, Component, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';
import { SeoService } from 'src/app/services/seo.service';

@Component({
    selector: 'app-not-found',
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.css'],
    standalone: false
})
export class NotFoundComponent implements OnInit, AfterViewChecked {

  constructor(
    public utils: UtilsService,
    private seoService: SeoService
  ) { }

  ngOnInit(): void {
    this.updateSeoMetadata();
  }

  private updateSeoMetadata(): void {
    this.seoService.updateMetadata({
      title: '404 - Page Not Found | Lucas Brito',
      description: 'The page you are looking for could not be found. Return to Lucas Brito\'s homepage or explore other sections.',
      keywords: '404, Not Found, Lucas Brito'
    });
  }

  ngAfterViewChecked(): void {
    const windowSize = this.defineWindowSize();
    const spans = document.querySelectorAll('.glitch-text span');

    spans.forEach((span: HTMLElement) => {
      let middle = windowSize / 2 - span.offsetWidth / 2;
      middle = middle / 16;
      span.style.marginLeft = `${middle}rem`;
    });
  }

  defineWindowSize(): number {
    if (window.innerWidth >= 768) {
      return window.innerWidth;
    }
    const widthMobile = document.getElementsByClassName('div-effect')[0].clientWidth;
    return widthMobile;
  }
}
