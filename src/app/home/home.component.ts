import { Component, AfterContentInit } from '@angular/core';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterContentInit {
  idade = new Date().getFullYear() - 1999;
  constructor(
    public utils: UtilsService
    ) {
  }

  ngAfterContentInit(): void {
    const image1 = 'url("../../assets/img/perfil_site.png")';
    const image2 = 'url("../../assets/img/principal-min.png")';

    const title = document.getElementById('title_name');
    const subtitle = document.getElementById('sub_title');
    const elemento = document.getElementsByClassName('imgPrincipal') as HTMLCollectionOf<HTMLElement>;

    elemento[0].style['background-image'] = window.innerWidth >= 1350 ? image1 : image2;
    elemento[0].classList.add('animated', 'fadeInUp');
    title.classList.add('animated', 'fadeInLeft');
    subtitle.classList.add('animated', 'fadeInLeft');
  }
}
