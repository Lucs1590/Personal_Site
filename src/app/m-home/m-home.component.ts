import { Component, OnInit, AfterContentInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

declare var particlesJS: any;

@Component({
  selector: 'app-m-home',
  templateUrl: './m-home.component.html',
  styleUrls: ['./m-home.component.css']
})
export class MHomeComponent implements OnInit, AfterContentInit {
  CURRENT_LANG = 'pt';
  constructor(private translate: TranslateService) {
    translate.setDefaultLang('pt');
  }

  ngOnInit() {
    particlesJS.load('particles-js', '../assets/particlesjs-config.json');
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
