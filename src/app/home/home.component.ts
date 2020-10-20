import { Component, OnInit, AfterContentInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterContentInit {
  idade = new Date().getFullYear() - 1999;
  CURRENT_LANG = 'pt';
  constructor(private translate: TranslateService) {
    translate.setDefaultLang('pt');
  }

  ngOnInit() {
  }

  ngAfterContentInit(): void {
    const image1 = 'url("../../assets/img/perfil_site.png")';
    const image2 = 'url("../../assets/img/principal-min.jpg")';

    const title = document.getElementById('title_name');
    const subtitle = document.getElementById('sub_title');
    const elemento = document.getElementsByClassName('imgPrincipal') as HTMLCollectionOf<HTMLElement>;

    elemento[0].style['background-image'] = window.innerWidth >= 1350 ? image1 : image2;
    elemento[0].classList.add('animated', 'fadeInUp');
    title.classList.add('animated', 'fadeInLeft');
    subtitle.classList.add('animated', 'fadeInLeft');
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
