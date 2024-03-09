import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map, filter } from 'rxjs/operators';
import { Publication } from '../models/publication.model';
import { PublicationRequest } from '../models/publication-request.model';
import { Repository } from '../models/repository.model';
import { IPInfoRequest } from '../models/ipinfo-request.model';
import { IPInfo } from '../models/ipinfo.model';
import { sciPublications } from 'src/assets/static_data/sciPublications';

const MEDIUM_API_BASE_URL = 'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@lucasbsilva29';
const GITHUB_API_BASE_URL = 'https://api.github.com';
const IPAPI_API_BASE_URL = 'https://ipapi.co/json';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', Accept: 'application/json' })
  };

  constructor(private httpService: HttpClient) { }

  private handleError(error: any): Observable<never> {
    console.error('API Error:', error);
    return throwError(() => new Error('Something went wrong. Please try again later.'));
  }

  getAllPublications(): Observable<Publication[]> {
    return this.httpService.get<PublicationRequest>(MEDIUM_API_BASE_URL, this.httpOptions)
      .pipe(
        map(publication =>
          publication.items
            .filter(item => item.categories.length > 0)
            .map(item => new Publication().deserialize(item))),
        catchError(this.handleError)
      );
  }

  getAllSciPublications(): Publication[] {
    const dataset = sciPublications?.map((subset) => new Publication().deserialize(subset));
    return dataset.sort((a, b) => b.publicationDate.getTime() - a.publicationDate.getTime());
  }


  getAllRepositories(username: string): Observable<Repository[]> {
    // Validate username input to prevent injection attacks
    if (!/^[a-zA-Z0-9]+$/.test(username)) {
      throw new Error('Invalid username');
    }

    const url = `${GITHUB_API_BASE_URL}/users/${username}/repos`;
    return this.httpService.get<Repository[]>(url, this.httpOptions)
      .pipe(
        map(repositories => repositories.map(repo => new Repository().deserialize(repo)) as Repository[]),
        catchError(this.handleError)
      );
  }

  getIPInfo(): Observable<IPInfo> {
    return this.httpService.get<IPInfoRequest>(IPAPI_API_BASE_URL, this.httpOptions)
      .pipe(
        map(response => new IPInfo().deserialize(response)),
        catchError(this.handleError)
      );
  }
  getFilteredPublications(title?: string, category?: string): Observable<Publication[]> {
    return this.getAllPublications().pipe(
      map(publications => publications.filter(publication => 
        (!title || publication.title.includes(title)) &&
        (!category || publication?.categories.includes(category))
      ))
    );
  }
}
