import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Icon } from 'src/app/models/icon.model';
import { iconList } from 'src/assets/static_data/iconList';
import * as AppActions from '../../store/app.actions';

@Component({
    selector: 'app-icones',
    templateUrl: './icones.component.html',
    styleUrls: ['./icones.component.css'],
    standalone: false
})
export class IconesComponent implements OnInit {

  iconList = iconList.map(icon => new Icon().deserialize(icon));

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(AppActions.loadIcons());
  }
}
