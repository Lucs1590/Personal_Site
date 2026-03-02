import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { LangChangeEvent, TranslateService } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';
import { PresentationEvent, presentationEvents } from 'src/assets/static_data/presentations';
import { SeoService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-presentations',
  templateUrl: './presentations.component.html',
  styleUrls: ['./presentations.component.css'],
  standalone: false
})
export class PresentationsComponent implements OnInit, OnDestroy {

  @Input() isEmbedded = false;

  readonly presentations: PresentationEvent[] = [...presentationEvents].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  currentLocale = 'en-US';
  eventNameExists = new Set<number>();

  private readonly destroy$ = new Subject<void>();

  constructor(
    private seoService: SeoService,
    private sanitizer: DomSanitizer,
    private translate: TranslateService
  ) { }

  ngOnInit(): void {
    this.currentLocale = this.localeFromLang(this.translate.getCurrentLang());
    this.buildEventNameCache();

    this.translate.onLangChange
      .pipe(takeUntil(this.destroy$))
      .subscribe((event: LangChangeEvent) => {
        this.currentLocale = this.localeFromLang(event.lang);
        this.buildEventNameCache();
        if (!this.isEmbedded) {
          this.updateSeoMetadata();
        }
      });

    if (!this.isEmbedded) {
      this.updateSeoMetadata();
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private localeFromLang(lang: string): string {
    return lang === 'pt' ? 'pt-BR' : 'en-US';
  }

  private buildEventNameCache(): void {
    this.eventNameExists = new Set(
      this.presentations
        .filter(e => {
          const key = this.itemKey(e, 'eventName');
          return this.translate.instant(key) !== key;
        })
        .map(e => e.id)
    );
  }

  private updateSeoMetadata(): void {
    this.seoService.updateMetadata({
      title: this.translate.instant('presentations.seo.title'),
      description: this.translate.instant('presentations.seo.description'),
      keywords: this.translate.instant('presentations.seo.keywords')
    });
  }

  getSafeEmbedUrl(videoUrl: string): SafeResourceUrl {
    const raw = this.getRawEmbedUrl(videoUrl);
    return this.sanitizer.bypassSecurityTrustResourceUrl(raw);
  }

  private getRawEmbedUrl(videoUrl: string): string {
    if (!videoUrl) return '';
    const ytMatch = videoUrl.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/);
    if (ytMatch) {
      return `https://www.youtube.com/embed/${ytMatch[1]}`;
    }
    const vimeoMatch = videoUrl.match(/vimeo\.com\/(\d+)/);
    if (vimeoMatch) {
      return `https://player.vimeo.com/video/${vimeoMatch[1]}`;
    }
    return videoUrl;
  }

  isYouTubeOrVimeo(videoUrl: string): boolean {
    return /youtube\.com|youtu\.be|vimeo\.com/.test(videoUrl);
  }

  itemKey(event: PresentationEvent, field: string): string {
    return `presentations.items.${event.id}.${field}`;
  }

  trackById(index: number, event: PresentationEvent): number {
    return event.id;
  }
}
