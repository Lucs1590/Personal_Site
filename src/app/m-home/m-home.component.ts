import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-m-home',
  templateUrl: './m-home.component.html',
  styleUrls: ['./m-home.component.css']
})
export class MHomeComponent implements OnInit {
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
