import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as AppActions from '../../store/app.actions';

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.css'],
    standalone: false
})
export class FooterComponent implements OnInit {

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(AppActions.loadFooterItems());
  }
}
