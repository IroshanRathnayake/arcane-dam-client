import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-cookie-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cookie-modal.component.html',
  styleUrl: './cookie-modal.component.css'
})
export class CookieModalComponent {
  showCookieModal = true;
  handleCookieConsent(accepted: boolean): void {
    this.showCookieModal = true;
    if (accepted) {
      this.showCookieModal = false;
      localStorage.setItem('cookieConsent', 'accepted');
    } else {
      this.showCookieModal = false;
      localStorage.setItem('cookieConsent', 'declined');
    }
  }
}
