import { Component, AfterContentInit, AfterViewInit, ElementRef, Renderer2, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-m-home',
  templateUrl: './m-home.component.html',
  styleUrls: ['./m-home.component.css'],
  standalone: false
})
export class MHomeComponent implements AfterContentInit, AfterViewInit, OnDestroy {
  subtitles: string[] = [];
  private subtitleIndex = 0;
  private subtitleInterval: ReturnType<typeof setInterval> | undefined;
  private translateSubscription: Subscription | undefined;

  constructor(
    public utils: UtilsService,
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private translate: TranslateService
  ) { }

  ngAfterContentInit(): void {
    const title = document.getElementById('title_name');

    if (title) {
      title.classList.add('animated', 'zoomIn');
    }
  }

  ngAfterViewInit(): void {
    // Subtle animations for interactive elements and transitions
    const interactiveElements = this.elementRef.nativeElement.querySelectorAll('a, button');
    interactiveElements.forEach((element: HTMLElement) => {
      this.renderer.listen(element, 'mouseover', () => {
        this.renderer.addClass(element, 'animated');
        this.renderer.addClass(element, 'pulse');
      });
      this.renderer.listen(element, 'mouseout', () => {
        this.renderer.removeClass(element, 'animated');
        this.renderer.removeClass(element, 'pulse');
      });
    });

    this.setupSubtitleRotation();
  }

  ngOnDestroy(): void {
    if (this.subtitleInterval) {
      clearInterval(this.subtitleInterval);
      this.subtitleInterval = undefined;
    }
    if (this.translateSubscription) {
      this.translateSubscription.unsubscribe();
      this.translateSubscription = undefined;
    }
  }

  private setupSubtitleRotation(): void {
    const subtitleEl: HTMLElement | null = this.elementRef.nativeElement.querySelector('#sub_title');
    if (!subtitleEl) return;
    this.translateSubscription = this.translate.stream('home.subtitles').subscribe((subs: unknown) => {
      if (!subs || !Array.isArray(subs) || subs.length === 0) return;
      this.subtitles = subs as string[];

      if (this.subtitleInterval) {
        clearInterval(this.subtitleInterval);
        this.subtitleInterval = undefined;
      }

      this.subtitleIndex = 0;
      this.renderGlitchSubtitle(this.subtitles[this.subtitleIndex], subtitleEl);

      this.subtitleInterval = setInterval(() => {
        this.subtitleIndex = (this.subtitleIndex + 1) % this.subtitles.length;
        this.renderGlitchSubtitle(this.subtitles[this.subtitleIndex], subtitleEl);
      }, 3000);
    });
  }

  private renderGlitchSubtitle(text: string, container: HTMLElement): void {
    // Remove all existing glitch subtitles to prevent duplicates on rapid language changes
    const existingElements = container.querySelectorAll('.glitch-subtitle');
    existingElements.forEach((existing) => {
      this.renderer.addClass(existing, 'leaving');
      setTimeout(() => {
        existing.remove();
      }, 300);
    });

    const wrapper = this.renderer.createElement('span');
    this.renderer.addClass(wrapper, 'glitch-subtitle');
    this.renderer.addClass(wrapper, 'entering');

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

    setTimeout(() => {
      this.renderer.removeClass(wrapper, 'entering');
    }, 300);
  }
}
