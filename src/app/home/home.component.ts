import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  idade = new Date().getFullYear() - 1999;
  TEXT_TRANS = 'en';
  constructor(private router: Router) { }

  ngOnInit() {
    if (window.innerWidth <= 991) {
      this.router.navigate(['m_home']);
    }
  }

  trasnlate() {
    if (this.TEXT_TRANS.match('pt')) {
      this.TEXT_TRANS = 'en';
    } else {
      this.TEXT_TRANS = 'pt';
    }
  }

}
