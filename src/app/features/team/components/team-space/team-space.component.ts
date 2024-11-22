import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TeamService } from '../../services/team.service';
import { Team } from '../../models/team';
import { AddSpaceModelComponent } from '../add-space-model/add-space-model.component';
import { AuthService } from '../../../../core/services/auth.service';
import { Space } from '../../models/space';
import { SpaceService } from '../../services/space.service';
import { Alert, AlertService } from '../../../../shared/services/alert.service';
import { AddProjectModalComponent } from "../../../projects/components/add-project-modal/add-project-modal.component";
import { TeamPermissionComponent } from "../team-permission/team-permission.component";

@Component({
  selector: 'app-team-space',
  standalone: true,
  imports: [CommonModule, FormsModule, AddSpaceModelComponent, AddProjectModalComponent, TeamPermissionComponent],
  templateUrl: './team-space.component.html',
  styleUrl: './team-space.component.css',
})
export class TeamSpaceComponent implements OnInit {
  isSpaceVisible: boolean = false;
  isProfileOpen: boolean = false;
  isProjectOpen: boolean = false;
  teamSpaces: Team[] = [];
  spaces: Space[] | null = [];
  newSpaceName: string = '';
  updatedSpace: Space = {} as Space;
  updatedSpaceName: string = '';
  newProjectName: string = '';
  showInput: boolean = false;
  showProjects: boolean = false;
  private opType: string = 'add';
  private newTeam: Team = {} as Team;
  isModalOpen: boolean = false;
  isSubmenuOpen: boolean = false;
  isNewTeamSubmenuOpen: boolean = false;
  selectedSpaceIndex: number | null = null;
  editingIndex: number | null = null;
  alerts: Alert[] = [];
  isRotating = false;
  isFolderOpen : boolean = false;
  isAddNewProjectModalOpen : boolean = false;
  isOwner: boolean = true;
  isPermissionModalOpen : boolean = false;

  constructor(
    private teamService: TeamService,
    private spaceService:SpaceService,
    private authService: AuthService, 
    private eRef: ElementRef,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.loadSpaces();
    this.alertService.alert$.subscribe((alerts) => {
      this.alerts = alerts;
    });
  }

  loadSpaces() {
    this.spaces = this.authService.getSpaces();
  }

  refreshIcon() {
    this.isRotating = true;
    this.loadSpaces();
    
    setTimeout(() => {
      this.isRotating = false;
    }, 500);
  }

  openModal(): void {
    this.isModalOpen = true;
  }
  closeModal(): void {
    this.isModalOpen = false;
  }
  openAddNewProjectModal():void{
    this.isAddNewProjectModalOpen = true;
    this.isSubmenuOpen = false;
  }
  closeAddNewProjectModal():void{
    this.isAddNewProjectModalOpen = false;
  }

  openPermissionModal():void{
    this.isPermissionModalOpen = true;
    this.isSubmenuOpen = false;
  }
  closePermissionModal():void{
    this.isPermissionModalOpen = false;
  }

  toggleInput() {
    this.showInput = !this.showInput;
    this.newSpaceName = '';
  }

  toggleProject() {
    this.showProjects = !this.showProjects;
    this.newProjectName = '';
  }
  enterEditMode(space: Space, index: number) {
    this.isSubmenuOpen = false;
    this.editingIndex = index;
    this.updatedSpaceName = space.name;
  }
  async saveEdit(space: Space) {
    if (this.updatedSpaceName.trim()) {
      this.editingIndex = null; 
     
    this.updatedSpace= {
      id: space.id,
      name: this.updatedSpaceName,
      description: space.description,
      tags: space.tags,
    };

    (await this.spaceService.updateSpace(this.updatedSpace)).subscribe(
      (updatedUser) => {
        this.alertService.showAlert('success', 'Space updated successfully');
        this.loadSpaces();
      },
      (error) => {
        this.alertService.showAlert('error', error.message);
      }
    );
    }
  }

  cancelEdit() {
    this.editingIndex = null; 
    this.updatedSpaceName = '';
  }

  addSpace() {
    if (this.opType == 'add') {
      if (this.newSpaceName.trim()) {
        this.newTeam = {
          name: this.newSpaceName,
        };
        // POST to backend
        this.teamService.createTeam(this.newTeam).subscribe({
          next: () => {
            console.log('Added successful');
          },
          error: (error) => {
            console.log('Added Failed');
          },
        });

        this.ngOnInit();
        this.newSpaceName = '';
        this.showInput = !this.showInput;
      }
    } else if (this.opType == 'update') {
      if (this.newSpaceName.trim()) {
        this.newTeam = {
          name: this.newSpaceName,
        };
        // POST to backend
        this.teamService.updateTeam(this.newTeam).subscribe({
          next: () => {
            console.log('Updated successful');
          },
          error: (error) => {
            console.log('Updated Failed');
          },
        });

        // this.teamSpaces.push({name: this.newSpaceName});
        this.ngOnInit();
        this.newSpaceName = '';
        this.showInput = !this.showInput;
        this.opType = 'add';
      }
    }
  }
  removeSpace(space: string): void {
    // this.teamSpaces = this.teamSpaces.filter(s => s !== space);
  }

  toggleSpace(index: number): void {
    this.isSpaceVisible = !this.isSpaceVisible;
    this.selectedSpaceIndex === index ? !this.isSubmenuOpen : true;
  this.selectedSpaceIndex = index;
  }

  toggleActions(): void {
    this.isProfileOpen = !this.isProfileOpen;
  }

  toggleSubmenu(index: number) {
    this.isSubmenuOpen =
      this.selectedSpaceIndex === index ? !this.isSubmenuOpen : true;
    this.selectedSpaceIndex = index;
  }

  toggleNewTeamSubMenu(index: number) {
    this.isNewTeamSubmenuOpen = !this.isNewTeamSubmenuOpen;
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.isSubmenuOpen = false;
      this.isModalOpen = false;
      this.isNewTeamSubmenuOpen = false
    }
  }

  handleProject(index: number) {
    this.isProjectOpen = !this.isProjectOpen;
    this.selectedSpaceIndex === index ? !this.isSubmenuOpen : true;
    this.selectedSpaceIndex = index;
    this.isFolderOpen = !this.isFolderOpen;
  }

  
  handleInfo(space: Team) {
    
  }

  handleDelete(space: Team) {
    this.isSubmenuOpen = false;
    // Delete from backend
    this.teamService.deleteTeam(space).subscribe({
      next: () => {
        console.log('Deleted successful');
        this.ngOnInit();
      },
      error: (error) => {
        console.log('Deleted Failed');
      },
    });
  }
}
