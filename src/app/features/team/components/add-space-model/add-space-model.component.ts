import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { TeamService } from '../../services/team.service';
import { SpaceService } from '../../services/space.service';
import { Space } from '../../models/space';
import { Alert, AlertService } from '../../../../shared/services/alert.service';
import { TeamSpaceComponent } from '../team-space/team-space.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-space-model',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-space-model.component.html',
  styleUrl: './add-space-model.component.css',
})
export class AddSpaceModelComponent implements OnInit {
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
