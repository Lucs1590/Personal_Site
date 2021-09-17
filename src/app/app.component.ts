import { Component, OnInit } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private title: Title,
    private meta: Meta
  ) { }

  ngOnInit(): void {
    this.title.setTitle("Lucas Brito")
    const date = new Date(Date.now());
    let formatedData = ((date.getDate())) + "/" + ((date.getMonth() + 1)) + "/" + date.getFullYear();
    this.meta.addTags([
      { name: 'description', content: 'Lucas Brito homepage.' },
      { name: 'author', content: 'Lucs1590' },
      { name: 'keywords', content: 'Brito, Lucs1590, Development, IA, Machine Learning, Fullstack' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { name: 'date', content: formatedData, scheme: 'DD-MM-YYYY' },
      { charset: 'UTF-8' }
    ]);
  }
}
