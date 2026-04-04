import { Directive, HostBinding, HostListener } from '@angular/core';
import Modal from 'bootstrap/js/dist/modal';

@Directive({ selector: '[disableWhenOffline]' })
export class DisableWhenOfflineDirective {
  private isOffline = false;

  @HostBinding('class.disabled')
  get isDisabled(): boolean {
    return this.isOffline;
  }

  @HostListener('window:offline')
  setOffline(): void {
    this.isOffline = true;
  }

  @HostListener('window:online')
  setOnline(): void {
    this.isOffline = false;
  }

  @HostListener('click', ['$event'])
  onClick(event: Event): void {
    if (this.isOffline) {
      event.preventDefault();
      event.stopPropagation();
      new Modal(document.getElementById('offlineModal')).toggle();
    }
  }
}