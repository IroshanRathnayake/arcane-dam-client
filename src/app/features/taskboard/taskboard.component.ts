import { Component } from '@angular/core';
import { SidebarComponent } from "../../shared/components/sidebar/sidebar.component";
import { ProjectListComponent } from "../projects/components/project-list/project-list.component";
import { AssetDetailsComponent } from "../assets/components/asset-details/asset-details.component";
import { SpinnerComponent } from "../../shared/components/spinner/spinner.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-taskboard',
  standalone: true,
  imports: [SidebarComponent, ProjectListComponent, AssetDetailsComponent, SpinnerComponent, CommonModule],
  templateUrl: './taskboard.component.html',
  styleUrl: './taskboard.component.css'
})
export class TaskboardComponent {
    isLoading = true;
    isBookmarks = false;

    constructor(){
      setTimeout(()=>{
        this.isLoading = false;
      },3000);
    }

    toggleBookmarks(){
      this.isBookmarks = !this.isBookmarks
    }
}
