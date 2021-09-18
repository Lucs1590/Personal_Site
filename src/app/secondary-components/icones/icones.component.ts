import { Component, OnInit } from '@angular/core';
import { Icon } from 'src/app/models/icon.model';

@Component({
  selector: 'app-icones',
  templateUrl: './icones.component.html',
  styleUrls: ['./icones.component.css']
})
export class IconesComponent implements OnInit {

  constructor() { }

  iconList = [
    {
      icon: ['fas', 'envelope'],
      link: 'mailto:lucasbsilva29@gmail.com?subject=Brito%20Web%20Site&body=Ola%20Lucas%20Brito',
      active: true
    },
    {
      icon: ['fab', 'facebook-f'],
      link: 'https://www.facebook.com/lucas.brito.100',
      active: true
    },
    {
      icon: ['fab', 'medium'],
      link: 'https://medium.com/@lucasbsilva29',
      active: true
    },
    {
      icon: ['fab', 'twitter'],
      link: 'https://twitter.com/Lucs1590',
      active: true
    },
    {
      icon: ['fab', 'linkedin'],
      link: 'https://www.linkedin.com/in/lucas-brito100/',
      active: true
    },
    {
      icon: ['fab', 'github'],
      link: 'https://github.com/Lucs1590',
      active: true
    },
    {
      icon: ['fab', 'stack-overflow'],
      link: 'https://pt.stackoverflow.com/users/122718/lucas-brito',
      active: true
    },
    {
      icon: ['fab', 'whatsapp'],
      link: 'https://api.whatsapp.com/send?phone=5514997270606&text=Oi%20Lucas',
      active: false
    },
    {
      icon: ['fab', 'instagram'],
      link: 'https://www.instagram.com/_lucasbritoo',
      active: true
    }
  ]

  ngOnInit(): void {
    this.iconList?.map(icon => new Icon().deserialize(icon));
  }

}
