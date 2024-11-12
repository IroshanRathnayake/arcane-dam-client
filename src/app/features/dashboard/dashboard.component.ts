import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';
import { AssetDetailsComponent } from '../assets/components/asset-details/asset-details.component';
import { ProjectListComponent } from '../projects/components/project-list/project-list.component';
import { Alert, AlertService } from '../../shared/services/alert.service';
import { AlertsComponent } from '../../shared/components/alerts/alerts.component';
import { CookieModalComponent } from "./cookie-modal/cookie-modal.component";
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SidebarComponent, ProjectListComponent, AssetDetailsComponent, SpinnerComponent, CommonModule, AlertsComponent, CookieModalComponent, RouterOutlet, RouterLink],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  isLoading = true;
  isBookmarks = false;
  isNotes = false;
  isCookieModalOpen = false;
  alerts: Alert[] = [];
  selectedTab: string = 'overview';

  constructor(private alertService: AlertService){
    setTimeout(()=>{
      this.isLoading = false;
    },100);

  }
  ngOnInit(): void {
    this.alertService.alert$.subscribe((alerts) => {
      this.alerts = alerts;
    });

    setTimeout(() => {
      if (sessionStorage.getItem('oneTimeData') == 'false') {
        this.isCookieModalOpen = true;
        this.alertService.showAlert('success', '🎉 Welcome back! You’ve successfully logged in.');
        sessionStorage.setItem('oneTimeData', 'true');
      }
    }, 2500);
  }

  toggleBookmarks(){
    this.isNotes = false;
    this.isBookmarks = !this.isBookmarks
  }

  toggleNotes(){
    this.isBookmarks = false;
    this.isNotes = !this.isNotes
  }

  selectTab(tab: string) {
    this.selectedTab = tab;
  }


}
