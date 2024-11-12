import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  private alertSubject = new Subject<Alert[]>();
  alert$ = this.alertSubject.asObservable();
  private alerts: Alert[] = [];

  constructor() { }

  showAlert(type: string, message: string, timeout: number = 5000) {
    const alert: Alert = { type, message };
    this.alerts.push(alert);
    this.alertSubject.next(this.alerts);

    if (timeout) {
      setTimeout(() => this.clearAlert(alert), timeout);
    }
  }

  clearAlert(alert: Alert) {
    this.alerts = this.alerts.filter(a => a !== alert);
    this.alertSubject.next(this.alerts);
  }
  
  clearAllAlerts() {
    this.alerts = [];
    this.alertSubject.next(this.alerts);
  }
}

export interface Alert {
  type: string;
  message: string;
}
