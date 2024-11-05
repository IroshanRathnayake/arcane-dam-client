import { Component } from '@angular/core';
import { SidebarComponent } from "../../shared/components/sidebar/sidebar.component";
import { ProjectListComponent } from "../projects/components/project-list/project-list.component";

@Component({
  selector: 'app-taskboard',
  standalone: true,
  imports: [SidebarComponent, ProjectListComponent],
  templateUrl: './taskboard.component.html',
  styleUrl: './taskboard.component.css'
})
export class TaskboardComponent {

}
