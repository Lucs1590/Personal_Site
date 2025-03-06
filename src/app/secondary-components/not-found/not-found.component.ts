import { AfterViewChecked, AfterViewInit, Component } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
    selector: 'app-not-found',
    templateUrl: './not-found.component.html',
    styleUrls: ['./not-found.component.css'],
    standalone: false
})
export class NotFoundComponent implements AfterViewChecked {

  constructor(
    public utils: UtilsService
  ) { }

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
    return window.innerWidth >= 768 ? window.innerWidth : document.getElementsByClassName('div-effect')[0].clientWidth;
  }
}
