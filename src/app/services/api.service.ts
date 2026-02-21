import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, of, timer } from 'rxjs';
import { catchError, map, switchMap, timeout, retry, shareReplay, finalize } from 'rxjs/operators';
import { Publication } from '../models/publication.model';
import { PublicationRequest } from '../models/publication-request.model';
import { Repository } from '../models/repository.model';
import { IPInfoRequest } from '../models/ipinfo-request.model';
import { IPInfo } from '../models/ipinfo.model';
import { sciPublications } from 'src/assets/static_data/sciPublications';
import { books } from 'src/assets/static_data/books';
import { Book } from '../models/book.model';
import { environment } from 'src/environments/environment';

const MEDIUM_API_BASE_URL = 'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@lucasbsilva29';
const CORS_PROXY = 'https://api.allorigins.win/raw?url=';
const GITHUB_API_BASE_URL = 'https://api.github.com';
const IPGEOLOCATION_API_BASE_URL = 'https://api.ipgeolocation.io/v2/ipgeo';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', Accept: 'application/json' })
  };

  private readonly PUBLICATIONS_CACHE_KEY = 'medium_publications_cache';
  private readonly PUBLICATIONS_CACHE_TIMESTAMP_KEY = 'medium_publications_cache_timestamp';
  private readonly CACHE_DURATION_MS = 60 * 60 * 8000; // 8 hours
  private readonly REQUEST_TIMEOUT_MS = 60000; // 60 seconds
  private readonly RETRY_ATTEMPTS = 3;
  private readonly RETRY_DELAY_MS = 5000; // 5 seconds

  private publicationsRequest$: Observable<Publication[]> | null = null;

  constructor(private httpService: HttpClient) { }

  private handleError(error: unknown): Observable<never> {
    console.error('API Error:', error);
    return throwError(() => new Error('Something went wrong. Please try again later.'));
  }

  getAllPublications(): Observable<Publication[]> {
    const cachedData = this.getPublicationsFromCache();
    if (cachedData) {
      return of(cachedData);
    }

    if (this.publicationsRequest$) {
      return this.publicationsRequest$;
    }

    this.publicationsRequest$ = this.httpService.get<PublicationRequest>(MEDIUM_API_BASE_URL, this.httpOptions)
      .pipe(
        timeout(this.REQUEST_TIMEOUT_MS),
        retry({
          count: this.RETRY_ATTEMPTS,
          delay: (error, retryCount) => {
            if (error.status >= 400 && error.status < 500) {
              return throwError(() => error);
            }
            const delayMs = this.RETRY_DELAY_MS * Math.pow(2, retryCount - 1);
            if (typeof console !== 'undefined' && console.warn) {
              console.warn(`Publications API retry ${retryCount}/${this.RETRY_ATTEMPTS}`);
            }
            return timer(delayMs);
          }
        }),
        map(publication => {
          const publications = publication.items
            .filter(item => item.categories.length > 0)
            .map(item => new Publication().deserialize(item));

          this.savePublicationsToCache(publications);

          return publications;
        }),
        finalize(() => {
          this.publicationsRequest$ = null;
        }),
        catchError((error) => {
          this.publicationsRequest$ = null;
          return this.handleError(error);
        }),
        shareReplay({
          bufferSize: 1,
          refCount: true
        })
      );

    return this.publicationsRequest$;
  }

  getAllSciPublications(): Publication[] {
    const dataset = sciPublications?.map((subset) => new Publication().deserialize(subset));
    return dataset.sort((a, b) => b.publicationDate.getTime() - a.publicationDate.getTime());
  }

  getAllRepositories(username: string): Observable<Repository[]> {
    if (!/^[a-zA-Z0-9]+$/.test(username)) {
      return throwError(() => new Error('Invalid username'));
    }

    const url = `${GITHUB_API_BASE_URL}/users/${username}/repos`;
    return this.httpService.get<Repository[]>(url, this.httpOptions)
      .pipe(
        timeout(this.REQUEST_TIMEOUT_MS),
        retry({
          count: this.RETRY_ATTEMPTS,
          delay: (error, retryCount) => {
            if (error.status >= 400 && error.status < 500) {
              return throwError(() => error);
            }
            const delayMs = this.RETRY_DELAY_MS * Math.pow(2, retryCount - 1);
            if (typeof console !== 'undefined' && console.warn) {
              console.warn(`API retry attempt ${retryCount}/${this.RETRY_ATTEMPTS} for: ${error.url || 'unknown'}`);
            }
            return timer(delayMs);
          }
        }),
        map(repositories => repositories.map(repo => new Repository().deserialize(repo)) as Repository[]),
        catchError(this.handleError)
      );
  }

  getIPInfo(): Observable<IPInfo> {
    const apiKey = environment.ipGeolocationApiKey;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    });

    const encodedKey = encodeURIComponent(apiKey);
    const url = `${IPGEOLOCATION_API_BASE_URL}?apiKey=${encodedKey}`;

    return this.httpService.get<IPInfoRequest>(url, { headers })
      .pipe(
        timeout(5000),
        retry({
          count: 2,
          delay: (error, retryCount) => {
            if (error.status >= 400 && error.status < 500) {
              return throwError(() => error);
            }
            const delayMs = this.RETRY_DELAY_MS * Math.pow(2, retryCount - 1);
            if (typeof console !== 'undefined' && console.warn) {
              console.warn(`API retry attempt ${retryCount}/2 for: ${error.url || 'unknown'}`);
            }
            return timer(delayMs);
          }
        }),
        map(response => new IPInfo().deserialize(response)),
        catchError(this.handleError)
      );
  }

  fetchBooksFromLocal(): Observable<Book[]> {
    try {
      if (Array.isArray(books) && books.length > 0) {
        const parsed = (books as any[]).map(b => new Book().deserialize(b));
        return of(parsed);
      }
    } catch (err) {
      console.warn('Could not use compiled books export:', err);
    }
    return of([]);
  }



  private getPublicationsFromCache(): Publication[] | null {
    try {
      const cachedTimestamp = localStorage.getItem(this.PUBLICATIONS_CACHE_TIMESTAMP_KEY);
      if (!cachedTimestamp) {
        return null;
      }

      const timestamp = parseInt(cachedTimestamp, 10);
      const now = Date.now();

      if (now - timestamp > this.CACHE_DURATION_MS) {
        this.clearPublicationsCache();
        return null;
      }

      const cachedData = localStorage.getItem(this.PUBLICATIONS_CACHE_KEY);
      if (!cachedData) {
        return null;
      }

      const parsedCache = JSON.parse(cachedData);
      return parsedCache.map((pubData: any) => {
        const normalizedInput: any = {
          title: pubData.title,
          pubDate: pubData.pubDate || pubData.publicationDate || pubData.publicationDateISO || undefined,
          link: pubData.link || pubData.url,
          author: pubData.author,
          thumbnail: pubData.thumbnail || pubData.image,
          description: pubData.description || pubData.content || pubData.summary || '',
          content: pubData.content || pubData.description || '',
          categories: pubData.categories || [],
          venue: pubData.venue,
          year: pubData.year,
          doi: pubData.doi,
          pdfUrl: pubData.pdfUrl,
          githubUrl: pubData.githubUrl,
          type: pubData.type
        };

        return new Publication().deserialize(normalizedInput);
      });
    } catch (error) {
      console.error('Error reading publications from cache:', error);
      this.clearPublicationsCache();
      return null;
    }
  }

  private savePublicationsToCache(publications: Publication[]): void {
    try {
      localStorage.setItem(this.PUBLICATIONS_CACHE_KEY, JSON.stringify(publications));
      localStorage.setItem(this.PUBLICATIONS_CACHE_TIMESTAMP_KEY, Date.now().toString());
    } catch (error) {
      console.error('Error saving publications to cache:', error);
    }
  }

  private clearPublicationsCache(): void {
    try {
      localStorage.removeItem(this.PUBLICATIONS_CACHE_KEY);
      localStorage.removeItem(this.PUBLICATIONS_CACHE_TIMESTAMP_KEY);
    } catch (error) {
      console.error('Error clearing publications cache:', error);
    }
  }
}