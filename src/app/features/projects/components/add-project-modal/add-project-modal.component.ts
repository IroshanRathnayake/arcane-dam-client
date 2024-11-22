import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { Alert, AlertService } from '../../../../shared/services/alert.service';
import { Space } from '../../../team/models/space';
import { SpaceService } from '../../../team/services/space.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-project-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-project-modal.component.html',
  styleUrl: './add-project-modal.component.css'
})
export class AddProjectModalComponent implements OnInit {
  @Input() isModalOpen: boolean = false;
  @Output() closeModalEvent = new EventEmitter<void>();

  spaceName: string = '';
  spaceDescription: string = '';
  tagInput: string = '';
  tags: string[] = [];
  alerts: Alert[] = [];
  newSpace: Space = {} as Space;

  constructor(private spaceService: SpaceService, private alertService: AlertService) {}

  ngOnInit(): void {
    this.alertService.alert$.subscribe((alerts) => {
      this.alerts = alerts;
    });
  }

  @HostListener('document:click', ['$event'])
  onClickOutside(event: MouseEvent): void {
    const modal = document.querySelector('.modal-container');
    if (modal && !modal.contains(event.target as Node)) {
      this.closeModal();
    }
  }
  closeModal(): void {
    this.isModalOpen = false;
    this.closeModalEvent.emit();
  }

  addTag(): void {
    const newTag = this.tagInput.trim();
    if (newTag && !this.tags.includes(newTag)) {
      this.tags.push(newTag);
      this.tagInput = '';
    }
  }

  removeTag(index: number): void {
    this.tags.splice(index, 1);
  }

  async createSpace(): Promise<void> {

    this.newSpace= {
      id: "",
      name: this.spaceName,
      description: this.spaceDescription,
      tags: this.tags,
    };

    (await this.spaceService.updateSpace(this.newSpace)).subscribe(
      (updatedUser) => {
        this.alertService.showAlert('success', 'Space created successfully');
        this.spaceService.triggerInitComponentA();
      },
      (error) => {
        this.alertService.showAlert('error', error.message);
        console.error('Error updating space:', error);
      }
    );

    this.resetForm();
    this.closeModal();
  }

  private resetForm(): void {
    this.spaceName = '';
    this.spaceDescription = '';
    this.tags = [];
    this.tagInput = '';
  }
}
