import { AfterViewChecked, AfterViewInit, Component } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements AfterViewChecked {

  constructor(
    public utils: UtilsService
  ) { }

  ngAfterViewChecked(): void {
    const windowSize = this.defineWindowSize();
    let spans = document.querySelectorAll('.glitch-text span');

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
