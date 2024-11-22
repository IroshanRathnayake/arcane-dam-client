import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-team-permission',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './team-permission.component.html',
  styleUrl: './team-permission.component.css'
})
export class TeamPermissionComponent implements OnInit{
  @Input() isModalOpen: boolean = false;
  @Output() closeModalEvent = new EventEmitter<void>();

  users: any[] = [
    { name: 'John Smith', email: 'john@gmail.com' },
    { name: 'Saman Silva', email: 'saman@gmail.com' },
    { name: 'Kasun Perera', email: 'kasun@gmail.com' },
    { name: 'Kamal Perera', email: 'kamal@gmail.com' },
    { name: 'Nimal Perera', email: 'nimal@gmail.com' },
    { name: 'Kasun Perera', email: 'kasun@gmail.com' },
    { name: 'Kamal Perera', email: 'kamal@gmail.com' },
  ] ;
  searchQuery: string = '';
  filteredUsers = [...this.users];

  ngOnInit(): void {
    
  }

  closeModal(): void {
    this.closeModalEvent.emit();
  }

  onSearch() {
    const query = this.searchQuery.toLowerCase();
    this.filteredUsers = this.users.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.email.toLowerCase().includes(query)
    );
  }

}
