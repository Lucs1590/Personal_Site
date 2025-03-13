import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as AppActions from '../../store/app.actions';

declare let particlesJS: any;

@Component({
    selector: 'app-technologies',
    templateUrl: './technologies.component.html',
    styleUrls: ['./technologies.component.css'],
    standalone: false
})
export class TechnologiesComponent implements OnInit {

  constructor(private store: Store) { }

  ngOnInit(): void {
    particlesJS.load('particles-js', '../assets/particlesjs-config.json');
    this.store.dispatch(AppActions.loadTechnologies());
  }

}
