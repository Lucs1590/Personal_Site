import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ContactComponent } from './contact.component';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContactComponent],
      imports: [
        ReactiveFormsModule,
        FontAwesomeModule,
        TranslateModule.forRoot()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialise with an invalid form', () => {
    expect(component.form.valid).toBeFalse();
  });

  it('should validate required fields', () => {
    component.form.markAllAsTouched();
    expect(component.hasError('name',    'required')).toBeTrue();
    expect(component.hasError('email',   'required')).toBeTrue();
    expect(component.hasError('subject', 'required')).toBeTrue();
    expect(component.hasError('message', 'required')).toBeTrue();
  });

  it('should report email format error', () => {
    component.form.get('email')!.setValue('not-an-email');
    component.form.get('email')!.markAsTouched();
    expect(component.hasError('email', 'email')).toBeTrue();
  });

  it('should not submit when form is invalid', () => {
    component.onSubmit();
    expect(component.submitted).toBeFalse();
  });

  it('should mark submitted and reset form after valid submit', () => {
    component.form.setValue({
      name:    'Test User',
      email:   'test@example.com',
      subject: 'Hello there',
      message: 'This is a test message that is long enough.'
    });

    // Suppress the mailto navigation in the test environment
    const originalLocation = window.location;
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { ...originalLocation, href: '' }
    });

    component.onSubmit();

    expect(component.submitted).toBeTrue();
    expect(component.form.pristine).toBeTrue();

    Object.defineProperty(window, 'location', { writable: true, value: originalLocation });
  });

  it('should reset submitted flag when resetForm is called', () => {
    component.submitted = true;
    component.resetForm();
    expect(component.submitted).toBeFalse();
  });
});
