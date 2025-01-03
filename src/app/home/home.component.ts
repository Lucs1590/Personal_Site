import { Component, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    standalone: false
})
export class HomeComponent implements AfterViewInit {
  idade: number;

  private readonly birthDate = new Date(1999, 3, 27); // April (month index is 0-based)
  private readonly imageOption1 = 'url("../../assets/img/perfil_site.png")';
  private readonly imageOption2 = 'url("../../assets/img/principal-min.png")';
  private readonly animationClasses = {
    mainImage: ['animated', 'fadeInUp'],
    title: ['animated', 'fadeInLeft'],
    subtitle: ['animated', 'fadeInLeft'],
    interactive: ['animated', 'pulse']
  };

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    this.idade = this.calculateAge();
  }

  ngAfterViewInit(): void {
    this.applyInitialStyles();
    this.setupIntersectionObserver();
    this.addInteractiveElementListeners();
  }

  private calculateAge(): number {
    const currentDate = new Date();
    const diffInYears = currentDate.getFullYear() - this.birthDate.getFullYear();
    const isBeforeBirthday =
      currentDate.getMonth() < this.birthDate.getMonth() ||
      (currentDate.getMonth() === this.birthDate.getMonth() &&
        currentDate.getDate() < this.birthDate.getDate());
    return isBeforeBirthday ? diffInYears - 1 : diffInYears;
  }

  private applyInitialStyles(): void {
    const mainImageElement = this.elementRef.nativeElement.querySelector('.imgPrincipal');
    const title = this.elementRef.nativeElement.querySelector('#title_name');
    const subtitle = this.elementRef.nativeElement.querySelector('#sub_title');

    this.setStyleAndClasses(mainImageElement, 'background-image', this.getBackgroundImageUrl(), this.animationClasses.mainImage);
    this.setClasses(title, this.animationClasses.title);
    this.setClasses(subtitle, this.animationClasses.subtitle);
  }

  private setupIntersectionObserver(): void {
    const mainImageElement = this.elementRef.nativeElement.querySelector('.imgPrincipal');

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.renderer.setStyle(mainImageElement, 'background-image', this.getBackgroundImageUrl());
          observer.unobserve(entry.target);
        }
      });
    });

    observer.observe(mainImageElement);
  }

  private addInteractiveElementListeners(): void {
    const interactiveElements = this.elementRef.nativeElement.querySelectorAll('a, button');
    interactiveElements.forEach(element => {
      this.renderer.listen(element, 'mouseover', () => this.setClasses(element, this.animationClasses.interactive));
      this.renderer.listen(element, 'mouseout', () => this.removeClasses(element, this.animationClasses.interactive));
    });
  }

  private getBackgroundImageUrl(): string {
    return window.innerWidth >= 1350 ? this.imageOption1 : this.imageOption2;
  }

  private setStyleAndClasses(element: HTMLElement, styleName: string, styleValue: string, classes: string[]): void {
    this.renderer.setStyle(element, styleName, styleValue);
    this.setClasses(element, classes);
  }

  private setClasses(element: HTMLElement, classes: string[]): void {
    classes.forEach(className => this.renderer.addClass(element, className));
  }

  private removeClasses(element: HTMLElement, classes: string[]): void {
    classes.forEach(className => this.renderer.removeClass(element, className));
  }
}
