import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../shared/components/sidebar/sidebar.component';
import { SpinnerComponent } from '../../shared/components/spinner/spinner.component';
import { Alert, AlertService } from '../../shared/services/alert.service';
import { AlertsComponent } from '../../shared/components/alerts/alerts.component';
import { CookieModalComponent } from "./cookie-modal/cookie-modal.component";
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavbarComponent } from "./navbar/navbar.component";
import { NotesSidebarComponent } from "../../shared/components/right-sidebar/notes-sidebar/notes-sidebar.component";
import { BookmarksSidebarComponent } from "../../shared/components/right-sidebar/bookmarks-sidebar/bookmarks-sidebar.component";
import { ChatComponent } from "../chat/chat.component";
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SidebarComponent, SpinnerComponent, CommonModule, AlertsComponent, CookieModalComponent, RouterOutlet, NavbarComponent, NotesSidebarComponent, BookmarksSidebarComponent, ChatComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  isLoading: boolean = true;
  isCookieModalOpen: boolean = false;
  isLoggedIn : boolean = false;
  alerts: Alert[] = [];
  selectedTab: string = 'overview';

  constructor(private alertService: AlertService){
    setTimeout(()=>{
      this.isLoading = false;
    },2000);

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
        this.isLoggedIn = true;
      }
    }, 3000);
  }

  isNotesOpen = false;
  isBookmarksOpen = false;

  onToggleNotes(isOpen: boolean) {
    this.isNotesOpen = isOpen;
    this.isBookmarksOpen = false;
  }

  onToggleBookmarks(isOpen: boolean) {
    this.isBookmarksOpen = isOpen;
    this.isNotesOpen = false;
  }

  selectTab(tab: string) {
    this.selectedTab = tab;
  }


}
