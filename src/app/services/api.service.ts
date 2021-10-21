import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Publication } from '../models/publication.model';
import { PublicationRequest } from '../models/publication-request.model';
import { Repository } from '../models/repository.model';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', Accept: 'application/json' })
  };

  constructor(private httpService: HttpClient) { }

  getAllPublications(): Observable<Publication[]> {
    return this.httpService.get<PublicationRequest>
      ('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@lucasbsilva29', this.httpOptions)
      .pipe(
        map(publication =>
          publication.items
            .filter(item => item.categories.length > 0)
            .map(item => new Publication().deserialize(item))),
        catchError(() => throwError('Problem with publications request')));
  }

  getAllRepositories(): Observable<Repository[]> {
    return this.httpService.get<Repository[]>('https://api.github.com/users/Lucs1590/repos', this.httpOptions)
      .pipe(
        map(repositories => repositories.map(repo => new Repository().deserialize(repo)) as Repository[]),
        catchError(() => throwError('Problem with publications')));
  }
}
