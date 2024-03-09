import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({
  selector: '[disableWhenOffline]',
  standalone: true
})
export class DisableWhenOfflineDirective {
  private isOffline = false;

  @HostBinding('disabled')
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
}
