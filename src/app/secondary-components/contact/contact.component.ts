import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Subject, takeUntil } from 'rxjs';
import { SeoService } from 'src/app/services/seo.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactComponent implements OnInit, OnDestroy {
  private fb = inject(FormBuilder);
  private seoService = inject(SeoService);
  private translate = inject(TranslateService);
  private cdr = inject(ChangeDetectorRef);

  form: FormGroup;
  submitted = false;

  readonly email = 'lucasbsilva29@gmail.com';

  private readonly destroy$ = new Subject<void>();

  constructor() {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
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
      title: this.translate.instant('contact.seo.title'),
      description: this.translate.instant('contact.seo.description'),
      keywords: this.translate.instant('contact.seo.keywords')
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
}