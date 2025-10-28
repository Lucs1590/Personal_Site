import { Component, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { Icon } from 'src/app/models/icon.model';
import { iconList } from 'src/assets/static_data/iconList';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
    selector: 'app-icones',
    templateUrl: './icones.component.html',
    styleUrls: ['./icones.component.css'],
    standalone: false
})
export class IconesComponent implements AfterViewInit {

  readonly iconList = iconList.map(icon => new Icon().deserialize(icon));

  constructor(private elementRef: ElementRef, private renderer: Renderer2, private utilsService: UtilsService) { }

  ngAfterViewInit(): void {
    this.modifyLinks();
  }

  private modifyLinks(): void {
    const links = this.elementRef.nativeElement.querySelectorAll('a');
    links.forEach((link: HTMLAnchorElement) => {
      const href = link.getAttribute('href');
      if (href) {
        const modifiedHref = this.utilsService.addUtmParameters(href);
        this.renderer.setAttribute(link, 'href', modifiedHref);
      }
    });
  }

  trackByIconLink(index: number, icon: Icon): string {
    return icon.link;
  }
}
