import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  idade = new Date().getFullYear() - 1999;
  CURRENT_LANG = 'pt';
  constructor(private translate: TranslateService) {
    translate.setDefaultLang('pt');
  }

  ngOnInit() {
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
