import { Directive, HostBinding, HostListener } from '@angular/core';
import * as bootstrap from "bootstrap";

@Directive({
    selector: '[disableWhenOffline]',
    standalone: false
})
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
      new bootstrap.Modal(document.getElementById('offlineModal')).toggle()
    }
  }
}