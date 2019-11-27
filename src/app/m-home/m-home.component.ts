import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-m-home',
  templateUrl: './m-home.component.html',
  styleUrls: ['./m-home.component.css']
})
export class MHomeComponent implements OnInit {
  TEXT_TRANS = 'en';

  constructor() { }

  ngOnInit() {
  }

  translate() {
    if (this.TEXT_TRANS.match('pt')) {
      this.TEXT_TRANS = 'en';
    } else {
      this.TEXT_TRANS = 'pt';
    }
  }

}
