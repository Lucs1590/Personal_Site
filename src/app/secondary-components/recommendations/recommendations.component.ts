import { Component } from '@angular/core';
import { Recommendation } from 'src/app/models/recommendation.model';

@Component({
  selector: 'app-recommendations',
  templateUrl: './recommendations.component.html',
  styleUrls: ['./recommendations.component.css']
})
export class RecommendationsComponent {

  constructor() { }

  recommendations = [
    {
      author: 'Samuel Licorio Leiva',
      authorImage: 'src/assets/img/samu.jpeg',
      text: 'Profissional com uma índole admirável, além de um conhecimento técnico apurado e sua empatia impecável, sempre se colocando no lugar dos outros, o que o leva a refletir muito sobre suas atitudes. Isso o torna uma pessoa incrível e extremamente agradável para se trabalhar em equipe. Sou muito grato a Deus por todas as oportunidades profissionais e pessoais em que já convivemos. Grande e fraternal abraço, amado.',
      stage: ''
    },
    {
      author: 'Álvaro Leandro Cavalvante',
      authorImage: 'src/assets/img/alvaro.jpeg',
      text: 'Ótimo profissional, muito dedicado em suas tarefas, visa executar tudo com excelência, se mostrando um profissional muito comprometido com o trabalho.',
      stage: ''
    },
    {
      author: 'Fernando Maransatto',
      authorImage: 'src/assets/img/maransatto.jpeg',
      text: 'Excelente profissional. Responsável, não abre mão de desafio, encara bem as mudanças de escopo. Tem uma ótima curva de aprendizado, e trabalha muito bem em equipe.',
      stage: ''
    },
    {
      author: 'Renan Zulian',
      authorImage: 'src/assets/img/renan.jpeg',
      text: 'Fui e sempre será um prazer dividir uma mesa de trabalho com ele. Uma pessoa dedicada, que tem um ótimo espírito competitivo e que ama desafios. Esse seu estilo sempre motiva os colegas de trabalho a fazer o seu melhor.',
      stage: ''
    }
  ].map(recommendation => new Recommendation().deserialize(recommendation));

}
