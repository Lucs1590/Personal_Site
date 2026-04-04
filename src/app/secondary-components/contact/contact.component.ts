import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactComponent {
  form: FormGroup;
  submitted = false;

  readonly email = 'lucasbsilva29@gmail.com';

  constructor(
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      name:    ['', [Validators.required, Validators.minLength(2)]],
      email:   ['', [Validators.required, Validators.email]],
      subject: ['', [Validators.required, Validators.minLength(4)]],
      message: ['', [Validators.required, Validators.minLength(20)]]
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
