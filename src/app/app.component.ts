import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { DashboardComponent } from "./features/dashboard/dashboard.component";
import { HeaderComponent } from "./shared/components/header/header.component";
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LoginComponent, DashboardComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'arcane-dam-client';

  ngOnInit(): void {
    initFlowbite();
  }
}
