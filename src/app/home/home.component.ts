import { Component, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements AfterViewInit {
  idade: number;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    const birthDate = new Date(1999, 3, 27); // April is represented by 3 (0-based index)
    const currentDate = new Date();
    const diffInYears = currentDate.getFullYear() - birthDate.getFullYear();
    const isBeforeBirthday = currentDate.getMonth() < birthDate.getMonth() || (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate());
    this.idade = isBeforeBirthday ? diffInYears - 1 : diffInYears;
  }

  ngAfterViewInit(): void {
    const image1 = 'url("../../assets/img/perfil_site.png")';
    const image2 = 'url("../../assets/img/principal-min.png")';

    const title = this.elementRef.nativeElement.querySelector('#title_name');
    const subtitle = this.elementRef.nativeElement.querySelector('#sub_title');
    const elemento = this.elementRef.nativeElement.querySelector('.imgPrincipal');

    this.renderer.setStyle(elemento, 'background-image', window.innerWidth >= 1350 ? image1 : image2);
    this.renderer.addClass(elemento, 'animated');
    this.renderer.addClass(elemento, 'fadeInUp');
    this.renderer.addClass(title, 'animated');
    this.renderer.addClass(title, 'fadeInLeft');
    this.renderer.addClass(subtitle, 'animated');
    this.renderer.addClass(subtitle, 'fadeInLeft');
  }
}
