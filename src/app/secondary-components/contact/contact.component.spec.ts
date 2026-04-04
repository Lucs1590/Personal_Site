import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { ContactComponent } from './contact.component';
import { SeoService } from 'src/app/services/seo.service';

describe('ContactComponent', () => {
  let component: ContactComponent;
  let fixture: ComponentFixture<ContactComponent>;

  const seoServiceSpy = jasmine.createSpyObj<SeoService>('SeoService', ['updateMetadata']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FontAwesomeModule,
        TranslateModule.forRoot(),
        ContactComponent
      ],
      providers: [
        { provide: SeoService, useValue: seoServiceSpy }
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
    expect(component.hasError('name', 'required')).toBeTrue();
    expect(component.hasError('email', 'required')).toBeTrue();
    expect(component.hasError('subject', 'required')).toBeTrue();
    expect(component.hasError('message', 'required')).toBeTrue();
  });

  it('should report email format error', () => {
    component.form.get('email')!.setValue('not-an-email');
    component.form.get('email')!.markAsTouched();
    expect(component.hasError('email', 'email')).toBeTrue();
  });

  it('should not submit when form is invalid', () => {
    const spy = spyOn(component as any, 'updateSeoMetadata');
    component.onSubmit();
    expect(component.submitted).toBeFalse();
    spy.calls.reset();
  });

  it('should mark submitted and reset form after valid submit', () => {
    component.form.setValue({
      name: 'Test User',
      email: 'test@example.com',
      subject: 'Hello there',
      message: 'This is a test message that is long enough.'
    });

    // Suppress the mailto navigation in the test environment
    spyOnProperty(window.location, 'href', 'set');

    component.onSubmit();

    expect(component.submitted).toBeTrue();
    expect(component.form.pristine).toBeTrue();
  });

  it('should reset submitted flag when resetForm is called', () => {
    component.submitted = true;
    component.resetForm();
    expect(component.submitted).toBeFalse();
  });
});