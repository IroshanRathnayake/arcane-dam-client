import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard-base',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink],
  templateUrl: './dashboard-base.component.html',
  styleUrl: './dashboard-base.component.css'
})
export class DashboardBaseComponent {
  selectedTab: string = 'overview';
  isRotating: boolean = false;
  
  selectTab(tab: string) {
    this.selectedTab = tab;
  }

  refreshIcon() {
    this.isRotating = true;
    setTimeout(() => {
      this.isRotating = false;
    }, 500);
  }

}
