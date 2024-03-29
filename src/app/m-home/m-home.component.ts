import { Component, AfterContentInit } from '@angular/core';
import { UtilsService } from '../services/utils.service';

// declare let particlesJS: any;

@Component({
  selector: 'app-m-home',
  templateUrl: './m-home.component.html',
  styleUrls: ['./m-home.component.css']
})
export class MHomeComponent implements AfterContentInit {
  constructor(
    public utils: UtilsService
  ) { }

  ngAfterContentInit(): void {
    // particlesJS.load('particles-js', '../assets/particlesjs-config.json');
    const title = document.getElementById('title_name');
    const subtitle = document.getElementById('sub_title');

    title.classList.add('animated', 'zoomIn');
    subtitle.classList.add('animated', 'zoomIn');
  }
}
