import { Component, OnInit } from '@angular/core';

declare let particlesJS: any;

@Component({
    selector: 'app-technologies',
    templateUrl: './technologies.component.html',
    styleUrls: ['./technologies.component.css'],
    standalone: false
})
export class TechnologiesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    particlesJS.load('particles-js', '../assets/particlesjs-config.json');
  }

}
