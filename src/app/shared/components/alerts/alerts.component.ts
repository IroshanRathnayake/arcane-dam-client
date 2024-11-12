import { CommonModule, NgClass } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-alerts',
  standalone: true,
  imports: [FormsModule, CommonModule, NgClass],
  templateUrl: './alerts.component.html',
  styleUrl: './alerts.component.css'
})
export class AlertsComponent implements OnInit {
  @Input() alert: Alert = {
    type: '',
    message: ''
  };

  alertClasses: string = '';

  ngOnInit(): void {
    this.setAlertClasses();
  }

  setAlertClasses() {
    switch (this.alert.type) {
      case 'success':
        this.alertClasses = 'bg-green-100 text-green-800';
        break;
      case 'error':
        this.alertClasses = 'bg-red-100 text-red-800';
        break;
      case 'info':
        this.alertClasses = 'bg-blue-100 text-blue-800';
        break;
      default:
        this.alertClasses = 'bg-gray-100 text-gray-800';
        break;
    }
  }
}

interface Alert {
  type: string;
  message: string;
}
