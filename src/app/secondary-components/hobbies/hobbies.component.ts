import { Component, OnInit } from '@angular/core';
import { Repository } from 'src/app/models/repository.model';
import { ApiService } from 'src/app/services/api.service';

declare let particlesJS: any;

@Component({
  selector: 'app-hobbies',
  templateUrl: './hobbies.component.html',
  styleUrls: ['./hobbies.component.css']
})
export class HobbiesComponent implements OnInit {
  repos: Repository[];

  constructor(private apiService: ApiService) { }

  async ngOnInit(): Promise<void> {
    particlesJS.load('particles-js', '../assets/particlesjs-config.json');
    await this.getRepositories();
  }

  async getRepositories() {
    const repositories = await this.apiService.getAllRepositories('Lucs1590').toPromise();
    this.repos = repositories
      .sort((a, b) => b.updateDate.getTime() - a.updateDate.getTime())
      .filter(repo => repo.private === false);
  }

  // https://gitstalk.netlify.app/lucs1590 --> Gitstalk link

}
