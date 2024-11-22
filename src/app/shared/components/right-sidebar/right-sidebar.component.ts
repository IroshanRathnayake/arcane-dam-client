import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { RightSidebarService } from '../../services/right-sidebar.service';

@Component({
  selector: 'app-right-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './right-sidebar.component.html',
  styleUrl: './right-sidebar.component.css'
})
export class RightSidebarComponent implements OnInit{
  isSideBarVisible: boolean = false;

  constructor(private sidebarService: RightSidebarService) {}

  ngOnInit() {
    this.sidebarService.sidebarVisible$.subscribe((isVisible: boolean) => {
      this.isSideBarVisible = isVisible;
    });
  }
}
