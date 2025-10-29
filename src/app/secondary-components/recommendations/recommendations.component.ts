import { Component } from '@angular/core';
import { Recommendation } from 'src/app/models/recommendation.model';

@Component({
    selector: 'app-recommendations',
    templateUrl: './recommendations.component.html',
    styleUrls: ['./recommendations.component.css'],
    standalone: false
})
export class RecommendationsComponent {

  readonly recommendations = [
    {
      author: 'Samuel Licorio Leiva',
      authorImage: '../../assets/img/samu.jpeg',
      text: 'Profissional com uma índole admirável,\
 além de um conhecimento técnico apurado e sua empatia impecável,\
 sempre se colocando no lugar dos outros, o que o leva a refletir muito sobre suas atitudes.\
 Isso o torna uma pessoa incrível e extremamente agradável para se trabalhar em equipe.\
 Sou muito grato a Deus por todas as oportunidades profissionais e pessoais em que já convivemos. Grande e fraternal abraço, amado.',
      stage: 'Em 7 de abril de 2020, Samuel trabalhava com Lucas, mas em grupos diferentes'
    },
    {
      author: 'Álvaro Leandro Cavalvante',
      authorImage: '../../assets/img/alvaro.jpeg',
      text: 'Ótimo profissional, muito dedicado em suas tarefas,\
 visa executar tudo com excelência, se mostrando um profissional muito comprometido com o trabalho.',
      stage: 'Em 17 de setembro de 2019, Lucas trabalhava com Álvaro no mesmo grupo'
    },
    {
      author: 'Fernando Maransatto',
      authorImage: '../../assets/img/maransatto.jpeg',
      text: 'Excelente profissional. Responsável, não abre mão de desafio,\
 encara bem as mudanças de escopo. Tem uma ótima curva de aprendizado, e trabalha muito bem em equipe.',
      stage: 'Em 18 de setembro de 2019, Fernando respondia a Lucas diretamente'
    },
    {
      author: 'Renan Zulian',
      authorImage: '../../assets/img/renan.jpeg',
      text: 'Foi e sempre será um prazer dividir uma mesa de trabalho com ele.\
Uma pessoa dedicada, que tem um ótimo espírito competitivo e que ama desafios.\
Esse seu estilo sempre motiva os colegas de trabalho a fazer o seu melhor.',
      stage: 'Em 12 de fevereiro de 2020, Lucas trabalhava com Renan no mesmo grupo'
    },
    {
      author: 'Rafael Petraca',
      authorImage: '../../assets/img/rafa.jpeg',
      text: 'Ótimo profissional, com valores e ética. Sempre compartilhando conhecimento com os demais! E acima de tudo um grande amigo.',
      stage: 'Em 2 de fevereiro de 2021, Lucas trabalhava com Rafael no mesmo grupo'
    }
  ].map(recommendation => new Recommendation().deserialize(recommendation));

  trackByAuthor(index: number, recommendation: Recommendation): string {
    return recommendation.author || index.toString();
  }
}
