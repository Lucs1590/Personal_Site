import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';
import { SeoService } from 'src/app/services/seo.service';

interface SocialLink {
  icon: string[];
  url: string;
  label: string;
}

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactComponent implements OnInit, OnDestroy {
  form: FormGroup;
  submitted = false;

  readonly email = 'lucasbsilva29@gmail.com';

  readonly socialLinks: SocialLink[] = [
    { icon: ['fab', 'github'],   url: 'https://github.com/Lucs1590',                   label: 'GitHub'   },
    { icon: ['fab', 'linkedin'], url: 'https://www.linkedin.com/in/lucas-brito100/',    label: 'LinkedIn' },
    { icon: ['fab', 'twitter'],  url: 'https://twitter.com/Lucs1590',                   label: 'Twitter'  },
    { icon: ['fab', 'medium'],   url: 'https://medium.com/@lucasbsilva29',               label: 'Medium'   }
  ];

  private readonly destroy$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private seoService: SeoService,
    private translate: TranslateService,
    private cdr: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      name:    ['', [Validators.required, Validators.minLength(2)]],
      email:   ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required, Validators.minLength(4)]],
      message: ['', [Validators.required, Validators.minLength(20)]]
    });
  }

  ngOnInit(): void {
    this.updateSeoMetadata();
    this.translate.onLangChange
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.updateSeoMetadata();
        this.cdr.markForCheck();
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private updateSeoMetadata(): void {
    this.seoService.updateMetadata({
      title:       this.translate.instant('contact.seo.title'),
      description: this.translate.instant('contact.seo.description'),
      keywords:    this.translate.instant('contact.seo.keywords')
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.cdr.markForCheck();
      return;
    }

    const { name, email, subject, message } = this.form.value as {
      name: string;
      email: string;
      subject: string;
      message: string;
    };

    const body = `Hi Lucas,\n\nMy name is ${name} (${email}).\n\n${message}\n\nBest regards,\n${name}`;
    const mailtoUrl =
      `mailto:${this.email}` +
      `?subject=${encodeURIComponent(subject)}` +
      `&body=${encodeURIComponent(body)}`;

    window.location.href = mailtoUrl;

    this.submitted = true;
    this.form.reset();
    this.cdr.markForCheck();
  }

  resetForm(): void {
    this.submitted = false;
    this.form.reset();
    this.cdr.markForCheck();
  }

  hasError(field: string, error: string): boolean {
    const control = this.form.get(field);
    return !!(control && control.hasError(error) && (control.dirty || control.touched));
  }

  trackBySocialUrl(_index: number, link: SocialLink): string {
    return link.url;
  }
}
