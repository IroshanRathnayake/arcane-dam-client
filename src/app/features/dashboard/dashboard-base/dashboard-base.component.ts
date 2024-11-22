import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { OverviewComponent } from "../overview/overview.component";

@Component({
  selector: 'app-dashboard-base',
  standalone: true,
  imports: [RouterOutlet, CommonModule, RouterLink, OverviewComponent],
  templateUrl: './dashboard-base.component.html',
  styleUrl: './dashboard-base.component.css'
})
export class DashboardBaseComponent {
  selectedTab: string = 'overview';
  
  selectTab(tab: string) {
    this.selectedTab = tab;
  }

}
