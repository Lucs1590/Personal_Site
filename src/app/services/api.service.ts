import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError, of } from 'rxjs';
import { catchError, map, switchMap, timeout } from 'rxjs/operators';
import { Publication } from '../models/publication.model';
import { PublicationRequest } from '../models/publication-request.model';
import { Repository } from '../models/repository.model';
import { IPInfoRequest } from '../models/ipinfo-request.model';
import { IPInfo } from '../models/ipinfo.model';
import { sciPublications } from 'src/assets/static_data/sciPublications';
import { parseString } from 'xml2js';
import { Book } from '../models/book.model';

const MEDIUM_API_BASE_URL = 'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@lucasbsilva29';
const BOOKS_API_BASE_URL = 'https://www.goodreads.com/review/list_rss/143641038?key=hjn8cKI_JcIl70XJBRdZu3qKOZpa_4Osfp86sTjvuktrxGPz';
const CORS_PROXY = 'https://api.allorigins.win/raw?url=';
const GITHUB_API_BASE_URL = 'https://api.github.com';
const IPAPI_API_BASE_URL = 'https://ipapi.co/json';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private readonly httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json', Accept: 'application/json' })
  };

  constructor(private httpService: HttpClient) { }

  private handleError(error: unknown): Observable<never> {
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
    if (!/^[a-zA-Z0-9]+$/.test(username)) {
      return throwError(() => new Error('Invalid username'));
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
        timeout(2000),
        map(response => new IPInfo().deserialize(response)),
        catchError(this.handleError)
      );
  }

  fetchBooksFromGoodreads(): Observable<Book[]> {
    const proxyUrl = `${CORS_PROXY}${encodeURIComponent(BOOKS_API_BASE_URL)}`;

    return this.httpService.get(proxyUrl, { responseType: 'text' })
      .pipe(
        switchMap((booksXml: string) => {
          return new Observable<Book[]>(subscriber => {
            parseString(booksXml, (err, result) => {
              if (err) {
                console.error('Failed to parse XML:', err);
                subscriber.error(err);
                return;
              }

              try {
                const items = result.rss.channel[0].item;
                const parsedData: Book[] = items.map((item: any) => {
                  const bookData = {
                    author: item.author_name[0],
                    title: item.title[0],
                    rating: item.user_rating[0],
                    user_read_at: item.user_read_at[0],
                    user_review: item.user_review[0],
                    user_review_link: item.guid[0],
                    link: item.link[0],
                    description: item.book_description[0],
                    cover: item.book_large_image_url[0] || item.book_medium_image_url[0] || item.book_small_image_url[0],
                    shelves: item.user_shelves[0],
                  };
                  return new Book().deserialize(bookData);
                });

                subscriber.next(parsedData);
                subscriber.complete();

              } catch (parseError) {
                console.error('Failed to process parsed XML:', parseError);
                subscriber.error(parseError);
              }
            });
          });
        }),
        catchError(this.handleError)
      );
  }
}