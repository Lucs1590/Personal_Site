import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-m-home',
  templateUrl: './m-home.component.html',
  styleUrls: ['./m-home.component.css']
})
export class MHomeComponent implements OnInit {
  TEXT_TRANS = 'en';
  constructor(private router: Router) { }

  ngOnInit() {
    if (window.innerWidth >= 992) {
      this.router.navigate(['home']);
    }
  }

  translate() {
    if (this.TEXT_TRANS.match('pt')) {
      this.TEXT_TRANS = 'en';
    } else {
      this.TEXT_TRANS = 'pt';
    }
  }
}
