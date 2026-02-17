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
import { XMLParser } from 'fast-xml-parser';
import { Book } from '../models/book.model';
import { environment } from 'src/environments/environment';

const MEDIUM_API_BASE_URL = 'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@lucasbsilva29';
const BOOKS_API_BASE_URL = 'https://www.goodreads.com/review/list_rss/143641038?key=hjn8cKI_JcIl70XJBRdZu3qKOZpa_4Osfp86sTjvuktrxGPz';
const CORS_PROXY = 'https://api.allorigins.win/raw?url=';
const BOOKS_PROXY_ROUTE = '/api/goodreads';
const GITHUB_API_BASE_URL = 'https://api.github.com';
const IPGEOLOCATION_API_BASE_URL = 'https://api.ipgeolocation.io/v2/ipgeo';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', Accept: 'application/json' })
  };

  private readonly BOOKS_CACHE_KEY = 'goodreads_books_cache';
  private readonly BOOKS_CACHE_TIMESTAMP_KEY = 'goodreads_books_cache_timestamp';
  private readonly PUBLICATIONS_CACHE_KEY = 'medium_publications_cache';
  private readonly PUBLICATIONS_CACHE_TIMESTAMP_KEY = 'medium_publications_cache_timestamp';
  private readonly CACHE_DURATION_MS = 60 * 60 * 8000; // 8 hours
  private readonly REQUEST_TIMEOUT_MS = 60000; // 60 seconds
  private readonly RETRY_ATTEMPTS = 3;
  private readonly RETRY_DELAY_MS = 5000; // 5 seconds

  private booksRequest$: Observable<Book[]> | null = null;
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

  fetchBooksFromGoodreads(): Observable<Book[]> {
    const cachedData = this.getBooksFromCache();
    if (cachedData) {
      return of(cachedData);
    }

    if (this.booksRequest$) {
      return this.booksRequest$;
    }

    const proxyUrl = environment.production ? BOOKS_PROXY_ROUTE : `${CORS_PROXY}${encodeURIComponent(BOOKS_API_BASE_URL)}`;

    this.booksRequest$ = this.httpService.get(proxyUrl, { responseType: 'text' })
      .pipe(
        timeout(this.REQUEST_TIMEOUT_MS),
        retry({
          count: this.RETRY_ATTEMPTS,
          delay: (error, retryCount) => {
            if ((error as any)?.status >= 400 && (error as any)?.status < 500) {
              return throwError(() => error);
            }
            const delayMs = this.RETRY_DELAY_MS * Math.pow(2, retryCount - 1);
            if (typeof console !== 'undefined' && console.warn) {
              console.warn(`Books API retry ${retryCount}/${this.RETRY_ATTEMPTS}`);
            }
            return timer(delayMs);
          }
        }),
        switchMap((booksXml: string) => {
          return new Observable<Book[]>(subscriber => {
            try {
              const parser = new XMLParser();
              const result: any = parser.parse(booksXml);

              const channel = result?.rss?.channel;
              const channelObj = Array.isArray(channel) ? channel[0] : channel;
              const itemsRaw = channelObj?.item;
              const items = itemsRaw ? (Array.isArray(itemsRaw) ? itemsRaw : [itemsRaw]) : [];

              const normalize = (val: any) => {
                if (val == null) return undefined;
                if (Array.isArray(val)) val = val[0];
                if (typeof val === 'object') {
                  if ('#text' in val) return val['#text'];
                  const keys = Object.keys(val);
                  if (keys.length === 1) return val[keys[0]];
                  return JSON.stringify(val);
                }
                return val;
              };

              const parsedData: Book[] = items.map((item: any) => {
                const bookData = {
                  author: normalize(item.author_name),
                  title: normalize(item.title),
                  rating: normalize(item.user_rating),
                  user_read_at: normalize(item.user_read_at),
                  user_review: normalize(item.user_review),
                  user_review_link: normalize(item.guid),
                  link: normalize(item.link),
                  description: normalize(item.book_description),
                  cover: normalize(item.book_large_image_url) || normalize(item.book_medium_image_url) || normalize(item.book_small_image_url),
                  shelves: normalize(item.user_shelves),
                  num_pages: normalize(item.book?.num_pages),
                };
                return new Book().deserialize(bookData);
              });

              this.saveBooksToCache(parsedData);

              subscriber.next(parsedData);
              subscriber.complete();
            } catch (err) {
              console.error('Failed to parse/process XML:', err);
              subscriber.error(err);
            }
          });
        }),
        finalize(() => {
          this.booksRequest$ = null;
        }),
        catchError((error) => {
          this.booksRequest$ = null;
          return this.handleError(error);
        }),
        shareReplay({
          bufferSize: 1,
          refCount: true
        })
      );

    return this.booksRequest$;
  }

  private getBooksFromCache(): Book[] | null {
    try {
      const cachedTimestamp = localStorage.getItem(this.BOOKS_CACHE_TIMESTAMP_KEY);
      if (!cachedTimestamp) {
        return null;
      }

      const timestamp = parseInt(cachedTimestamp, 10);
      const now = Date.now();

      if (now - timestamp > this.CACHE_DURATION_MS) {
        this.clearBooksCache();
        return null;
      }

      const cachedData = localStorage.getItem(this.BOOKS_CACHE_KEY);
      if (!cachedData) {
        return null;
      }

      const parsedCache = JSON.parse(cachedData);
      return parsedCache.map((bookData: any) => new Book().deserialize(bookData));
    } catch (error) {
      console.error('Error reading from cache:', error);
      this.clearBooksCache();
      return null;
    }
  }

  private saveBooksToCache(books: Book[]): void {
    try {
      localStorage.setItem(this.BOOKS_CACHE_KEY, JSON.stringify(books));
      localStorage.setItem(this.BOOKS_CACHE_TIMESTAMP_KEY, Date.now().toString());
    } catch (error) {
      console.error('Error saving to cache:', error);
    }
  }

  private clearBooksCache(): void {
    try {
      localStorage.removeItem(this.BOOKS_CACHE_KEY);
      localStorage.removeItem(this.BOOKS_CACHE_TIMESTAMP_KEY);
    } catch (error) {
      console.error('Error clearing cache:', error);
    }
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