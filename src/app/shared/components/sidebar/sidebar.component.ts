import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{
  isSideBarOpen: boolean = false;
  isProfileOpen: boolean = false;
  currentUserName: string = '';
  public dropdowns: { [key: string]: boolean } = { information: false, menu2: false };

  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    
    const currentUser = this.authService.getCurrentUser();
    this.currentUserName = currentUser?.firstName + ' ' + currentUser?.lastName;
  }

  toggleSidebar() {
    this.isSideBarOpen = !this.isSideBarOpen;
  }

  toggleDropdown(menu: string) {
    this.dropdowns[menu] = !this.dropdowns[menu];
  }

  toggleProfile() {
    this.isProfileOpen = !this.isProfileOpen;
  }

  logout():void {
    this.authService.logout();
  }
}
