import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Technology } from 'src/app/models/technology.model';
import { techList } from 'src/assets/static_data/techList';



@Component({
  selector: 'app-technologies-list',
  templateUrl: './technologies-list.component.html',
  styleUrls: ['./technologies-list.component.css']
})
export class TechnologiesListComponent implements OnInit, AfterViewInit {
  public technologiesList: Technology[] = [];

  constructor() { }

  ngOnInit(): void {
    this.technologiesList = techList.map(icon => new Technology().deserialize(icon));
  }

  async ngAfterViewInit(): Promise<void> { }

  public openLink(link: string): void {
    window.open(link, '_blank').focus();
  }
}