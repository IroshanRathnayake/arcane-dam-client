import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RightSidebarService {

  private sidebarVisible = new BehaviorSubject<boolean>(false);
  sidebarVisible$ = this.sidebarVisible.asObservable();

  constructor() { }
  setSidebarVisibility(isVisible: boolean) {
    this.sidebarVisible.next(isVisible);
  }
}
