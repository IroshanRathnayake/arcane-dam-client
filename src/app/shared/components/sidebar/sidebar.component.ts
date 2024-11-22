import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { TeamSpaceComponent } from "../../../features/team/components/team-space/team-space.component";
import { ProjectStructureComponent } from "../../../features/projects/components/project-structure/project-structure.component";

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, TeamSpaceComponent, ProjectStructureComponent, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{
  isSideBarOpen: boolean = false;
  isProfileOpen: boolean = false;
  isInputVisible: boolean = false;
  currentUserName: string = '';
  userName: string = '';
  public dropdowns: { [key: string]: boolean } = { information: false, menu2: false };

  constructor(private authService: AuthService) {}
  ngOnInit(): void {
    
    const currentUser = this.authService.getCurrentUser();
    this.currentUserName = currentUser?.firstName + ' ' + currentUser?.lastName;
    this.userName = '@'+this.currentUserName.split(' ')[0].toLowerCase( );
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

  toggleInputField(){
    this.isInputVisible = !this.isInputVisible;
  }

  logout():void {
    this.authService.logout();
  }

  test():void{
    console.log(localStorage.getItem('token'));
    
  }

 
}
