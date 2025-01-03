import { Component } from '@angular/core';
import { Icon } from 'src/app/models/icon.model';
import { iconList } from 'src/assets/static_data/iconList'

@Component({
    selector: 'app-icones',
    templateUrl: './icones.component.html',
    styleUrls: ['./icones.component.css'],
    standalone: false
})
export class IconesComponent {

  iconList = iconList.map(icon => new Icon().deserialize(icon));

  constructor() { }
}
