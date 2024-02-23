import { Component } from '@angular/core';
import { Icon } from 'src/app/models/icon.model';

@Component({
  selector: 'app-icones',
  templateUrl: './icones.component.html',
  styleUrls: ['./icones.component.css']
})
export class IconesComponent {

  iconList = [
    {
      icon: ['fas', 'envelope'],
      link: 'mailto:lucasbsilva29@gmail.com?subject=Brito%20Web%20Site&body=Ola%20Lucas%20Brito',
      active: true,
      descriptiion: 'Send me an e-mail'
    },
    {
      icon: ['fab', 'github'],
      link: 'https://github.com/Lucs1590',
      active: true,
      descriptiion: 'Access my GitHub profile'
    },
    {
      icon: ['fab', 'stack-overflow'],
      link: 'https://pt.stackoverflow.com/users/122718/lucas-brito',
      active: false,
      descriptiion: 'Access my Stack Overflow profile'
    },
    {
      icon: ['fab', 'medium'],
      link: 'https://medium.com/@lucasbsilva29',
      active: true,
      descriptiion: 'Access my Medium profile'
    },
    {
      icon: ['fab', 'dev'],
      link: 'https://dev.to/lucs1590',
      active: true,
      descriptiion: 'Access my Dev.to profile'
    },
    {
      icon: ['fab', 'twitter'],
      link: 'https://twitter.com/Lucs1590',
      active: true,
      descriptiion: 'Access my Twitter profile'
    },
    {
      icon: ['fab', 'linkedin'],
      link: 'https://www.linkedin.com/in/lucas-brito100/',
      active: true,
      descriptiion: 'Access my LinkedIn profile'
    },
    {
      icon: ['fab', 'instagram'],
      link: 'https://www.instagram.com/_lucasbritoo',
      active: true,
      descriptiion: 'Access my Instagram profile'
    },
    {
      icon: ['fab', 'facebook-f'],
      link: 'https://www.facebook.com/lucas.brito.100',
      active: true,
      descriptiion: 'Access my Facebook profile'
    },
    {
      icon: ['fab', 'whatsapp'],
      link: 'https://api.whatsapp.com/send?phone=5514997270606&text=Oi%20Lucas',
      active: false,
      descriptiion: 'Send me a message on WhatsApp'
    },
  ].map(icon => new Icon().deserialize(icon));

  constructor() { }
}
