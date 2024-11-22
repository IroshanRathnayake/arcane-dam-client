import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import { RightSidebarComponent } from "../../../shared/components/right-sidebar/right-sidebar.component";
import { RightSidebarService } from '../../../shared/services/right-sidebar.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RightSidebarComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  isNotesOpen = false;
  isBookmarksOpen = false;

  @Output() toggleNotesEvent = new EventEmitter<boolean>();
  @Output() toggleBookmarksEvent = new EventEmitter<boolean>();

  toggleNotes() {
    this.isNotesOpen = !this.isNotesOpen;
    this.isBookmarksOpen = false;
    this.toggleNotesEvent.emit(this.isNotesOpen);
  }

  toggleBookmarks() {
    this.isBookmarksOpen = !this.isBookmarksOpen;
    this.isNotesOpen = false;
    this.toggleBookmarksEvent.emit(this.isBookmarksOpen);
  }
}