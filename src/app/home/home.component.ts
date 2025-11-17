import { Component, AfterViewInit, ElementRef, Renderer2, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  standalone: false
})
export class HomeComponent implements AfterViewInit, OnDestroy {
  idade: number;
  subtitles: string[] = [];
  private subtitleIndex = 0;
  private subtitleInterval: number | undefined;

  private readonly birthDate = new Date(1999, 3, 27); // April (month index is 0-based)
  private readonly imageOption1 = 'url("../../assets/img/perfil_site.png")';
  private readonly imageOption2 = 'url("../../assets/img/principal-min.png")';
  private readonly animationClasses = {
    mainImage: ['animated', 'fadeInUp'],
    title: ['animated', 'fadeInLeft'],
    subtitle: ['animated', 'fadeInLeft'],
    interactive: ['animated', 'pulse']
  } as const;

  constructor(private elementRef: ElementRef, private renderer: Renderer2, private translate: TranslateService) {
    this.idade = this.calculateAge();
  }

  ngAfterViewInit(): void {
    this.applyInitialStyles();
    this.setupIntersectionObserver();
    this.addInteractiveElementListeners();
    this.setupSubtitleRotation();
  }

  ngOnDestroy(): void {
    if (this.subtitleInterval) {
      clearInterval(this.subtitleInterval);
      this.subtitleInterval = undefined;
    }
  }

  private setupSubtitleRotation(): void {
    const subtitleEl: HTMLElement | null = this.elementRef.nativeElement.querySelector('#sub_title');
    if (!subtitleEl) return;
    this.translate.stream('home.subtitles').subscribe((subs: any) => {
      if (!subs || !Array.isArray(subs) || subs.length === 0) return;
      this.subtitles = subs as string[];

      if (this.subtitleInterval) {
        clearInterval(this.subtitleInterval);
        this.subtitleInterval = undefined;
      }

      this.subtitleIndex = 0;
      this.renderGlitchSubtitle(this.subtitles[this.subtitleIndex], subtitleEl);

      this.subtitleInterval = window.setInterval(() => {
        this.subtitleIndex = (this.subtitleIndex + 1) % this.subtitles.length;
        this.renderGlitchSubtitle(this.subtitles[this.subtitleIndex], subtitleEl);
      }, 3000) as unknown as number;
    });
  }

  private renderGlitchSubtitle(text: string, container: HTMLElement): void {
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    const wrapper = this.renderer.createElement('span');
    this.renderer.addClass(wrapper, 'glitch-subtitle');

    for (let i = 0; i < 3; i++) {
      const span = this.renderer.createElement('span');
      if (i !== 1) {
        this.renderer.setAttribute(span, 'aria-hidden', 'true');
      }
      const textNode = this.renderer.createText(text);
      this.renderer.appendChild(span, textNode);
      this.renderer.appendChild(wrapper, span);
    }

    this.renderer.appendChild(container, wrapper);
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

    if (mainImageElement) {
      this.setStyleAndClasses(mainImageElement, 'background-image', this.getBackgroundImageUrl(), this.animationClasses.mainImage);
    }
    if (title) {
      this.setClasses(title, this.animationClasses.title);
    }
    if (subtitle) {
      this.setClasses(subtitle, this.animationClasses.subtitle);
    }
  }

  private setupIntersectionObserver(): void {
    const mainImageElement = this.elementRef.nativeElement.querySelector('.imgPrincipal');
    if (!mainImageElement) return;

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
    interactiveElements.forEach((element: HTMLElement) => {
      this.renderer.listen(element, 'mouseover', () => this.setClasses(element, this.animationClasses.interactive));
      this.renderer.listen(element, 'mouseout', () => this.removeClasses(element, this.animationClasses.interactive));
    });
  }

  private getBackgroundImageUrl(): string {
    return window.innerWidth >= 1350 ? this.imageOption1 : this.imageOption2;
  }

  private setStyleAndClasses(element: HTMLElement, styleName: string, styleValue: string, classes: readonly string[]): void {
    this.renderer.setStyle(element, styleName, styleValue);
    this.setClasses(element, classes);
  }

  private setClasses(element: HTMLElement, classes: readonly string[]): void {
    classes.forEach(className => this.renderer.addClass(element, className));
  }

  private removeClasses(element: HTMLElement, classes: readonly string[]): void {
    classes.forEach(className => this.renderer.removeClass(element, className));
  }
}
