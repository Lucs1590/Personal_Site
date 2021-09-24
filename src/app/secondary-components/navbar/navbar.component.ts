import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  mobile: boolean = false;
  itemsList = [
    {
      name: 'Publications',
      ref: ['/publications'],
      mobile: false,
      desktop: true
    },
    {
      name: 'Portfolio',
      ref: '',
      mobile: false,
      desktop: false
    },
  ]

  constructor(
    public utils: UtilsService,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.mobile = window.innerWidth <= 991 ? true : false;
    this.itemsList = this.mobile ? this.itemsList?.filter(item => item.mobile) : this.itemsList?.filter(item => item.desktop);
  }

}
