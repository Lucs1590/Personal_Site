import { Component, AfterContentInit, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { UtilsService } from '../services/utils.service';

@Component({
  selector: 'app-m-home',
  templateUrl: './m-home.component.html',
  styleUrls: ['./m-home.component.css']
})
export class MHomeComponent implements AfterContentInit, AfterViewInit {
  constructor(
    public utils: UtilsService,
    private elementRef: ElementRef,
    private renderer: Renderer2
  ) { }

  ngAfterContentInit(): void {
    const title = document.getElementById('title_name');
    const subtitle = document.getElementById('sub_title');

    title.classList.add('animated', 'zoomIn');
    subtitle.classList.add('animated', 'zoomIn');
  }

  ngAfterViewInit(): void {
    // Subtle animations for interactive elements and transitions
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
