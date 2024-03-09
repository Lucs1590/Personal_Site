import { Component, OnInit } from '@angular/core';
import { Observable, defer, fromEvent, merge, of, switchMap, switchMapTo } from 'rxjs';
import { Publication } from 'src/app/models/publication.model';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-publications',
  templateUrl: './publications.component.html',
  styleUrls: ['./publications.component.css']
})
export class PublicationsComponent implements OnInit {
  blogPublications: Publication[];
  sciPublications: Publication[];
  loading = false;
  scholarImage: string;
  isOffline$: Observable<boolean> = checkInternetConnection();

  constructor(
    private apiService: ApiService
  ) { }

  async ngOnInit(): Promise<void> {
    this.defineIconImage(null);
    this.getSciPublications();

    await this.getBlogPublications();

    this.isOffline$.subscribe(isOffline => {
      if (isOffline) {
        console.log('Usuário está offline. Armazeno informações no cache');
      } else {
        console.log('Usuário recuperou a conexão. Obtenho as informações do cache e envio para o servidor');
      }
    })

    setTimeout(() => {
      this.loading = true;
    }, 600);
  }

  public defineIconImage(event: MouseEvent): void {
    if (event && event.type === 'mouseover') {
      this.scholarImage = '../../../assets/img/icons/google-scholar2.svg';
    } else {
      this.scholarImage = '../../../assets/img/icons/google-scholar1.svg';
    }
  }


  async getBlogPublications(): Promise<void> {
    const publications = await this.apiService.getAllPublications().toPromise();
    this.blogPublications = publications
      .sort((a, b) => b.publicationDate.getTime() - a.publicationDate.getTime())
      .splice(0, 6);
  }

  getSciPublications(): void {
    const publications = this.apiService.getAllSciPublications();
    this.sciPublications = publications;
    const parser = new DOMParser();

    this.sciPublications.map((publication) => {
      const parsedDescription = parser.parseFromString(publication.description, 'text/html');
      const sanitizedDescription = this.sanitizeHTML(parsedDescription.body.textContent || '');
      publication.description = sanitizedDescription.slice(0, 152) + '..</p>';
    });
  }

  sanitizeHTML(html: string): string {
    const doc = new DOMParser().parseFromString(html, 'text/html');
    return doc.body.textContent || '';
  }
}
function checkInternetConnection(): Observable<boolean> {
  const initialEvent$ = of(null);
  const onlineEvent$ = fromEvent(window, 'online');
  const offlineEvent$ = fromEvent(window, 'offline');
  const isOfflineDefer$ = defer(() => of(!window.navigator.onLine));

  const isOffline$ = merge(initialEvent$, onlineEvent$, offlineEvent$).pipe(
    switchMap(() => isOfflineDefer$)
  );

  return isOffline$;

}

