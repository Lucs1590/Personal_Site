import { Component, AfterContentInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-m-home',
  templateUrl: './m-home.component.html',
  styleUrls: ['./m-home.component.css']
})
export class MHomeComponent implements AfterContentInit {
  CURRENT_LANG = 'pt';
  constructor(private translate: TranslateService) {
    translate.setDefaultLang('pt');
  }

  ngAfterContentInit(): void {
    const title = document.getElementById('title_name');
    const subtitle = document.getElementById('sub_title');

    title.classList.add('animated', 'zoomIn');
    subtitle.classList.add('animated', 'zoomIn');
  }

  useLanguage() {
    if (this.CURRENT_LANG.match('pt')) {
      this.CURRENT_LANG = 'en';
      this.translate.use(this.CURRENT_LANG);
    } else {
      this.CURRENT_LANG = 'pt';
      this.translate.use(this.CURRENT_LANG);
    }
  }
}
