import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { UtilsService } from './services/utils.service';
import { NavigationEnd, Router } from '@angular/router';
import { CanonicalService } from './services/canonical.service';
import { SeoService } from './services/seo.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false
})
export class AppComponent implements OnInit, OnDestroy {
  private router = inject(Router);
  private canonicalService = inject(CanonicalService);
  private utilsService = inject(UtilsService);
  private seoService = inject(SeoService);

  private readonly destroy$ = new Subject<void>();

  async ngOnInit(): Promise<void> {
    await this.utilsService.setLanguage();
    this.seoService.initializeDefaultMetadata();
    this.setupCanonicalUrlUpdates();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private setupCanonicalUrlUpdates(): void {
    this.router.events
      .pipe(takeUntil(this.destroy$))
      .subscribe(event => {
        if (event instanceof NavigationEnd) {
          const cleanUrl = this.router.url.split('?')[0];
          const canonicalUrl = `https://lucasbrito.com.br${cleanUrl}`;
          this.canonicalService.setCanonicalURL(canonicalUrl);
        }
      });
  }
}
