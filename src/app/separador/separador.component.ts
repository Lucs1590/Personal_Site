import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-separador',
    templateUrl: './separador.component.html',
    styleUrls: ['./separador.component.css'],
    standalone: false
})
export class SeparadorComponent implements OnInit {
  mobile: boolean;

  constructor() { }

  ngOnInit() {
    this.mobile = window.innerWidth <= 991 ? true : false;
  }

}
