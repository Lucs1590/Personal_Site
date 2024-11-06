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
    const imageOption1 = 'url("../../assets/img/perfil_site.png")';
    const imageOption2 = 'url("../../assets/img/principal-min.png")';

    const title = this.elementRef.nativeElement.querySelector('#title_name');
    const subtitle = this.elementRef.nativeElement.querySelector('#sub_title');
    const mainImageElement = this.elementRef.nativeElement.querySelector('.imgPrincipal');

    this.renderer.setStyle(mainImageElement, 'background-image', window.innerWidth >= 1350 ? imageOption1 : imageOption2);
    this.renderer.addClass(mainImageElement, 'animated');
    this.renderer.addClass(mainImageElement, 'fadeInUp');
    this.renderer.addClass(title, 'animated');
    this.renderer.addClass(title, 'fadeInLeft');
    this.renderer.addClass(subtitle, 'animated');
    this.renderer.addClass(subtitle, 'fadeInLeft');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.renderer.setStyle(mainImageElement, 'background-image', window.innerWidth >= 1350 ? imageOption1 : imageOption2);
          observer.unobserve(entry.target);
        }
      });
    });

    observer.observe(mainImageElement);

    const interactiveElements = this.elementRef.nativeElement.querySelectorAll('a, button');
    interactiveElements.forEach(element => {
      this.renderer.listen(element, 'mouseover', () => {
        this.renderer.addClass(element, 'animated');
        this.renderer.addClass(element, 'pulse');
      });
      this.renderer.listen(element, 'mouseout', () => {
        this.renderer.removeClass(element, 'animated');
        this.renderer.removeClass(element, 'pulse');
      });
    });
  }
}
