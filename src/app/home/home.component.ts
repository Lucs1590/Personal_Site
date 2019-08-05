import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  idade: number;
  constructor(private router: Router) { }

  ngOnInit() {
    this.idade = new Date().getFullYear() - 1999;
    if (window.innerWidth <= 991) {
      this.router.navigate(['m_home']);
    }
  }

}
