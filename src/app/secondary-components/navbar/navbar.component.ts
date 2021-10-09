import { Component, OnInit } from '@angular/core';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  mobile: boolean = false;
  itemsList: { name: Promise<string> | string; ref: string[]; mobile: boolean; desktop: boolean }[];

  constructor(
    public utils: UtilsService,
    private translate: TranslateService
  ) {
    translate.onLangChange.subscribe((event: LangChangeEvent) => {
      this.defineMenu();
      this.itemsList = this.mobile ? this.itemsList?.filter(item => item.mobile) : this.itemsList?.filter(item => item.desktop);
    });
  }

  ngOnInit(): void {
    this.mobile = window.innerWidth <= 991 ? true : false;
    this.defineMenu();
    this.itemsList = this.mobile ? this.itemsList?.filter(item => item.mobile) : this.itemsList?.filter(item => item.desktop);
  }

  defineMenu() {
    this.itemsList = [
      {
        name: this.translate.get('nav.home').toPromise() as Promise<string>,
        ref: ['/'],
        mobile: true,
        desktop: true
      },
      {
        name: this.translate.get('nav.publications').toPromise(),
        ref: ['/publications'],
        mobile: true,
        desktop: true
      },
      {
        name: 'Portfolio',
        ref: [''],
        mobile: false,
        desktop: false
      },
    ];
  }

}
